<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: /login.php');
    exit;
}

$stmt = $pdo->query("SELECT e.*, u.name as sender_name, u.role as sender_role FROM email_logs e LEFT JOIN users u ON e.sender_id = u.id ORDER BY e.sent_at DESC");
$emailLogs = $stmt->fetchAll();

$pageTitle = 'Email Logs';
?>
<?php include '../includes/header.php'; ?>

<?php include '../includes/sidebar.php'; ?>

<main class="main-content">
    <div class="dashboard-header">
        <h1>Email Logs</h1>
        <p>View all invitation emails sent by community members.</p>
    </div>
    
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0">All Emails (<?php echo count($emailLogs); ?>)</h5>
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
