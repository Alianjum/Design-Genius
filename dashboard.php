<?php
session_start();
require_once 'config/database.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'user') {
    header('Location: /login.php');
    exit;
}

$userId = $_SESSION['user_id'];
$referralCode = $_SESSION['referral_code'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$userId]);
$user = $stmt->fetch();

$referrer = null;
if ($user['referred_by']) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE referral_code = ?");
    $stmt->execute([$user['referred_by']]);
    $referrer = $stmt->fetch();
}

$stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE referred_by = ?");
$stmt->execute([$referralCode]);
$totalReferrals = $stmt->fetchColumn();

$stmt = $pdo->prepare("SELECT * FROM users WHERE referred_by = ? ORDER BY join_date DESC LIMIT 5");
$stmt->execute([$referralCode]);
$recentReferrals = $stmt->fetchAll();

$referralUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . '/signup.php?ref=' . $referralCode;

$pageTitle = 'Dashboard';
?>
<?php include 'includes/header.php'; ?>

<?php include 'includes/sidebar.php'; ?>

<main class="main-content">
    <div class="dashboard-header">
        <h1>Welcome back, <?php echo htmlspecialchars($user['name']); ?>!</h1>
        <p>Track your referrals and grow your support network.</p>
    </div>
    
    <div class="row g-4 mb-4">
        <div class="col-md-3">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-people"></i></div>
                <div class="stats-value" data-testid="text-total-referrals"><?php echo $totalReferrals; ?></div>
                <div class="stats-label">Total Referrals</div>
            </div>
        </div>
        <div class="col-md-3">
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
        <div class="col-md-3">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-calendar-check"></i></div>
                <div class="stats-value" data-testid="text-join-date"><?php echo date('M j, Y', strtotime($user['join_date'])); ?></div>
                <div class="stats-label">Member Since</div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stats-card">
                <div class="stats-icon"><i class="bi bi-check-circle"></i></div>
                <div class="stats-value text-success" data-testid="text-status">Active</div>
                <div class="stats-label">Account Status</div>
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
        </div>
    </div>
    
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <h5 class="mb-0">Recent Referrals</h5>
            <a href="/referrals.php" class="btn btn-outline-primary btn-sm" data-testid="link-view-all-referrals">View All</a>
        </div>
        <div class="card-body p-0">
            <?php if (empty($recentReferrals)): ?>
                <div class="empty-state">
                    <i class="bi bi-people"></i>
                    <h5>No referrals yet</h5>
                    <p>Share your referral link to invite others to join.</p>
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
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($recentReferrals as $referral): ?>
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
