<?php
// SMTP Configuration - Set these as environment variables/secrets
// Required secrets: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_EMAIL
define('SMTP_HOST', getenv('SMTP_HOST') ?: '');
define('SMTP_PORT', getenv('SMTP_PORT') ?: 587);
define('SMTP_USER', getenv('SMTP_USER') ?: '');
define('SMTP_PASS', getenv('SMTP_PASS') ?: '');
define('SMTP_FROM_EMAIL', getenv('SMTP_FROM_EMAIL') ?: '');
define('SMTP_FROM_NAME', getenv('SMTP_FROM_NAME') ?: 'Help the Group');
define('SMTP_ENCRYPTION', getenv('SMTP_ENCRYPTION') ?: 'tls');

function isSmtpConfigured() {
    return !empty(SMTP_HOST) && !empty(SMTP_USER) && !empty(SMTP_PASS) && !empty(SMTP_FROM_EMAIL);
}

function sendEmail($to, $subject, $body, $fromName = null) {
    $fromEmail = SMTP_FROM_EMAIL;
    $fromNameFinal = $fromName ?: SMTP_FROM_NAME;
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $fromNameFinal . ' <' . $fromEmail . '>',
        'Reply-To: ' . $fromEmail,
        'X-Mailer: PHP/' . phpversion()
    ];
    
    // For development/testing, we'll use PHP's mail() function
    // In production, you should use a proper SMTP library like PHPMailer
    
    // Convert plain text to HTML
    $htmlBody = nl2br(htmlspecialchars($body));
    $htmlMessage = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1D4ED8; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Help the Group</h2>
            </div>
            <div class="content">
                ' . $htmlBody . '
            </div>
            <div class="footer">
                <p>This email was sent from Help the Group Community</p>
            </div>
        </div>
    </body>
    </html>';
    
    // Try to send using SMTP socket connection
    $result = sendViaSMTP($to, $subject, $htmlMessage, $fromEmail, $fromNameFinal);
    
    if ($result === true) {
        return ['success' => true, 'message' => 'Email sent successfully'];
    }
    
    // Fallback to mail() function
    $sent = @mail($to, $subject, $htmlMessage, implode("\r\n", $headers));
    
    if ($sent) {
        return ['success' => true, 'message' => 'Email sent successfully'];
    }
    
    return ['success' => false, 'message' => 'Failed to send email. Please check SMTP configuration.'];
}

function sendViaSMTP($to, $subject, $body, $fromEmail, $fromName) {
    // Skip if SMTP is not configured
    if (!isSmtpConfigured()) {
        return false;
    }
    
    $host = SMTP_HOST;
    $port = SMTP_PORT;
    $user = SMTP_USER;
    $pass = SMTP_PASS;
    
    try {
        $encryption = SMTP_ENCRYPTION;
        $prefix = ($encryption === 'ssl') ? 'ssl://' : '';
        
        $socket = @fsockopen($prefix . $host, $port, $errno, $errstr, 30);
        
        if (!$socket) {
            return false;
        }
        
        $response = fgets($socket, 515);
        if (substr($response, 0, 3) != '220') {
            fclose($socket);
            return false;
        }
        
        // EHLO
        fputs($socket, "EHLO " . gethostname() . "\r\n");
        while ($line = fgets($socket, 515)) {
            if (substr($line, 3, 1) == ' ') break;
        }
        
        // STARTTLS for TLS encryption
        if ($encryption === 'tls') {
            fputs($socket, "STARTTLS\r\n");
            $response = fgets($socket, 515);
            if (substr($response, 0, 3) != '220') {
                fclose($socket);
                return false;
            }
            
            stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            
            fputs($socket, "EHLO " . gethostname() . "\r\n");
            while ($line = fgets($socket, 515)) {
                if (substr($line, 3, 1) == ' ') break;
            }
        }
        
        // AUTH LOGIN
        fputs($socket, "AUTH LOGIN\r\n");
        $response = fgets($socket, 515);
        
        fputs($socket, base64_encode($user) . "\r\n");
        $response = fgets($socket, 515);
        
        fputs($socket, base64_encode($pass) . "\r\n");
        $response = fgets($socket, 515);
        
        if (substr($response, 0, 3) != '235') {
            fclose($socket);
            return false;
        }
        
        // MAIL FROM
        fputs($socket, "MAIL FROM:<{$fromEmail}>\r\n");
        $response = fgets($socket, 515);
        
        // RCPT TO
        fputs($socket, "RCPT TO:<{$to}>\r\n");
        $response = fgets($socket, 515);
        
        // DATA
        fputs($socket, "DATA\r\n");
        $response = fgets($socket, 515);
        
        // Headers and body
        $headers = "From: {$fromName} <{$fromEmail}>\r\n";
        $headers .= "To: {$to}\r\n";
        $headers .= "Subject: {$subject}\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "\r\n";
        
        fputs($socket, $headers . $body . "\r\n.\r\n");
        $response = fgets($socket, 515);
        
        // QUIT
        fputs($socket, "QUIT\r\n");
        fclose($socket);
        
        return substr($response, 0, 3) == '250';
        
    } catch (Exception $e) {
        return false;
    }
}
