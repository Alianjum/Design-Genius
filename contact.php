<?php
session_start();
$pageTitle = 'Contact Us';
$success = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');
    
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $error = 'Please fill in all fields.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Please enter a valid email address.';
    } else {
        $success = 'Thank you for your message. We will get back to you soon!';
    }
}
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
                <li class="nav-item"><a class="nav-link active" href="/contact.php">Contact</a></li>
            </ul>
            <div class="d-flex gap-2">
                <a href="/login.php" class="btn btn-outline-primary">Login</a>
                <a href="/signup.php" class="btn btn-primary">Join Community</a>
            </div>
        </div>
    </div>
</nav>

<div class="container static-page">
    <div class="row">
        <div class="col-lg-6">
            <h1>Contact Us</h1>
            <p class="lead">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            
            <?php if ($success): ?>
                <div class="alert alert-success" data-testid="text-success"><?php echo htmlspecialchars($success); ?></div>
            <?php endif; ?>
            
            <?php if ($error): ?>
                <div class="alert alert-danger" data-testid="text-error"><?php echo htmlspecialchars($error); ?></div>
            <?php endif; ?>
            
            <form method="POST" action="" class="mt-4">
                <div class="mb-3">
                    <label class="form-label" for="name">Your Name</label>
                    <input type="text" class="form-control" id="name" name="name" required data-testid="input-name">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="email">Your Email</label>
                    <input type="email" class="form-control" id="email" name="email" required data-testid="input-email">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="subject">Subject</label>
                    <input type="text" class="form-control" id="subject" name="subject" required data-testid="input-subject">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="message">Message</label>
                    <textarea class="form-control" id="message" name="message" rows="5" required data-testid="input-message"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" data-testid="button-send">Send Message</button>
            </form>
        </div>
        <div class="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
            <div class="card p-4">
                <h3>Get in Touch</h3>
                <p class="text-muted mb-4">Have questions? We're here to help.</p>
                
                <div class="mb-3">
                    <h6><i class="bi bi-envelope me-2"></i>Email</h6>
                    <p class="text-muted mb-0">support@helpthegroup.com</p>
                </div>
                
                <div class="mb-3">
                    <h6><i class="bi bi-clock me-2"></i>Response Time</h6>
                    <p class="text-muted mb-0">We typically respond within 24-48 hours.</p>
                </div>
                
                <div>
                    <h6><i class="bi bi-info-circle me-2"></i>Quick Help</h6>
                    <p class="text-muted mb-0">Check our <a href="/faq.php">FAQ</a> for quick answers to common questions.</p>
                </div>
            </div>
        </div>
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
