<?php
$pageTitle = 'Terms of Service';
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
    <h1>Terms of Service</h1>
    <p class="lead">Last updated: <?php echo date('F j, Y'); ?></p>
    
    <h2>Acceptance of Terms</h2>
    <p>By accessing or using Help the Group ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.</p>
    
    <h2>Description of Service</h2>
    <p>Help the Group is a community platform designed to connect cancer patients and survivors. Our Service includes:</p>
    <ul>
        <li>User account creation and management</li>
        <li>Referral tracking system</li>
        <li>Email invitation functionality</li>
        <li>Community resources and information</li>
    </ul>
    
    <h2>User Accounts</h2>
    <p>To use certain features of our Service, you must create an account. You agree to:</p>
    <ul>
        <li>Provide accurate and complete information</li>
        <li>Maintain the security of your account credentials</li>
        <li>Notify us immediately of any unauthorized use</li>
        <li>Be responsible for all activities under your account</li>
    </ul>
    
    <h2>Acceptable Use</h2>
    <p>You agree not to:</p>
    <ul>
        <li>Use the Service for any unlawful purpose</li>
        <li>Harass, abuse, or harm other users</li>
        <li>Send spam or unsolicited communications</li>
        <li>Attempt to gain unauthorized access to the Service</li>
        <li>Interfere with the proper functioning of the Service</li>
        <li>Impersonate any person or entity</li>
    </ul>
    
    <h2>Referral System</h2>
    <p>Our referral system is designed to help grow our community through trusted connections. You agree to use the referral system responsibly and only invite people who may genuinely benefit from our community.</p>
    
    <h2>Email Invitations</h2>
    <p>When sending email invitations through our platform, you agree to:</p>
    <ul>
        <li>Only send invitations to people you know</li>
        <li>Not use the feature for spam or bulk unsolicited emails</li>
        <li>Include accurate information in your invitations</li>
    </ul>
    
    <h2>Intellectual Property</h2>
    <p>The Service and its content are protected by copyright and other intellectual property laws. You may not copy, modify, or distribute our content without permission.</p>
    
    <h2>Disclaimer of Warranties</h2>
    <p>The Service is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, secure, or error-free.</p>
    
    <h2>Limitation of Liability</h2>
    <p>To the maximum extent permitted by law, Help the Group shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.</p>
    
    <h2>Termination</h2>
    <p>We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our discretion.</p>
    
    <h2>Changes to Terms</h2>
    <p>We may modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the modified Terms.</p>
    
    <h2>Contact</h2>
    <p>For questions about these Terms, please <a href="/contact.php">contact us</a>.</p>
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
