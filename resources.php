<?php
$pageTitle = 'Resources';
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
                <li class="nav-item"><a class="nav-link active" href="/resources.php">Resources</a></li>
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
    <h1>Resources</h1>
    <p class="lead">Helpful information and resources for cancer patients and survivors.</p>
    
    <h2>Support Organizations</h2>
    <p>Here are some trusted organizations that provide support for cancer patients and their families:</p>
    <ul>
        <li><strong>American Cancer Society</strong> - Comprehensive cancer information and support services</li>
        <li><strong>Cancer Support Community</strong> - Free emotional and social support</li>
        <li><strong>National Cancer Institute</strong> - Research-based information and resources</li>
        <li><strong>Livestrong Foundation</strong> - Support programs for cancer survivors</li>
    </ul>
    
    <h2>Educational Materials</h2>
    <p>Understanding your diagnosis and treatment options is important. Consider these resources:</p>
    <ul>
        <li>Understanding cancer types and stages</li>
        <li>Treatment options and what to expect</li>
        <li>Managing side effects</li>
        <li>Nutrition during treatment</li>
        <li>Exercise and wellness programs</li>
    </ul>
    
    <h2>Mental Health Support</h2>
    <p>Cancer affects not just the body, but also the mind. These resources can help:</p>
    <ul>
        <li>Counseling and therapy services</li>
        <li>Support groups for patients and caregivers</li>
        <li>Mindfulness and meditation resources</li>
        <li>Stress management techniques</li>
    </ul>
    
    <h2>Financial Assistance</h2>
    <p>Cancer treatment can be expensive. Look into these options for financial help:</p>
    <ul>
        <li>Patient assistance programs</li>
        <li>Insurance navigation services</li>
        <li>Charitable organizations offering financial support</li>
        <li>Government assistance programs</li>
    </ul>
    
    <h2>Need More Help?</h2>
    <p>Our community is here to support you. Join us and connect with others who understand your journey.</p>
    <a href="/signup.php" class="btn btn-primary mt-3" data-testid="button-join">Join Our Community</a>
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
