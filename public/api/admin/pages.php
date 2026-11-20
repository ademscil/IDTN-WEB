<?php
/**
 * IDTN CMS - Admin Pages & SEO Management Endpoint
 * PT Infinix Delapan Teknologi Nusantara
 */

require_once __DIR__ . '/../config.php';

$auth = require_auth();
$db = get_db();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $pageKey = $_GET['page'] ?? null;
    if ($pageKey) {
        $stmt = $db->prepare("SELECT * FROM page_contents WHERE page_key = ?");
        $stmt->execute([$pageKey]);
        $page = $stmt->fetch();
        if (!$page) {
            send_json(['error' => 'Halaman tidak ditemukan.'], 404);
        }
        $page['hero_data_id'] = json_decode($page['hero_data_id'] ?? '{}', true);
        $page['hero_data_en'] = json_decode($page['hero_data_en'] ?? '{}', true);
        $page['sections_data_id'] = json_decode($page['sections_data_id'] ?? '{}', true);
        $page['sections_data_en'] = json_decode($page['sections_data_en'] ?? '{}', true);
        send_json(['success' => true, 'page' => $page]);
    }

    $stmt = $db->query("SELECT * FROM page_contents ORDER BY id ASC");
    $pages = [];
    while ($row = $stmt->fetch()) {
        $row['hero_data_id'] = json_decode($row['hero_data_id'] ?? '{}', true);
        $row['hero_data_en'] = json_decode($row['hero_data_en'] ?? '{}', true);
        $row['sections_data_id'] = json_decode($row['sections_data_id'] ?? '{}', true);
        $row['sections_data_en'] = json_decode($row['sections_data_en'] ?? '{}', true);
        $pages[$row['page_key']] = $row;
    }
    send_json(['success' => true, 'pages' => $pages]);
}

if ($method === 'PUT' || $method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['page_key'])) {
        send_json(['error' => 'Key halaman (page_key) wajib disertakan.'], 400);
    }

    $pageKey = trim($input['page_key']);
    $seoTitleId = trim($input['seo_title_id'] ?? '');
    $seoTitleEn = trim($input['seo_title_en'] ?? '');
    $seoDescId = trim($input['seo_description_id'] ?? '');
    $seoDescEn = trim($input['seo_description_en'] ?? '');
    $seoKeywordsId = trim($input['seo_keywords_id'] ?? '');
    $seoKeywordsEn = trim($input['seo_keywords_en'] ?? '');
    $heroId = json_encode($input['hero_data_id'] ?? []);
    $heroEn = json_encode($input['hero_data_en'] ?? []);
    $sectionsId = json_encode($input['sections_data_id'] ?? []);
    $sectionsEn = json_encode($input['sections_data_en'] ?? []);

    try {
        $stmt = $db->prepare("INSERT INTO page_contents (
            page_key, seo_title_id, seo_title_en, seo_description_id, seo_description_en,
            seo_keywords_id, seo_keywords_en, hero_data_id, hero_data_en, sections_data_id, sections_data_en
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            seo_title_id = VALUES(seo_title_id),
            seo_title_en = VALUES(seo_title_en),
            seo_description_id = VALUES(seo_description_id),
            seo_description_en = VALUES(seo_description_en),
            seo_keywords_id = VALUES(seo_keywords_id),
            seo_keywords_en = VALUES(seo_keywords_en),
            hero_data_id = VALUES(hero_data_id),
            hero_data_en = VALUES(hero_data_en),
            sections_data_id = VALUES(sections_data_id),
            sections_data_en = VALUES(sections_data_en),
            updated_at = NOW()");

        $stmt->execute([
            $pageKey, $seoTitleId, $seoTitleEn, $seoDescId, $seoDescEn,
            $seoKeywordsId, $seoKeywordsEn, $heroId, $heroEn, $sectionsId, $sectionsEn
        ]);

        send_json(['success' => true, 'message' => "Pengaturan konten dan SEO halaman '{$pageKey}' berhasil disimpan."]);
    } catch (PDOException $e) {
        send_json(['error' => 'Gagal menyimpan data halaman: ' . $e->getMessage()], 500);
    }
}

send_json(['error' => 'Metode HTTP tidak didukung.'], 405);
