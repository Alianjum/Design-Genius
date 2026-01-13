<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: /login.php');
    exit;
}

$stmt = $pdo->query("SELECT COUNT(*) FROM users");
$totalUsers = $stmt->fetchColumn();

$stmt = $pdo->query("SELECT COUNT(*) FROM users WHERE is_active = TRUE");
$activeUsers = $stmt->fetchColumn();

$stmt = $pdo->query("SELECT COUNT(*) FROM users WHERE referred_by IS NOT NULL");
$totalReferrals = $stmt->fetchColumn();

$stmt = $pdo->query("SELECT COUNT(*) FROM users WHERE join_date >= CURRENT_DATE");
$todaySignups = $stmt->fetchColumn();

$stmt = $pdo->query("SELECT * FROM users ORDER BY join_date DESC LIMIT 5");
$recentUsers = $stmt->fetchAll();

$pageTitle = 'Admin Dashboard';
?>
<?php include '../includes/header.php'; ?>

<?php include '../includes/sidebar.php'; ?>

<main class="main-content">
    <div class="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Overview of your community's growth and activity.</p>
    </div>
    
    <div class="row g-4 mb-4">
        <div class="col-md-3">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-people"></i></div>
                <div class="stats-value" data-testid="text-total-users"><?php echo $totalUsers; ?></div>
                <div class="stats-label">Total Users</div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-person-check"></i></div>
                <div class="stats-value" data-testid="text-active-users"><?php echo $activeUsers; ?></div>
                <div class="stats-label">Active Users</div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-person-plus"></i></div>
                <div class="stats-value" data-testid="text-total-referrals"><?php echo $totalReferrals; ?></div>
                <div class="stats-label">Total Referrals</div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-graph-up"></i></div>
                <div class="stats-value" data-testid="text-today-signups"><?php echo $todaySignups; ?></div>
                <div class="stats-label">Today's Signups</div>
            </div>
        </div>
    </div>
    
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <h5 class="mb-0">Recent Users</h5>
            <a href="/admin/users.php" class="btn btn-outline-primary btn-sm" data-testid="link-view-all-users">View All Users</a>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($recentUsers as $user): ?>
                            <tr data-testid="row-user-<?php echo $user['id']; ?>">
                                <td>
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="user-avatar"><?php echo strtoupper(substr($user['name'], 0, 1)); ?></div>
                                        <span><?php echo htmlspecialchars($user['name']); ?></span>
                                    </div>
                                </td>
                                <td><?php echo htmlspecialchars($user['email']); ?></td>
                                <td><?php echo ucfirst($user['role']); ?></td>
                                <td>
                                    <?php if ($user['is_active']): ?>
                                        <span class="badge-active">Active</span>
                                    <?php else: ?>
                                        <span class="badge-inactive">Inactive</span>
                                    <?php endif; ?>
                                </td>
                                <td><?php echo date('M j, Y', strtotime($user['join_date'])); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

<?php include '../includes/footer.php'; ?>
