<?php
/**
 * IDTN CMS - Admin Clients & Partners Management Endpoint
 * PT Infinix Delapan Teknologi Nusantara
 */

require_once __DIR__ . '/../config.php';

$auth = require_auth();
$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM clients ORDER BY sort_order ASC, id ASC");
    $clients = $stmt->fetchAll();
    send_json(['success' => true, 'clients' => $clients]);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['name']) || empty($input['logo_url'])) {
        send_json(['error' => 'Nama mitra/klien dan URL logo wajib diisi.'], 400);
    }

    try {
        $stmt = $db->prepare("INSERT INTO clients (name, category, logo_url, is_partner, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            trim($input['name']),
            trim($input['category'] ?? 'Partner'),
            trim($input['logo_url']),
            isset($input['is_partner']) ? (int)$input['is_partner'] : 1,
            (int)($input['sort_order'] ?? 0),
            isset($input['is_active']) ? (int)$input['is_active'] : 1
        ]);

        send_json(['success' => true, 'message' => 'Mitra/Klien berhasil ditambahkan.', 'id' => (int)$db->lastInsertId()]);
    } catch (PDOException $e) {
        send_json(['error' => 'Gagal menambah mitra/klien: ' . $e->getMessage()], 500);
    }
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['id'])) {
        send_json(['error' => 'ID Klien wajib disertakan.'], 400);
    }

    try {
        $stmt = $db->prepare("UPDATE clients SET name = ?, category = ?, logo_url = ?, is_partner = ?, sort_order = ?, is_active = ?, updated_at = NOW() WHERE id = ?");
        $stmt->execute([
            trim($input['name'] ?? ''),
            trim($input['category'] ?? 'Partner'),
            trim($input['logo_url'] ?? ''),
            isset($input['is_partner']) ? (int)$input['is_partner'] : 1,
            (int)($input['sort_order'] ?? 0),
            isset($input['is_active']) ? (int)$input['is_active'] : 1,
            (int)$input['id']
        ]);

        send_json(['success' => true, 'message' => 'Data mitra/klien berhasil diperbarui.']);
    } catch (PDOException $e) {
        send_json(['error' => 'Gagal memperbarui klien: ' . $e->getMessage()], 500);
    }
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) {
        send_json(['error' => 'ID Klien wajib disertakan.'], 400);
    }

    $stmt = $db->prepare("DELETE FROM clients WHERE id = ?");
    $stmt->execute([$id]);
    send_json(['success' => true, 'message' => 'Mitra/Klien berhasil dihapus.']);
}

send_json(['error' => 'Metode HTTP tidak didukung.'], 405);
