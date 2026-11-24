<?php
/**
 * IDTN CMS - Admin Media & Document Upload Endpoint
 * PT Infinix Delapan Teknologi Nusantara
 */

require_once __DIR__ . '/../config.php';

$auth = require_auth();
$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];

$uploadDir = dirname(dirname(__DIR__)) . '/uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM media_files ORDER BY uploaded_at DESC");
    $files = $stmt->fetchAll();

    // Fetch active company profile URL from about page
    $activeCompanyProfileUrl = null;
    try {
        $stmtAbout = $db->prepare("SELECT hero_data_id FROM page_contents WHERE page_key = 'about'");
        $stmtAbout->execute();
        if ($rowAbout = $stmtAbout->fetch()) {
            $heroId = json_decode($rowAbout['hero_data_id'] ?? '{}', true);
            $activeCompanyProfileUrl = $heroId['company_profile_url'] ?? null;
        }
    } catch (Exception $e) {
        // Fallback gracefully
    }

    send_json([
        'success' => true,
        'files' => $files,
        'active_company_profile_url' => $activeCompanyProfileUrl
    ]);
}

if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $jsonInput = json_decode($rawInput, true);

    // Dedicated action to set active company profile
    if ($jsonInput && isset($jsonInput['action']) && $jsonInput['action'] === 'set_company_profile') {
        $fileUrl = trim($jsonInput['file_url'] ?? '');
        $labelId = trim($jsonInput['company_profile_label'] ?? '');
        $labelEn = trim($jsonInput['company_profile_label_en'] ?? $labelId);
        if (!$fileUrl) {
            send_json(['error' => 'URL file tidak boleh kosong.'], 400);
        }

        try {
            $stmtAbout = $db->prepare("SELECT hero_data_id, hero_data_en FROM page_contents WHERE page_key = 'about'");
            $stmtAbout->execute();
            $rowAbout = $stmtAbout->fetch();

            $heroId = $rowAbout ? json_decode($rowAbout['hero_data_id'] ?? '{}', true) : [];
            $heroEn = $rowAbout ? json_decode($rowAbout['hero_data_en'] ?? '{}', true) : [];

            $heroId['company_profile_url'] = $fileUrl;
            $heroEn['company_profile_url'] = $fileUrl;
            if ($labelId) {
                $heroId['company_profile_label'] = $labelId;
            }
            if ($labelEn) {
                $heroEn['company_profile_label'] = $labelEn;
            }

            if ($rowAbout) {
                $updateStmt = $db->prepare("UPDATE page_contents SET hero_data_id = ?, hero_data_en = ?, updated_at = NOW() WHERE page_key = 'about'");
                $updateStmt->execute([json_encode($heroId), json_encode($heroEn)]);
            } else {
                $insertStmt = $db->prepare("INSERT INTO page_contents (page_key, seo_title_id, seo_title_en, hero_data_id, hero_data_en) VALUES ('about', 'Tentang Kami — IDTN', 'About Us — IDTN', ?, ?)");
                $insertStmt->execute([json_encode($heroId), json_encode($heroEn)]);
            }

            send_json([
                'success' => true,
                'message' => 'File berhasil diset sebagai Company Profile aktif di halaman Tentang Kami (/about)!',
                'active_company_profile_url' => $fileUrl
            ]);
        } catch (PDOException $e) {
            send_json(['error' => 'Gagal memperbarui tautan Company Profile: ' . $e->getMessage()], 500);
        }
    }

    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        send_json(['error' => 'Gagal mengunggah file. Pastikan ukuran file tidak melebihi batas.'], 400);
    }

    $file = $_FILES['file'];
    $originalName = basename($file['name']);
    $fileSize = (int)$file['size'];
    $maxSize = 25 * 1024 * 1024; // 25 MB

    if ($fileSize > $maxSize) {
        send_json(['error' => 'Ukuran file melebihi batas maksimum 25MB.'], 400);
    }

    $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    $allowedExts = ['pdf', 'pptx', 'png', 'jpg', 'jpeg', 'webp', 'svg'];

    if (!in_array($ext, $allowedExts)) {
        send_json(['error' => 'Tipe file tidak diizinkan. Hanya file PDF, PPTX, PNG, JPG, WEBP, dan SVG yang didukung.'], 400);
    }

    // Generate safe unique filename
    $cleanBaseName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($originalName, PATHINFO_FILENAME));
    $uniqueFileName = 'idtn_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    $targetPath = $uploadDir . $uniqueFileName;

    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        send_json(['error' => 'Gagal menyimpan file ke direktori server.'], 500);
    }

    $publicUrl = '/uploads/' . $uniqueFileName;

    try {
        $stmt = $db->prepare("INSERT INTO media_files (original_name, file_name, file_path, file_type, file_size, uploaded_at) VALUES (?, ?, ?, ?, ?, NOW())");
        $stmt->execute([
            $originalName,
            $uniqueFileName,
            $publicUrl,
            $ext,
            $fileSize
        ]);

        send_json([
            'success' => true,
            'message' => 'File berhasil diunggah.',
            'file' => [
                'id' => (int)$db->lastInsertId(),
                'original_name' => $originalName,
                'file_name' => $uniqueFileName,
                'url' => $publicUrl,
                'file_type' => $ext,
                'file_size' => $fileSize
            ]
        ]);
    } catch (PDOException $e) {
        send_json(['error' => 'Gagal mencatat file ke database: ' . $e->getMessage()], 500);
    }
}

if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) {
        send_json(['error' => 'ID File wajib disertakan.'], 400);
    }

    $stmt = $db->prepare("SELECT file_name FROM media_files WHERE id = ?");
    $stmt->execute([$id]);
    $fileName = $stmt->fetchColumn();

    if ($fileName) {
        $filePath = $uploadDir . $fileName;
        if (file_exists($filePath)) {
            unlink($filePath);
        }
        $delStmt = $db->prepare("DELETE FROM media_files WHERE id = ?");
        $delStmt->execute([$id]);
    }

    send_json(['success' => true, 'message' => 'File berhasil dihapus.']);
}

send_json(['error' => 'Metode HTTP tidak didukung.'], 405);
