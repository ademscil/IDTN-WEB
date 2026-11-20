<?php
/**
 * IDTN CMS - Current Session Info Endpoint
 * PT Infinix Delapan Teknologi Nusantara
 */

require_once __DIR__ . '/../config.php';

$payload = require_auth();
$db = get_db();

$stmt = $db->prepare("SELECT id, username, email, full_name, created_at, last_login FROM admin_users WHERE id = ?");
$stmt->execute([$payload['sub']]);
$user = $stmt->fetch();

if (!$user) {
    send_json(['error' => 'Pengguna tidak ditemukan.'], 404);
}

send_json([
    'success' => true,
    'user' => [
        'id' => (int)$user['id'],
        'username' => $user['username'],
        'email' => $user['email'],
        'full_name' => $user['full_name'],
        'created_at' => $user['created_at'],
        'last_login' => $user['last_login']
    ]
]);
