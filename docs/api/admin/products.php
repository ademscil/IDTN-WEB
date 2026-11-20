<?php
/**
 * IDTN CMS - Admin Products Management Endpoint
 * PT Infinix Delapan Teknologi Nusantara
 */

require_once __DIR__ . '/../config.php';

$auth = require_auth();
$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $db->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([(int)$id]);
        $prod = $stmt->fetch();
        if (!$prod) {
            send_json(['error' => 'Produk tidak ditemukan.'], 404);
        }
        $prod['specs'] = json_decode($prod['specs'] ?? '{}', true);
        send_json(['success' => true, 'product' => $prod]);
    }

    $stmt = $db->query("SELECT * FROM products ORDER BY sort_order ASC, id ASC");
    $products = [];
    while ($row = $stmt->fetch()) {
        $row['specs'] = json_decode($row['specs'] ?? '{}', true);
        $products[] = $row;
    }
    send_json(['success' => true, 'products' => $products]);
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['name']) || empty($input['category'])) {
        send_json(['error' => 'Nama produk dan kategori wajib diisi.'], 400);
    }

    $slug = trim($input['slug'] ?? '');
    if (empty($slug)) {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['name']), '-'));
    }

    try {
        $stmt = $db->prepare("INSERT INTO products (
            slug, name, category, form_factor, capacity, description_id, description_en, specs, datasheet_url, sort_order, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

        $stmt->execute([
            $slug,
            trim($input['name']),
            trim($input['category']),
            trim($input['form_factor'] ?? ''),
            trim($input['capacity'] ?? ''),
            trim($input['description_id'] ?? ''),
            trim($input['description_en'] ?? ''),
            json_encode($input['specs'] ?? []),
            trim($input['datasheet_url'] ?? ''),
            (int)($input['sort_order'] ?? 0),
            isset($input['is_active']) ? (int)$input['is_active'] : 1
        ]);

        send_json([
            'success' => true,
            'message' => 'Produk baru berhasil ditambahkan.',
            'id' => (int)$db->lastInsertId()
        ]);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            send_json(['error' => "Slug '{$slug}' sudah digunakan oleh produk lain."], 409);
        }
        send_json(['error' => 'Gagal menambah produk: ' . $e->getMessage()], 500);
    }
}

if ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['id'])) {
        send_json(['error' => 'ID Produk wajib disertakan.'], 400);
    }

    $id = (int)$input['id'];
    $slug = trim($input['slug'] ?? '');
    if (empty($slug)) {
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $input['name']), '-'));
    }

    try {
        $stmt = $db->prepare("UPDATE products SET
            slug = ?, name = ?, category = ?, form_factor = ?, capacity = ?,
            description_id = ?, description_en = ?, specs = ?, datasheet_url = ?,
            sort_order = ?, is_active = ?, updated_at = NOW()
        WHERE id = ?");

        $stmt->execute([
            $slug,
            trim($input['name'] ?? ''),
            trim($input['category'] ?? ''),
            trim($input['form_factor'] ?? ''),
            trim($input['capacity'] ?? ''),
            trim($input['description_id'] ?? ''),
            trim($input['description_en'] ?? ''),
            json_encode($input['specs'] ?? []),
            trim($input['datasheet_url'] ?? ''),
            (int)($input['sort_order'] ?? 0),
            isset($input['is_active']) ? (int)$input['is_active'] : 1,
            $id
        ]);

        send_json(['success' => true, 'message' => 'Produk berhasil diperbarui.']);
    } catch (PDOException $e) {
        send_json(['error' => 'Gagal memperbarui produk: ' . $e->getMessage()], 500);
    }
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) {
        send_json(['error' => 'ID Produk wajib disertakan.'], 400);
    }

    $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);
    send_json(['success' => true, 'message' => 'Produk berhasil dihapus.']);
}

send_json(['error' => 'Metode HTTP tidak didukung.'], 405);
