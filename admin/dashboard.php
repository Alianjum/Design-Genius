<?php
session_start();
require_once '../config/database.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    header('Location: /login.php');
    exit;
}

$referralCode = $_SESSION['referral_code'];
$referralUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/signup.php?ref=' . $referralCode;

$stmt = $pdo->query("SELECT COUNT(*) FROM users");
$totalUsers = $stmt->fetchColumn();

$stmt = $pdo->query("SELECT COUNT(*) FROM users WHERE is_active = TRUE");
$activeUsers = $stmt->fetchColumn();

$stmt = $pdo->query("SELECT COUNT(*) FROM users WHERE referred_by IS NOT NULL");
$totalReferrals = $stmt->fetchColumn();

$stmt = $pdo->query("SELECT COUNT(*) FROM users WHERE join_date >= CURRENT_DATE");
$todaySignups = $stmt->fetchColumn();

$stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE referred_by = ?");
$stmt->execute([$referralCode]);
$myReferrals = $stmt->fetchColumn();

$userId = $_SESSION['user_id'];
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$userId]);
$adminUser = $stmt->fetch();

$referrer = null;
if ($adminUser['referred_by']) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE referral_code = ?");
    $stmt->execute([$adminUser['referred_by']]);
    $referrer = $stmt->fetch();
}

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
        <div class="col-lg-3 col-md-6">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-people"></i></div>
                <div class="stats-value" data-testid="text-total-users"><?php echo $totalUsers; ?></div>
                <div class="stats-label">Total Users</div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-person-check"></i></div>
                <div class="stats-value" data-testid="text-active-users"><?php echo $activeUsers; ?></div>
                <div class="stats-label">Active Users</div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-person-plus"></i></div>
                <div class="stats-value" data-testid="text-total-referrals"><?php echo $totalReferrals; ?></div>
                <div class="stats-label">Total Referrals</div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-graph-up"></i></div>
                <div class="stats-value" data-testid="text-today-signups"><?php echo $todaySignups; ?></div>
                <div class="stats-label">Today's Signups</div>
            </div>
        </div>
    </div>
    
    <div class="row g-4 mb-4">
        <div class="col-md-6">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-person-heart"></i></div>
                <div class="stats-value" data-testid="text-referred-by">
                    <?php if ($referrer): ?>
                        <?php echo htmlspecialchars($referrer['name']); ?>
                    <?php else: ?>
                        <span class="text-muted" style="font-size: 0.9rem;">Direct Signup</span>
                    <?php endif; ?>
                </div>
                <div class="stats-label">Referred By</div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-share"></i></div>
                <div class="stats-value" data-testid="text-my-referrals"><?php echo $myReferrals; ?></div>
                <div class="stats-label">My Referrals</div>
            </div>
        </div>
    </div>
    
    <div class="card mb-4">
        <div class="referral-link-card">
            <h5><i class="bi bi-link-45deg me-2"></i>Your Referral Link</h5>
            <p class="text-muted mb-3">Share this link to invite others to join the community.</p>
            <div class="referral-link-input">
                <input type="text" id="referral-url" value="<?php echo htmlspecialchars($referralUrl); ?>" readonly data-testid="input-referral-link">
                <button class="btn copy-btn" onclick="copyReferralLink()" data-testid="button-copy-link">
                    <i class="bi bi-clipboard me-1"></i> Copy
                </button>
            </div>
            <div class="mt-3">
                <a href="/admin/referrals.php" class="btn btn-outline-primary btn-sm" data-testid="link-my-referrals">
                    <i class="bi bi-people me-1"></i> View My Referrals (<?php echo $myReferrals; ?>)
                </a>
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
