<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: /login.php');
    exit;
}

$userId = $_GET['id'] ?? null;
if (!$userId) {
    header('Location: /admin/users.php');
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$userId]);
$user = $stmt->fetch();

if (!$user) {
    header('Location: /admin/users.php');
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE referred_by = ? ORDER BY join_date DESC");
$stmt->execute([$user['referral_code']]);
$referrals = $stmt->fetchAll();

$referrer = null;
if ($user['referred_by']) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE referral_code = ?");
    $stmt->execute([$user['referred_by']]);
    $referrer = $stmt->fetch();
}

$pageTitle = $user['name'] . ' - User Details';
?>
<?php include '../includes/header.php'; ?>

<?php include '../includes/sidebar.php'; ?>

<main class="main-content">
    <div class="dashboard-header">
        <div class="d-flex align-items-center gap-3 mb-3">
            <a href="/admin/users.php" class="btn btn-outline-primary btn-sm" data-testid="button-back">
                <i class="bi bi-arrow-left me-1"></i> Back to Users
            </a>
        </div>
        <h1><?php echo htmlspecialchars($user['name']); ?></h1>
        <p><?php echo htmlspecialchars($user['email']); ?></p>
    </div>
    
    <div class="row g-4 mb-4">
        <div class="col-md-3">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-people"></i></div>
                <div class="stats-value" data-testid="text-user-referrals"><?php echo count($referrals); ?></div>
                <div class="stats-label">Total Referrals</div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-calendar-check"></i></div>
                <div class="stats-value" data-testid="text-user-join-date"><?php echo date('M j', strtotime($user['join_date'])); ?></div>
                <div class="stats-label">Joined</div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-person-badge"></i></div>
                <div class="stats-value" data-testid="text-user-role"><?php echo ucfirst($user['role']); ?></div>
                <div class="stats-label">Role</div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-check-circle"></i></div>
                <div class="stats-value <?php echo $user['is_active'] ? 'text-success' : 'text-danger'; ?>" data-testid="text-user-status">
                    <?php echo $user['is_active'] ? 'Active' : 'Inactive'; ?>
                </div>
                <div class="stats-label">Status</div>
            </div>
        </div>
    </div>
    
    <div class="row g-4 mb-4">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">User Information</h5>
                </div>
                <div class="card-body">
                    <table class="table table-borderless mb-0">
                        <tr>
                            <td class="text-muted" style="width: 140px;">Full Name</td>
                            <td data-testid="text-detail-name"><?php echo htmlspecialchars($user['name']); ?></td>
                        </tr>
                        <tr>
                            <td class="text-muted">Email</td>
                            <td data-testid="text-detail-email"><?php echo htmlspecialchars($user['email']); ?></td>
                        </tr>
                        <tr>
                            <td class="text-muted">Referral Code</td>
                            <td><code data-testid="text-detail-code"><?php echo htmlspecialchars($user['referral_code']); ?></code></td>
                        </tr>
                        <tr>
                            <td class="text-muted">Referred By</td>
                            <td data-testid="text-detail-referrer">
                                <?php if ($referrer): ?>
                                    <a href="/admin/user-detail.php?id=<?php echo $referrer['id']; ?>"><?php echo htmlspecialchars($referrer['name']); ?></a>
                                <?php else: ?>
                                    <span class="text-muted">Direct signup</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-muted">Join Date</td>
                            <td data-testid="text-detail-join-date"><?php echo date('F j, Y g:i A', strtotime($user['join_date'])); ?></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0"><?php echo htmlspecialchars($user['name']); ?>'s Referrals (<?php echo count($referrals); ?>)</h5>
        </div>
        <div class="card-body p-0">
            <?php if (empty($referrals)): ?>
                <div class="empty-state">
                    <i class="bi bi-people"></i>
                    <h5>No referrals</h5>
                    <p>This user hasn't referred anyone yet.</p>
                </div>
            <?php else: ?>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($referrals as $referral): ?>
                                <tr data-testid="row-referral-<?php echo $referral['id']; ?>">
                                    <td>
                                        <div class="d-flex align-items-center gap-3">
                                            <div class="user-avatar"><?php echo strtoupper(substr($referral['name'], 0, 1)); ?></div>
                                            <span><?php echo htmlspecialchars($referral['name']); ?></span>
                                        </div>
                                    </td>
                                    <td><?php echo htmlspecialchars($referral['email']); ?></td>
                                    <td>
                                        <?php if ($referral['is_active']): ?>
                                            <span class="badge-active">Active</span>
                                        <?php else: ?>
                                            <span class="badge-inactive">Inactive</span>
                                        <?php endif; ?>
                                    </td>
                                    <td><?php echo date('M j, Y', strtotime($referral['join_date'])); ?></td>
                                    <td>
                                        <a href="/admin/user-detail.php?id=<?php echo $referral['id']; ?>" class="btn btn-outline-primary btn-sm" data-testid="button-view-referral-<?php echo $referral['id']; ?>">
                                            View
                                        </a>
                                    </td>
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
