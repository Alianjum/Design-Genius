<?php
$pageTitle = 'Support';
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
                <li class="nav-item"><a class="nav-link" href="/how-it-works.php">How It Works</a></li>
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
    <h1>Help Center</h1>
    <p class="lead">We're here to help you get the most out of Help the Group.</p>
    
    <div class="row g-4 my-4">
        <div class="col-md-4">
            <div class="card p-4 h-100">
                <div class="text-center mb-3">
                    <i class="bi bi-book" style="font-size: 48px; color: var(--primary-blue);"></i>
                </div>
                <h3 class="text-center">Getting Started</h3>
                <p class="text-muted">New to Help the Group? Learn the basics of using our platform.</p>
                <a href="/how-it-works.php" class="btn btn-outline-primary w-100" data-testid="link-getting-started">Learn More</a>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card p-4 h-100">
                <div class="text-center mb-3">
                    <i class="bi bi-question-circle" style="font-size: 48px; color: var(--primary-blue);"></i>
                </div>
                <h3 class="text-center">FAQ</h3>
                <p class="text-muted">Find quick answers to the most commonly asked questions.</p>
                <a href="/faq.php" class="btn btn-outline-primary w-100" data-testid="link-faq">View FAQ</a>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card p-4 h-100">
                <div class="text-center mb-3">
                    <i class="bi bi-envelope" style="font-size: 48px; color: var(--primary-blue);"></i>
                </div>
                <h3 class="text-center">Contact Us</h3>
                <p class="text-muted">Can't find what you need? Reach out to our support team.</p>
                <a href="/contact.php" class="btn btn-outline-primary w-100" data-testid="link-contact">Get in Touch</a>
            </div>
        </div>
    </div>
    
    <h2>Common Topics</h2>
    
    <div class="card mb-3">
        <div class="card-body">
            <h5>Account Management</h5>
            <ul class="mb-0">
                <li>How to update your profile information</li>
                <li>Changing your password</li>
                <li>Managing your account settings</li>
            </ul>
        </div>
    </div>
    
    <div class="card mb-3">
        <div class="card-body">
            <h5>Referral System</h5>
            <ul class="mb-0">
                <li>Finding your unique referral link</li>
                <li>Sharing your referral link</li>
                <li>Tracking your referrals</li>
            </ul>
        </div>
    </div>
    
    <div class="card mb-3">
        <div class="card-body">
            <h5>Email Invitations</h5>
            <ul class="mb-0">
                <li>Sending email invitations</li>
                <li>Customizing your invitation message</li>
                <li>Viewing your email history</li>
            </ul>
        </div>
    </div>
    
    <div class="mt-5">
        <h3>Need More Help?</h3>
        <p>Our support team typically responds within 24-48 hours.</p>
        <a href="/contact.php" class="btn btn-primary" data-testid="button-contact">Contact Support</a>
    </div>
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
