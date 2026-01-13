<?php
require_once __DIR__ . '/database.php';

$pdo->exec("
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        referral_code VARCHAR(20) UNIQUE NOT NULL,
        referred_by VARCHAR(20),
        role VARCHAR(20) DEFAULT 'user',
        is_active BOOLEAN DEFAULT TRUE,
        join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
");

$pdo->exec("
    CREATE TABLE IF NOT EXISTS email_logs (
        id SERIAL PRIMARY KEY,
        sender_id INTEGER REFERENCES users(id),
        recipient_email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'sent',
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
");

$stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
$stmt->execute(['admin@helpthegroup.com']);
if ($stmt->fetchColumn() == 0) {
    $adminCode = generateReferralCode();
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, referral_code, role) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute(['Admin User', 'admin@helpthegroup.com', password_hash('admin123', PASSWORD_DEFAULT), $adminCode, 'admin']);
    
    $sarahCode = generateReferralCode();
    $stmt->execute(['Sarah Johnson', 'sarah@example.com', password_hash('password123', PASSWORD_DEFAULT), $sarahCode, 'user']);
    $pdo->prepare("UPDATE users SET referred_by = ? WHERE email = ?")->execute([$adminCode, 'sarah@example.com']);
    
    $michaelCode = generateReferralCode();
    $stmt->execute(['Michael Chen', 'michael@example.com', password_hash('password123', PASSWORD_DEFAULT), $michaelCode, 'user']);
    $pdo->prepare("UPDATE users SET referred_by = ? WHERE email = ?")->execute([$sarahCode, 'michael@example.com']);
    
    $emilyCode = generateReferralCode();
    $stmt->execute(['Emily Davis', 'emily@example.com', password_hash('password123', PASSWORD_DEFAULT), $emilyCode, 'user']);
    $pdo->prepare("UPDATE users SET referred_by = ? WHERE email = ?")->execute([$adminCode, 'emily@example.com']);
    
    $jamesCode = generateReferralCode();
    $stmt->execute(['James Wilson', 'james@example.com', password_hash('password123', PASSWORD_DEFAULT), $jamesCode, 'user']);
    $pdo->prepare("UPDATE users SET referred_by = ? WHERE email = ?")->execute([$adminCode, 'james@example.com']);
}

echo "Database initialized successfully!";
