<?php
session_start();
require_once 'config/database.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        $error = 'Please fill in all fields.';
    } else {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['referral_code'] = $user['referral_code'];
            
            if ($user['role'] === 'admin') {
                header('Location: /admin/dashboard.php');
            } else {
                header('Location: /dashboard.php');
            }
            exit;
        } else {
            $error = 'Invalid email or password.';
        }
    }
}

$pageTitle = 'Login';
?>
<?php include 'includes/header.php'; ?>

<div class="auth-page">
    <div class="card auth-card">
        <h2>Welcome Back</h2>
        <p class="subtitle">Sign in to your account</p>
        
        <?php if ($error): ?>
            <div class="alert alert-danger" data-testid="text-error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <div class="mb-3">
                <label class="form-label" for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email" required data-testid="input-email" value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>">
            </div>
            <div class="mb-3">
                <label class="form-label" for="password">Password</label>
                <input type="password" class="form-control" id="password" name="password" required data-testid="input-password">
            </div>
            <button type="submit" class="btn btn-primary" data-testid="button-login">Sign In</button>
        </form>
        
        <div class="auth-footer">
            Don't have an account? <a href="/signup.php" data-testid="link-signup">Join our community</a>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
