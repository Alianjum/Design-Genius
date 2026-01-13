<?php
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<button class="mobile-toggle" data-testid="button-mobile-menu">
    <i class="bi bi-list"></i>
</button>

<aside class="sidebar">
    <a href="/" class="sidebar-brand" data-testid="link-sidebar-home">Help the Group</a>
    
    <ul class="sidebar-nav">
        <?php if ($_SESSION['role'] === 'admin'): ?>
            <li>
                <a href="/admin/dashboard.php" class="<?php echo $currentPage === 'dashboard.php' ? 'active' : ''; ?>" data-testid="link-admin-dashboard">
                    <i class="bi bi-speedometer2"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a href="/admin/referrals.php" class="<?php echo $currentPage === 'referrals.php' ? 'active' : ''; ?>" data-testid="link-admin-referrals">
                    <i class="bi bi-person-plus"></i>
                    <span>My Referrals</span>
                </a>
            </li>
            <li>
                <a href="/admin/users.php" class="<?php echo $currentPage === 'users.php' ? 'active' : ''; ?>" data-testid="link-admin-users">
                    <i class="bi bi-people"></i>
                    <span>All Users</span>
                </a>
            </li>
            <li>
                <a href="/admin/emails.php" class="<?php echo $currentPage === 'emails.php' ? 'active' : ''; ?>" data-testid="link-admin-emails">
                    <i class="bi bi-envelope"></i>
                    <span>Email Management</span>
                </a>
            </li>
        <?php else: ?>
            <li>
                <a href="/dashboard.php" class="<?php echo $currentPage === 'dashboard.php' ? 'active' : ''; ?>" data-testid="link-dashboard">
                    <i class="bi bi-speedometer2"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a href="/referrals.php" class="<?php echo $currentPage === 'referrals.php' ? 'active' : ''; ?>" data-testid="link-referrals">
                    <i class="bi bi-people"></i>
                    <span>My Referrals</span>
                </a>
            </li>
            <li>
                <a href="/email-invitations.php" class="<?php echo $currentPage === 'email-invitations.php' ? 'active' : ''; ?>" data-testid="link-email-invitations">
                    <i class="bi bi-envelope"></i>
                    <span>Email Invitations</span>
                </a>
            </li>
        <?php endif; ?>
        
        <li style="margin-top: auto; border-top: 1px solid var(--border-color); padding-top: 16px;">
            <a href="/logout.php" data-testid="link-logout">
                <i class="bi bi-box-arrow-right"></i>
                <span>Logout</span>
            </a>
        </li>
    </ul>
</aside>
