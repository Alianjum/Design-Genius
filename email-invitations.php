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
    
    <div id="invitation-alert"></div>
    
    <div class="card mb-4">
        <div class="card-header">
            <h5 class="mb-0">Send Invitation</h5>
        </div>
        <div class="card-body">
            <form id="invitation-form">
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
                <button type="submit" class="btn btn-primary" id="invitation-submit" data-testid="button-send-invitation">
                    <span class="btn-text"><i class="bi bi-send me-2"></i>Send Invitation</span>
                    <span class="btn-loading d-none"><span class="spinner-border spinner-border-sm me-2"></span>Sending...</span>
                </button>
            </form>
        </div>
    </div>
    
    <script>
    $(document).ready(function() {
        $('#invitation-form').on('submit', function(e) {
            e.preventDefault();
            
            var btn = $('#invitation-submit');
            btn.find('.btn-text').addClass('d-none');
            btn.find('.btn-loading').removeClass('d-none');
            btn.prop('disabled', true);
            
            var data = {
                emails: $('#emails').val(),
                subject: $('#subject').val(),
                message: $('#message').val()
            };
            
            $.ajax({
                url: '/api/send-invitation.php',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    if (response.success) {
                        $('#invitation-alert').html('<div class="alert alert-success">' + response.message + '</div>');
                        $('#emails').val('');
                        setTimeout(function() { location.reload(); }, 2000);
                    } else {
                        $('#invitation-alert').html('<div class="alert alert-danger">' + response.message + '</div>');
                    }
                },
                error: function() {
                    $('#invitation-alert').html('<div class="alert alert-danger">An error occurred. Please try again.</div>');
                },
                complete: function() {
                    btn.find('.btn-text').removeClass('d-none');
                    btn.find('.btn-loading').addClass('d-none');
                    btn.prop('disabled', false);
                }
            });
        });
    });
    </script>
    
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
