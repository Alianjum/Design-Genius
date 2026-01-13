<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: /login.php');
    exit;
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
    
    <div id="email-alert"></div>
    
    <div class="card mb-4">
        <div class="card-header">
            <h5 class="mb-0">Send Email</h5>
        </div>
        <div class="card-body">
            <form id="admin-email-form">
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
                <button type="submit" class="btn btn-primary" id="admin-email-submit" data-testid="button-send-email">
                    <span class="btn-text"><i class="bi bi-send me-2"></i>Send Email</span>
                    <span class="btn-loading d-none"><span class="spinner-border spinner-border-sm me-2"></span>Sending...</span>
                </button>
            </form>
        </div>
    </div>
    
    <script>
    $(document).ready(function() {
        $('#admin-email-form').on('submit', function(e) {
            e.preventDefault();
            
            var btn = $('#admin-email-submit');
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
                        $('#email-alert').html('<div class="alert alert-success">' + response.message + '</div>');
                        $('#admin-email-form')[0].reset();
                        setTimeout(function() { location.reload(); }, 2000);
                    } else {
                        $('#email-alert').html('<div class="alert alert-danger">' + response.message + '</div>');
                    }
                },
                error: function() {
                    $('#email-alert').html('<div class="alert alert-danger">An error occurred. Please try again.</div>');
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
