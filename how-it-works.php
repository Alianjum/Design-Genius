<?php
$pageTitle = 'How It Works';
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
                <li class="nav-item"><a class="nav-link" href="/about.php">About Us</a></li>
                <li class="nav-item"><a class="nav-link active" href="/how-it-works.php">How It Works</a></li>
                <li class="nav-item"><a class="nav-link" href="/resources.php">Resources</a></li>
                <li class="nav-item"><a class="nav-link" href="/contact.php">Contact</a></li>
            </ul>
            <div class="d-flex gap-2">
                <a href="/login.php" class="btn btn-outline-primary">Login</a>
                <a href="/signup.php" class="btn btn-primary">Join Community</a>
            </div>
        </div>
    </div>
</nav>

<div class="container static-page">
    <h1>How It Works</h1>
    <p class="lead">Join our community in three simple steps.</p>
    
    <div class="row g-4 my-5">
        <div class="col-md-4">
            <div class="card feature-card h-100">
                <div class="feature-icon">
                    <i class="bi bi-1-circle"></i>
                </div>
                <h3>Sign Up</h3>
                <p>Create your account using a referral link from an existing member, or contact us directly to join the community.</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card feature-card h-100">
                <div class="feature-icon">
                    <i class="bi bi-2-circle"></i>
                </div>
                <h3>Get Your Link</h3>
                <p>Once registered, you'll receive your own unique referral link that you can share with others who may benefit from our community.</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card feature-card h-100">
                <div class="feature-icon">
                    <i class="bi bi-3-circle"></i>
                </div>
                <h3>Grow Your Network</h3>
                <p>Track your referrals, send email invitations, and watch your support network grow within our community.</p>
            </div>
        </div>
    </div>
    
    <h2>Your Dashboard</h2>
    <p>Once you join, you'll have access to a personalized dashboard where you can:</p>
    <ul>
        <li>View and copy your unique referral link</li>
        <li>Track how many people you've invited</li>
        <li>Send personalized email invitations</li>
        <li>See your growing network of referrals</li>
    </ul>
    
    <h2>The Referral System</h2>
    <p>Our referral system helps us grow through trusted connections. When you invite someone using your referral link, they become part of your direct network. This creates a chain of support that strengthens our entire community.</p>
    
    <a href="/signup.php" class="btn btn-primary mt-3" data-testid="button-get-started">Get Started</a>
</div>

<footer class="page-footer">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 mb-4">
                <h5>Help the Group</h5>
                <p class="text-muted">A supportive community for cancer patients and survivors.</p>
            </div>
            <div class="col-lg-2 col-md-4 mb-4">
                <h5>Company</h5>
                <ul>
                    <li><a href="/about.php">About Us</a></li>
                    <li><a href="/how-it-works.php">How It Works</a></li>
                    <li><a href="/contact.php">Contact</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-4 mb-4">
                <h5>Resources</h5>
                <ul>
                    <li><a href="/resources.php">Resources</a></li>
                    <li><a href="/faq.php">FAQ</a></li>
                    <li><a href="/support.php">Support</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-4 mb-4">
                <h5>Legal</h5>
                <ul>
                    <li><a href="/privacy.php">Privacy Policy</a></li>
                    <li><a href="/terms.php">Terms of Service</a></li>
                    <li><a href="/cookies.php">Cookie Policy</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> Help the Group. All rights reserved.</p>
        </div>
    </div>
</footer>

<?php include 'includes/footer.php'; ?>
