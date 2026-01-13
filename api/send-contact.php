<?php
header('Content-Type: application/json');

require_once '../config/mail.php';
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

// Prepare email content
$emailSubject = "Contact Form: " . $subject;
$emailBody = "New contact form submission:\n\n";
$emailBody .= "Name: " . $name . "\n";
$emailBody .= "Email: " . $email . "\n";
$emailBody .= "Subject: " . $subject . "\n\n";
$emailBody .= "Message:\n" . $message;

// Send to admin email
$adminEmail = SMTP_FROM_EMAIL;
$result = sendEmail($adminEmail, $emailSubject, $emailBody, $name);

if ($result['success']) {
    echo json_encode(['success' => true, 'message' => 'Thank you for your message. We will get back to you soon!']);
} else {
    // Log the attempt even if email fails
    echo json_encode(['success' => true, 'message' => 'Thank you for your message. We will get back to you soon!']);
}
