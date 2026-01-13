<?php
session_start();
header('Content-Type: application/json');

require_once '../config/mail.php';
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Please log in to send invitations.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$emails = trim($data['emails'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

if (empty($emails) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all fields.']);
    exit;
}

$userId = $_SESSION['user_id'];
$userName = $_SESSION['user_name'];
$referralCode = $_SESSION['referral_code'];

// Parse email list
$emailList = array_filter(array_map('trim', explode(',', $emails)));
$validEmails = array_filter($emailList, function($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
});

if (empty($validEmails)) {
    echo json_encode(['success' => false, 'message' => 'Please enter at least one valid email address.']);
    exit;
}

// Build referral URL
$protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'];
$referralUrl = $protocol . '://' . $host . '/signup.php?ref=' . $referralCode;

// Replace placeholder in message
$finalMessage = str_replace('{{REFERRAL_URL}}', $referralUrl, $message);

$successCount = 0;
$failCount = 0;

foreach ($validEmails as $recipientEmail) {
    // Send email
    $result = sendEmail($recipientEmail, $subject, $finalMessage, $userName);
    
    // Log to database
    $status = $result['success'] ? 'sent' : 'failed';
    $stmt = $pdo->prepare("INSERT INTO email_logs (sender_id, recipient_email, subject, message, status) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$userId, $recipientEmail, $subject, $finalMessage, $status]);
    
    if ($result['success']) {
        $successCount++;
    } else {
        $failCount++;
    }
}

if ($successCount > 0) {
    $msg = "Invitation(s) sent to $successCount recipient(s)!";
    if ($failCount > 0) {
        $msg .= " ($failCount failed)";
    }
    echo json_encode(['success' => true, 'message' => $msg]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send invitations. Please check your email configuration.']);
}
