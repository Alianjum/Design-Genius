<?php
$pageTitle = 'Cookie Policy';
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
    <h1>Cookie Policy</h1>
    <p class="lead">Last updated: <?php echo date('F j, Y'); ?></p>
    
    <h2>What Are Cookies</h2>
    <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.</p>
    
    <h2>How We Use Cookies</h2>
    <p>Help the Group uses cookies for the following purposes:</p>
    
    <h3>Essential Cookies</h3>
    <p>These cookies are necessary for the website to function properly. They enable core functionality such as:</p>
    <ul>
        <li>User authentication and session management</li>
        <li>Security features</li>
        <li>Remembering your login status</li>
    </ul>
    
    <h3>Functional Cookies</h3>
    <p>These cookies enhance your experience by remembering your preferences:</p>
    <ul>
        <li>Language preferences</li>
        <li>Display settings</li>
        <li>Form data for convenience</li>
    </ul>
    
    <h3>Analytics Cookies</h3>
    <p>We may use analytics cookies to understand how visitors use our website:</p>
    <ul>
        <li>Pages visited and time spent</li>
        <li>Navigation patterns</li>
        <li>Technical information about devices and browsers</li>
    </ul>
    
    <h2>Managing Cookies</h2>
    <p>You can control and manage cookies in various ways:</p>
    <ul>
        <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or accept cookies through their settings</li>
        <li><strong>Clearing Cookies:</strong> You can delete cookies that have already been stored</li>
        <li><strong>Private Browsing:</strong> Using private or incognito mode limits cookie storage</li>
    </ul>
    
    <p>Please note that disabling essential cookies may affect the functionality of our website, particularly features requiring you to be logged in.</p>
    
    <h2>Third-Party Cookies</h2>
    <p>Some cookies may be placed by third-party services that appear on our pages. We do not control these cookies and recommend reviewing the privacy policies of these third parties.</p>
    
    <h2>Session vs Persistent Cookies</h2>
    <ul>
        <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
        <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period or until you delete them</li>
    </ul>
    
    <h2>Updates to This Policy</h2>
    <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
    
    <h2>Contact Us</h2>
    <p>If you have any questions about our use of cookies, please <a href="/contact.php">contact us</a>.</p>
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
