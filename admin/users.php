<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: /login.php');
    exit;
}

$stmt = $pdo->query("SELECT u.*, (SELECT COUNT(*) FROM users r WHERE r.referred_by = u.referral_code) as referral_count FROM users u ORDER BY u.join_date DESC");
$users = $stmt->fetchAll();

$pageTitle = 'All Users';
?>
<?php include '../includes/header.php'; ?>

<?php include '../includes/sidebar.php'; ?>

<main class="main-content">
    <div class="dashboard-header">
        <h1>All Users</h1>
        <p>Manage and view all community members.</p>
    </div>
    
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0">Users (<?php echo count($users); ?>)</h5>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Referrals</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $user): ?>
                            <tr data-testid="row-user-<?php echo $user['id']; ?>">
                                <td>
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="user-avatar"><?php echo strtoupper(substr($user['name'], 0, 1)); ?></div>
                                        <span><?php echo htmlspecialchars($user['name']); ?></span>
                                    </div>
                                </td>
                                <td><?php echo htmlspecialchars($user['email']); ?></td>
                                <td><?php echo ucfirst($user['role']); ?></td>
                                <td data-testid="text-referral-count-<?php echo $user['id']; ?>"><?php echo $user['referral_count']; ?></td>
                                <td>
                                    <?php if ($user['is_active']): ?>
                                        <span class="badge-active">Active</span>
                                    <?php else: ?>
                                        <span class="badge-inactive">Inactive</span>
                                    <?php endif; ?>
                                </td>
                                <td><?php echo date('M j, Y', strtotime($user['join_date'])); ?></td>
                                <td>
                                    <a href="/admin/user-detail.php?id=<?php echo $user['id']; ?>" class="btn btn-outline-primary btn-sm" data-testid="button-view-user-<?php echo $user['id']; ?>">
                                        View
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

<?php include '../includes/footer.php'; ?>
