<?php
session_start();
require_once 'config/database.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'user') {
    header('Location: /login.php');
    exit;
}

$userId = $_SESSION['user_id'];
$referralCode = $_SESSION['referral_code'];
$referralUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/signup.php?ref=' . $referralCode;

$success = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $emails = trim($_POST['emails'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');
    
    if (empty($emails) || empty($subject) || empty($message)) {
        $error = 'Please fill in all fields.';
    } else {
        $emailList = array_filter(array_map('trim', explode(',', $emails)));
        $validEmails = array_filter($emailList, function($email) {
            return filter_var($email, FILTER_VALIDATE_EMAIL);
        });
        
        if (empty($validEmails)) {
            $error = 'Please enter at least one valid email address.';
        } else {
            $finalMessage = str_replace('{{REFERRAL_URL}}', $referralUrl, $message);
            
            $stmt = $pdo->prepare("INSERT INTO email_logs (sender_id, recipient_email, subject, message, status) VALUES (?, ?, ?, ?, ?)");
            
            foreach ($validEmails as $email) {
                $stmt->execute([$userId, $email, $subject, $finalMessage, 'sent']);
            }
            
            $success = 'Invitation(s) sent to ' . count($validEmails) . ' recipient(s)!';
        }
    }
}

$stmt = $pdo->prepare("SELECT * FROM email_logs WHERE sender_id = ? ORDER BY sent_at DESC LIMIT 10");
$stmt->execute([$userId]);
$emailLogs = $stmt->fetchAll();

$pageTitle = 'Email Invitations';
?>
<?php include 'includes/header.php'; ?>

<?php include 'includes/sidebar.php'; ?>

<main class="main-content">
    <div class="dashboard-header">
        <h1>Email Invitations</h1>
        <p>Send personalized invitations to invite others to join the community.</p>
    </div>
    
    <?php if ($success): ?>
        <div class="alert alert-success" data-testid="text-success"><?php echo htmlspecialchars($success); ?></div>
    <?php endif; ?>
    
    <?php if ($error): ?>
        <div class="alert alert-danger" data-testid="text-error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>
    
    <div class="card mb-4">
        <div class="card-header">
            <h5 class="mb-0">Send Invitation</h5>
        </div>
        <div class="card-body">
            <form method="POST" action="">
                <div class="mb-3">
                    <label class="form-label" for="emails">Recipient Email(s)</label>
                    <input type="text" class="form-control" id="emails" name="emails" placeholder="email1@example.com, email2@example.com" required data-testid="input-emails">
                    <div class="form-text">Separate multiple emails with commas</div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="subject">Subject</label>
                    <input type="text" class="form-control" id="subject" name="subject" value="Join Our Cancer Support Community" required data-testid="input-subject">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="message">Message</label>
                    <textarea class="form-control" id="message" name="message" rows="6" required data-testid="input-message">Hi,

I wanted to invite you to join Help the Group, a supportive community for cancer patients and survivors.

Join using my referral link: {{REFERRAL_URL}}

Together, we can support each other through this journey.

Best regards,
<?php echo htmlspecialchars($_SESSION['user_name']); ?></textarea>
                    <div class="form-text">Use {{REFERRAL_URL}} as a placeholder for your referral link</div>
                </div>
                <button type="submit" class="btn btn-primary" data-testid="button-send-invitation">
                    <i class="bi bi-send me-2"></i>Send Invitation
                </button>
            </form>
        </div>
    </div>
    
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0">Email History</h5>
        </div>
        <div class="card-body p-0">
            <?php if (empty($emailLogs)): ?>
                <div class="empty-state">
                    <i class="bi bi-envelope"></i>
                    <h5>No emails sent yet</h5>
                    <p>Use the form above to send your first invitation.</p>
                </div>
            <?php else: ?>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Recipient</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Sent</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($emailLogs as $log): ?>
                                <tr data-testid="row-email-<?php echo $log['id']; ?>">
                                    <td><?php echo htmlspecialchars($log['recipient_email']); ?></td>
                                    <td><?php echo htmlspecialchars($log['subject']); ?></td>
                                    <td><span class="badge-sent"><?php echo ucfirst($log['status']); ?></span></td>
                                    <td><?php echo date('M j, Y g:i A', strtotime($log['sent_at'])); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php endif; ?>
        </div>
    </div>
</main>

<?php include 'includes/footer.php'; ?>
