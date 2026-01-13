<?php
$pageTitle = 'About Us';
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
                <li class="nav-item"><a class="nav-link active" href="/about.php">About Us</a></li>
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
    <h1>About Help the Group</h1>
    <p class="lead">Building a supportive community for cancer patients and survivors.</p>
    
    <h2>Our Mission</h2>
    <p>Help the Group was founded with a simple yet powerful mission: to create a supportive network where cancer patients and survivors can connect, share experiences, and provide mutual support throughout their journey.</p>
    
    <h2>What We Do</h2>
    <p>We provide a platform that enables members to:</p>
    <ul>
        <li>Connect with others who understand their journey</li>
        <li>Build personal support networks through our referral system</li>
        <li>Share resources and experiences</li>
        <li>Track and grow their community impact</li>
    </ul>
    
    <h2>Our Values</h2>
    <p><strong>Compassion:</strong> We approach every interaction with empathy and understanding.</p>
    <p><strong>Community:</strong> We believe in the power of connection and mutual support.</p>
    <p><strong>Privacy:</strong> We respect and protect our members' personal information.</p>
    <p><strong>Growth:</strong> We continuously work to improve our platform and expand our reach.</p>
    
    <h2>Join Us</h2>
    <p>Whether you're a patient, survivor, caregiver, or supporter, you're welcome in our community. Together, we can make a difference in the lives of those affected by cancer.</p>
    
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
