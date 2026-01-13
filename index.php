<?php
session_start();
$pageTitle = 'Home';
?>
<?php include 'includes/header.php'; ?>

<nav class="navbar navbar-expand-lg">
    <div class="container">
        <a class="navbar-brand" href="/" data-testid="link-home">Help the Group</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item"><a class="nav-link" href="/about.php" data-testid="link-about">About Us</a></li>
                <li class="nav-item"><a class="nav-link" href="/how-it-works.php" data-testid="link-how-it-works">How It Works</a></li>
                <li class="nav-item"><a class="nav-link" href="/resources.php" data-testid="link-resources">Resources</a></li>
                <li class="nav-item"><a class="nav-link" href="/contact.php" data-testid="link-contact">Contact</a></li>
            </ul>
            <div class="d-flex gap-2">
                <?php if (isset($_SESSION['user_id'])): ?>
                    <a href="<?php echo $_SESSION['role'] === 'admin' ? '/admin/dashboard.php' : '/dashboard.php'; ?>" class="btn btn-primary" data-testid="button-dashboard">Dashboard</a>
                <?php else: ?>
                    <a href="/login.php" class="btn btn-outline-primary" data-testid="button-login">Login</a>
                    <a href="/signup.php" class="btn btn-primary" data-testid="button-join">Join Community</a>
                <?php endif; ?>
            </div>
        </div>
    </div>
</nav>

<section class="hero-section">
    <div class="container">
        <h1>You Are Not Alone</h1>
        <p>Join our supportive community of cancer survivors and patients. Build meaningful connections, share your journey, and grow together through our network of care.</p>
        <a href="/signup.php" class="btn btn-primary btn-lg" data-testid="button-hero-join">Join Our Community</a>
    </div>
</section>

<section class="py-5">
    <div class="container">
        <h2 class="text-center mb-5">How It Works</h2>
        <div class="row g-4">
            <div class="col-md-4">
                <div class="card feature-card h-100">
                    <div class="feature-icon">
                        <i class="bi bi-person-plus"></i>
                    </div>
                    <h3>Join</h3>
                    <p>Sign up through a referral link from someone in our community or contact us directly to join.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card feature-card h-100">
                    <div class="feature-icon">
                        <i class="bi bi-envelope-heart"></i>
                    </div>
                    <h3>Invite</h3>
                    <p>Share your unique referral link with others who could benefit from our supportive network.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card feature-card h-100">
                    <div class="feature-icon">
                        <i class="bi bi-people"></i>
                    </div>
                    <h3>Support & Grow</h3>
                    <p>Track your network, connect with your referrals, and build a community of mutual support.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-5 bg-light">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6">
                <h2>Building Stronger Support Networks</h2>
                <p class="text-muted mb-4">Our platform connects cancer patients and survivors, creating a chain of support that extends beyond traditional healthcare. Every referral strengthens our community.</p>
                <ul class="list-unstyled">
                    <li class="mb-3"><i class="bi bi-check-circle text-success me-2"></i> Track your direct referrals</li>
                    <li class="mb-3"><i class="bi bi-check-circle text-success me-2"></i> Send personalized invitations</li>
                    <li class="mb-3"><i class="bi bi-check-circle text-success me-2"></i> See your community grow</li>
                </ul>
            </div>
            <div class="col-lg-6 text-center">
                <div class="card p-4">
                    <div class="row g-4">
                        <div class="col-6">
                            <div class="stats-card">
                                <div class="stats-icon"><i class="bi bi-people"></i></div>
                                <div class="stats-value">500+</div>
                                <div class="stats-label">Community Members</div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="stats-card">
                                <div class="stats-icon"><i class="bi bi-heart"></i></div>
                                <div class="stats-value">1000+</div>
                                <div class="stats-label">Connections Made</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<footer class="page-footer">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 mb-4">
                <h5>Help the Group</h5>
                <p class="text-muted">A supportive community for cancer patients and survivors. Together, we are stronger.</p>
            </div>
            <div class="col-lg-2 col-md-4 mb-4">
                <h5>Company</h5>
                <ul>
                    <li><a href="/about.php" data-testid="footer-link-about">About Us</a></li>
                    <li><a href="/how-it-works.php" data-testid="footer-link-how-it-works">How It Works</a></li>
                    <li><a href="/contact.php" data-testid="footer-link-contact">Contact</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-4 mb-4">
                <h5>Resources</h5>
                <ul>
                    <li><a href="/resources.php" data-testid="footer-link-resources">Resources</a></li>
                    <li><a href="/faq.php" data-testid="footer-link-faq">FAQ</a></li>
                    <li><a href="/support.php" data-testid="footer-link-support">Support</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-4 mb-4">
                <h5>Legal</h5>
                <ul>
                    <li><a href="/privacy.php" data-testid="footer-link-privacy">Privacy Policy</a></li>
                    <li><a href="/terms.php" data-testid="footer-link-terms">Terms of Service</a></li>
                    <li><a href="/cookies.php" data-testid="footer-link-cookies">Cookie Policy</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> Help the Group. All rights reserved.</p>
        </div>
    </div>
</footer>

<?php include 'includes/footer.php'; ?>
