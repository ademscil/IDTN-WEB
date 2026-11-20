<?php
/**
 * IDTN CMS - Admin Inquiries Management Endpoint
 * PT Infinix Delapan Teknologi Nusantara
 */

require_once __DIR__ . '/../config.php';

$auth = require_auth();
$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $status = $_GET['status'] ?? null;
    if ($status && in_array($status, ['unread', 'contacted', 'archived'])) {
        $stmt = $db->prepare("SELECT * FROM inquiries WHERE status = ? ORDER BY created_at DESC");
        $stmt->execute([$status]);
    } else {
        $stmt = $db->query("SELECT * FROM inquiries ORDER BY created_at DESC");
    }
    $inquiries = $stmt->fetchAll();

    // Summary counts
    $counts = [
        'total' => (int)$db->query("SELECT COUNT(*) FROM inquiries")->fetchColumn(),
        'unread' => (int)$db->query("SELECT COUNT(*) FROM inquiries WHERE status = 'unread'")->fetchColumn(),
        'contacted' => (int)$db->query("SELECT COUNT(*) FROM inquiries WHERE status = 'contacted'")->fetchColumn(),
        'archived' => (int)$db->query("SELECT COUNT(*) FROM inquiries WHERE status = 'archived'")->fetchColumn(),
    ];

    send_json(['success' => true, 'inquiries' => $inquiries, 'counts' => $counts]);
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['id']) || empty($input['status'])) {
        send_json(['error' => 'ID dan status wajib disertakan.'], 400);
    }

    $id = (int)$input['id'];
    $status = trim($input['status']);
    if (!in_array($status, ['unread', 'contacted', 'archived'])) {
        send_json(['error' => 'Status tidak valid.'], 400);
    }

    $stmt = $db->prepare("UPDATE inquiries SET status = ? WHERE id = ?");
    $stmt->execute([$status, $id]);
    send_json(['success' => true, 'message' => "Status pesan berhasil diubah menjadi '{$status}'."]);
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) {
        send_json(['error' => 'ID Pesan wajib disertakan.'], 400);
    }

    $stmt = $db->prepare("DELETE FROM inquiries WHERE id = ?");
    $stmt->execute([$id]);
    send_json(['success' => true, 'message' => 'Pesan berhasil dihapus.']);
}

send_json(['error' => 'Metode HTTP tidak didukung.'], 405);
