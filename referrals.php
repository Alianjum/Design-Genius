<?php
session_start();
require_once 'config/database.php';

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'user') {
    header('Location: /login.php');
    exit;
}

$referralCode = $_SESSION['referral_code'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE referred_by = ? ORDER BY join_date DESC");
$stmt->execute([$referralCode]);
$referrals = $stmt->fetchAll();

$pageTitle = 'My Referrals';
?>
<?php include 'includes/header.php'; ?>

<?php include 'includes/sidebar.php'; ?>

<main class="main-content">
    <div class="dashboard-header">
        <h1>My Referrals</h1>
        <p>View all the members you've invited to the community.</p>
    </div>
    
    <div class="card">
        <div class="card-header">
            <h5 class="mb-0">All Referrals (<?php echo count($referrals); ?>)</h5>
        </div>
        <div class="card-body p-0">
            <?php if (empty($referrals)): ?>
                <div class="empty-state">
                    <i class="bi bi-people"></i>
                    <h5>No referrals yet</h5>
                    <p>Share your referral link to invite others to join the community.</p>
                    <a href="/dashboard.php" class="btn btn-primary mt-3" data-testid="button-get-link">Get Your Referral Link</a>
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
