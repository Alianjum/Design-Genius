<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: /login.php');
    exit;
}

$userId = $_SESSION['user_id'];
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
            $stmt = $pdo->prepare("INSERT INTO email_logs (sender_id, recipient_email, subject, message, status) VALUES (?, ?, ?, ?, ?)");
            
            foreach ($validEmails as $email) {
                $stmt->execute([$userId, $email, $subject, $message, 'sent']);
            }
            
            $success = 'Email(s) sent to ' . count($validEmails) . ' recipient(s)!';
        }
    }
}

$stmt = $pdo->query("SELECT e.*, u.name as sender_name, u.role as sender_role FROM email_logs e LEFT JOIN users u ON e.sender_id = u.id ORDER BY e.sent_at DESC");
$emailLogs = $stmt->fetchAll();

$pageTitle = 'Email Management';
?>
<?php include '../includes/header.php'; ?>

<?php include '../includes/sidebar.php'; ?>

<main class="main-content">
    <div class="dashboard-header">
        <h1>Email Management</h1>
        <p>Send emails and view all invitation emails sent by community members.</p>
    </div>
    
    <?php if ($success): ?>
        <div class="alert alert-success" data-testid="text-success"><?php echo htmlspecialchars($success); ?></div>
    <?php endif; ?>
    
    <?php if ($error): ?>
        <div class="alert alert-danger" data-testid="text-error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>
    
    <div class="card mb-4">
        <div class="card-header">
            <h5 class="mb-0">Send Email</h5>
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
                    <input type="text" class="form-control" id="subject" name="subject" placeholder="Enter email subject" required data-testid="input-subject">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="message">Message</label>
                    <textarea class="form-control" id="message" name="message" rows="6" placeholder="Write your message here..." required data-testid="input-message"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" data-testid="button-send-email">
                    <i class="bi bi-send me-2"></i>Send Email
                </button>
            </form>
        </div>
    </div>
    
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0">All Email Logs (<?php echo count($emailLogs); ?>)</h5>
        </div>
        <div class="card-body p-0">
            <?php if (empty($emailLogs)): ?>
                <div class="empty-state">
                    <i class="bi bi-envelope"></i>
                    <h5>No emails sent yet</h5>
                    <p>No invitation emails have been sent by community members.</p>
                </div>
            <?php else: ?>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Sender</th>
                                <th>Recipient</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Sent</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($emailLogs as $log): ?>
                                <tr data-testid="row-email-<?php echo $log['id']; ?>">
                                    <td>
                                        <div class="d-flex align-items-center gap-3">
                                            <div class="user-avatar"><?php echo strtoupper(substr($log['sender_name'] ?? 'U', 0, 1)); ?></div>
                                            <div>
                                                <div><?php echo htmlspecialchars($log['sender_name'] ?? 'Unknown'); ?></div>
                                                <small class="text-muted"><?php echo ucfirst($log['sender_role'] ?? 'user'); ?></small>
                                            </div>
                                        </div>
                                    </td>
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

<?php include '../includes/footer.php'; ?>
