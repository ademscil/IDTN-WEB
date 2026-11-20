<?php
/**
 * IDTN CMS - Admin Footer Settings Management Endpoint
 * PT Infinix Delapan Teknologi Nusantara
 */

require_once __DIR__ . '/../config.php';

$auth = require_auth();
$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM footer_settings WHERE id = 1 LIMIT 1");
    $footer = $stmt->fetch();
    send_json(['success' => true, 'footer' => $footer ?: []]);
}

if ($method === 'PUT' || $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        send_json(['error' => 'Data tidak valid.'], 400);
    }

    try {
        $stmt = $db->prepare("INSERT INTO footer_settings (
            id, company_summary_id, company_summary_en, philosophy_quote_id, philosophy_quote_en,
            copyright_id, copyright_en, address_id, address_en, email, phone, whatsapp, linkedin_url,
            sdppi_status_id, sdppi_status_en, updated_at
        ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE
            company_summary_id = VALUES(company_summary_id),
            company_summary_en = VALUES(company_summary_en),
            philosophy_quote_id = VALUES(philosophy_quote_id),
            philosophy_quote_en = VALUES(philosophy_quote_en),
            copyright_id = VALUES(copyright_id),
            copyright_en = VALUES(copyright_en),
            address_id = VALUES(address_id),
            address_en = VALUES(address_en),
            email = VALUES(email),
            phone = VALUES(phone),
            whatsapp = VALUES(whatsapp),
            linkedin_url = VALUES(linkedin_url),
            sdppi_status_id = VALUES(sdppi_status_id),
            sdppi_status_en = VALUES(sdppi_status_en),
            updated_at = NOW()");

        $stmt->execute([
            $input['company_summary_id'] ?? '',
            $input['company_summary_en'] ?? '',
            $input['philosophy_quote_id'] ?? '',
            $input['philosophy_quote_en'] ?? '',
            $input['copyright_id'] ?? '',
            $input['copyright_en'] ?? '',
            $input['address_id'] ?? '',
            $input['address_en'] ?? '',
            $input['email'] ?? '',
            $input['phone'] ?? '',
            $input['whatsapp'] ?? '',
            $input['linkedin_url'] ?? '',
            $input['sdppi_status_id'] ?? '',
            $input['sdppi_status_en'] ?? ''
        ]);

        send_json(['success' => true, 'message' => 'Pengaturan footer berhasil disimpan.']);
    } catch (PDOException $e) {
        send_json(['error' => 'Gagal menyimpan pengaturan footer: ' . $e->getMessage()], 500);
    }
}

send_json(['error' => 'Metode HTTP tidak didukung.'], 405);
