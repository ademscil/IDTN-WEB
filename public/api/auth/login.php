<?php
/**
 * IDTN CMS - Admin Login Endpoint
 * PT Infinix Delapan Teknologi Nusantara
 */

require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['error' => 'Metode HTTP tidak diizinkan.'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['username']) || empty($input['password'])) {
    send_json(['error' => 'Email/Username dan Password wajib diisi.'], 400);
}

$username = trim($input['username']);
$password = trim($input['password']);
$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

$db = get_db();

// 1. Brute-force Rate Limiting Check
$stmtCheck = $db->prepare("SELECT attempts, last_attempt FROM login_attempts WHERE ip_address = ?");
$stmtCheck->execute([$ip]);
$attempt = $stmtCheck->fetch();

if ($attempt && $attempt['attempts'] >= 5) {
    $timeSinceLast = time() - strtotime($attempt['last_attempt']);
    if ($timeSinceLast < 900) { // 15 minutes lockout
        $remaining = ceil((900 - $timeSinceLast) / 60);
        send_json([
            'error' => "Terlalu banyak percobaan login gagal. Akun dikunci sementara. Silakan coba lagi dalam {$remaining} menit."
        ], 429);
    } else {
        // Reset after 15 minutes
        $stmtReset = $db->prepare("DELETE FROM login_attempts WHERE ip_address = ?");
        $stmtReset->execute([$ip]);
    }
}

// 2. Query Admin User (by email or username)
$stmt = $db->prepare("SELECT id, username, email, password_hash, full_name FROM admin_users WHERE email = ? OR username = ? LIMIT 1");
$stmt->execute([$username, $username]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    // Record Failed Attempt
    $stmtRecord = $db->prepare("INSERT INTO login_attempts (ip_address, attempts, last_attempt)
        VALUES (?, 1, NOW())
        ON DUPLICATE KEY UPDATE attempts = attempts + 1, last_attempt = NOW()");
    $stmtRecord->execute([$ip]);

    send_json(['error' => 'Email/Username atau Password tidak cocok.'], 401);
}

// 3. Login Success: Clear rate limit & update last_login
$stmtClear = $db->prepare("DELETE FROM login_attempts WHERE ip_address = ?");
$stmtClear->execute([$ip]);

$stmtUpdate = $db->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?");
$stmtUpdate->execute([$user['id']]);

// 4. Generate JWT
$token = generate_jwt($user['id'], $user['username'], $user['email']);

send_json([
    'success' => true,
    'message' => 'Login berhasil.',
    'token' => $token,
    'user' => [
        'id' => (int)$user['id'],
        'username' => $user['username'],
        'email' => $user['email'],
        'full_name' => $user['full_name']
    ]
]);
