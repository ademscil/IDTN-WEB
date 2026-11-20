<?php
/**
 * IDTN CMS - Public Contact Form Inquiry Submission
 * PT Infinix Delapan Teknologi Nusantara
 */

require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['error' => 'Metode HTTP tidak diizinkan.'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);

// Anti-spam Honeypot Check
if (!empty($input['website_hp'])) {
    // Bot detected: fake success response
    send_json(['success' => true, 'message' => 'Pesan Anda telah diterima.']);
}

$fullName = trim($input['full_name'] ?? '');
$company = trim($input['company'] ?? '');
$workEmail = trim(strtolower($input['work_email'] ?? ''));
$phone = trim($input['phone'] ?? '');
$solutionInterest = trim($input['solution_interest'] ?? 'General DWDM Inquiry');
$projectSummary = trim($input['project_summary'] ?? '');

if (empty($fullName) || empty($company) || empty($workEmail) || empty($phone) || empty($projectSummary)) {
    send_json(['error' => 'Mohon lengkapi seluruh kolom formulir yang bertanda bintang (*).'], 400);
}

if (!filter_var($workEmail, FILTER_VALIDATE_EMAIL)) {
    send_json(['error' => 'Format alamat email tidak valid.'], 400);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

try {
    $db = get_db();
    $stmt = $db->prepare("INSERT INTO inquiries (
        full_name, company, work_email, phone, solution_interest, project_summary, status, ip_address, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, 'unread', ?, NOW())");

    $stmt->execute([
        $fullName,
        $company,
        $workEmail,
        $phone,
        $solutionInterest,
        $projectSummary,
        $ip
    ]);

    send_json([
        'success' => true,
        'message' => 'Pesan dan permintaan konsultasi Anda berhasil dikirimkan. Tim spesialis optik IDTN akan segera menghubungi Anda.'
    ]);
} catch (Exception $e) {
    send_json(['error' => 'Gagal mengirim pesan ke server: ' . $e->getMessage()], 500);
}
