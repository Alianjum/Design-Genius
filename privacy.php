<?php
$pageTitle = 'Privacy Policy';
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
    <h1>Privacy Policy</h1>
    <p class="lead">Last updated: <?php echo date('F j, Y'); ?></p>
    
    <h2>Introduction</h2>
    <p>Help the Group ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>
    
    <h2>Information We Collect</h2>
    <p>We collect information that you provide directly to us, including:</p>
    <ul>
        <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
        <li><strong>Referral Information:</strong> Information about who referred you and who you refer</li>
        <li><strong>Communication Data:</strong> Email invitations you send through our platform</li>
        <li><strong>Contact Information:</strong> Information you provide when contacting us</li>
    </ul>
    
    <h2>How We Use Your Information</h2>
    <p>We use the information we collect to:</p>
    <ul>
        <li>Create and manage your account</li>
        <li>Track and display your referral network</li>
        <li>Send email invitations on your behalf</li>
        <li>Communicate with you about our services</li>
        <li>Improve our platform and user experience</li>
        <li>Ensure the security of our services</li>
    </ul>
    
    <h2>Information Sharing</h2>
    <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
    <ul>
        <li>With your consent</li>
        <li>To comply with legal obligations</li>
        <li>To protect our rights and safety</li>
        <li>With service providers who assist in operating our platform</li>
    </ul>
    
    <h2>Data Security</h2>
    <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
    
    <h2>Your Rights</h2>
    <p>You have the right to:</p>
    <ul>
        <li>Access your personal information</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion of your information</li>
        <li>Object to processing of your information</li>
    </ul>
    
    <h2>Cookies</h2>
    <p>We use cookies and similar technologies to enhance your experience. Please see our <a href="/cookies.php">Cookie Policy</a> for more information.</p>
    
    <h2>Changes to This Policy</h2>
    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
    
    <h2>Contact Us</h2>
    <p>If you have questions about this Privacy Policy, please contact us at <a href="/contact.php">our contact page</a>.</p>
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
