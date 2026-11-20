<?php
/**
 * IDTN CMS - Manage Admin Users Endpoint
 * PT Infinix Delapan Teknologi Nusantara
 */

require_once __DIR__ . '/../config.php';

$auth = require_auth();
$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query("SELECT id, username, email, full_name, created_at, last_login FROM admin_users ORDER BY id ASC");
    $admins = $stmt->fetchAll();
    send_json(['success' => true, 'admins' => $admins]);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['username']) || empty($input['email']) || empty($input['password']) || empty($input['full_name'])) {
        send_json(['error' => 'Semua kolom (username, email, password, nama lengkap) wajib diisi.'], 400);
    }

    if (strlen($input['password']) < 8) {
        send_json(['error' => 'Password minimal harus 8 karakter.'], 400);
    }

    $username = trim($input['username']);
    $email = trim(strtolower($input['email']));
    $fullName = trim($input['full_name']);
    $hash = password_hash($input['password'], PASSWORD_BCRYPT);

    try {
        $stmt = $db->prepare("INSERT INTO admin_users (username, email, password_hash, full_name) VALUES (?, ?, ?, ?)");
        $stmt->execute([$username, $email, $hash, $fullName]);
        send_json(['success' => true, 'message' => 'Admin baru berhasil ditambahkan.', 'id' => (int)$db->lastInsertId()]);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            send_json(['error' => 'Username atau email sudah digunakan.'], 409);
        }
        send_json(['error' => 'Gagal menambahkan admin: ' . $e->getMessage()], 500);
    }
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['id'])) {
        send_json(['error' => 'ID Admin wajib disertakan.'], 400);
    }

    $id = (int)$input['id'];
    $fullName = trim($input['full_name'] ?? '');
    $email = trim(strtolower($input['email'] ?? ''));
    $newPassword = trim($input['new_password'] ?? '');

    if (empty($fullName) || empty($email)) {
        send_json(['error' => 'Nama lengkap dan email tidak boleh kosong.'], 400);
    }

    try {
        if (!empty($newPassword)) {
            if (strlen($newPassword) < 8) {
                send_json(['error' => 'Password baru minimal harus 8 karakter.'], 400);
            }
            $hash = password_hash($newPassword, PASSWORD_BCRYPT);
            $stmt = $db->prepare("UPDATE admin_users SET full_name = ?, email = ?, password_hash = ? WHERE id = ?");
            $stmt->execute([$fullName, $email, $hash, $id]);
        } else {
            $stmt = $db->prepare("UPDATE admin_users SET full_name = ?, email = ? WHERE id = ?");
            $stmt->execute([$fullName, $email, $id]);
        }
        send_json(['success' => true, 'message' => 'Profil admin berhasil diperbarui.']);
    } catch (PDOException $e) {
        send_json(['error' => 'Gagal memperbarui admin: ' . $e->getMessage()], 500);
    }
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) {
        send_json(['error' => 'ID Admin wajib disertakan.'], 400);
    }

    if ($id === (int)$auth['sub']) {
        send_json(['error' => 'Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif.'], 400);
    }

    // Check count
    $count = (int)$db->query("SELECT COUNT(*) FROM admin_users")->fetchColumn();
    if ($count <= 1) {
        send_json(['error' => 'Tidak dapat menghapus admin terakhir pada sistem.'], 400);
    }

    $stmt = $db->prepare("DELETE FROM admin_users WHERE id = ?");
    $stmt->execute([$id]);
    send_json(['success' => true, 'message' => 'Admin berhasil dihapus.']);
}

send_json(['error' => 'Metode HTTP tidak didukung.'], 405);
