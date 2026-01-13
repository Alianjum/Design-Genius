<?php
session_start();
require_once 'config/database.php';

$error = '';
$referralCode = $_GET['ref'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $referredBy = trim($_POST['referral_code'] ?? '');
    
    if (empty($name) || empty($email) || empty($password)) {
        $error = 'Please fill in all required fields.';
    } elseif (strlen($password) < 6) {
        $error = 'Password must be at least 6 characters.';
    } else {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            $error = 'An account with this email already exists.';
        } else {
            if (!empty($referredBy)) {
                $stmt = $pdo->prepare("SELECT id FROM users WHERE referral_code = ?");
                $stmt->execute([$referredBy]);
                if (!$stmt->fetch()) {
                    $error = 'Invalid referral code.';
                }
            }
            
            if (empty($error)) {
                $newReferralCode = generateReferralCode();
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                
                $stmt = $pdo->prepare("INSERT INTO users (name, email, password, referral_code, referred_by) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$name, $email, $hashedPassword, $newReferralCode, $referredBy ?: null]);
                
                $userId = $pdo->lastInsertId();
                
                $_SESSION['user_id'] = $userId;
                $_SESSION['user_name'] = $name;
                $_SESSION['user_email'] = $email;
                $_SESSION['role'] = 'user';
                $_SESSION['referral_code'] = $newReferralCode;
                
                header('Location: /dashboard.php');
                exit;
            }
        }
    }
}

$pageTitle = 'Sign Up';
?>
<?php include 'includes/header.php'; ?>

<div class="auth-page">
    <div class="card auth-card">
        <h2>Join Our Community</h2>
        <p class="subtitle">Create your account to get started</p>
        
        <?php if ($error): ?>
            <div class="alert alert-danger" data-testid="text-error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <div class="mb-3">
                <label class="form-label" for="name">Full Name</label>
                <input type="text" class="form-control" id="name" name="name" required data-testid="input-name" value="<?php echo htmlspecialchars($_POST['name'] ?? ''); ?>">
            </div>
            <div class="mb-3">
                <label class="form-label" for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email" required data-testid="input-email" value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>">
            </div>
            <div class="mb-3">
                <label class="form-label" for="password">Password</label>
                <input type="password" class="form-control" id="password" name="password" required data-testid="input-password" minlength="6">
                <div class="form-text">At least 6 characters</div>
            </div>
            <div class="mb-3">
                <label class="form-label" for="referral_code">Referral Code (Optional)</label>
                <input type="text" class="form-control" id="referral_code" name="referral_code" data-testid="input-referral-code" value="<?php echo htmlspecialchars($referralCode ?: ($_POST['referral_code'] ?? '')); ?>" <?php echo $referralCode ? 'readonly' : ''; ?>>
                <?php if ($referralCode): ?>
                    <div class="form-text text-success">You were referred by a community member!</div>
                <?php endif; ?>
            </div>
            <button type="submit" class="btn btn-primary" data-testid="button-signup">Create Account</button>
        </form>
        
        <div class="auth-footer">
            Already have an account? <a href="/login.php" data-testid="link-login">Sign in</a>
        </div>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
