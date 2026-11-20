<?php
/**
 * IDTN CMS - Database and API Configuration
 * PT Infinix Delapan Teknologi Nusantara
 */

// Error reporting (display errors in development if needed, disable in production)
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Database Credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'idt46606_cms');
define('DB_USER', 'idt46606_admin');
define('DB_PASS', 'dataretrieve');
define('DB_CHARSET', 'utf8mb4');

// Security & JWT Config
define('JWT_SECRET', 'idtn_optics_super_secure_jwt_secret_key_2026_dwdm');
define('JWT_EXPIRY_SECONDS', 28800); // 8 hours

// CORS Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Respond to preflight OPTIONS requests immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/**
 * Get PDO Database Connection
 * @return PDO
 */
function get_db() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            send_json(['error' => 'Database connection failed: ' . $e->getMessage()], 500);
            exit;
        }
    }
    return $pdo;
}

/**
 * Send JSON Response
 * @param mixed $data
 * @param int $status_code
 */
function send_json($data, $status_code = 200) {
    http_response_code($status_code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Base64URL Encode
 */
function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

/**
 * Base64URL Decode
 */
function base64url_decode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

/**
 * Generate JWT Token
 * @param int $user_id
 * @param string $username
 * @param string $email
 * @return string
 */
function generate_jwt($user_id, $username, $email) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode([
        'sub' => $user_id,
        'username' => $username,
        'email' => $email,
        'iat' => time(),
        'exp' => time() + JWT_EXPIRY_SECONDS
    ]);

    $base64UrlHeader = base64url_encode($header);
    $base64UrlPayload = base64url_encode($payload);

    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $base64UrlSignature = base64url_encode($signature);

    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

/**
 * Verify JWT Token
 * @param string $token
 * @return array|false
 */
function verify_jwt($token) {
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        return false;
    }

    list($base64UrlHeader, $base64UrlPayload, $base64UrlSignature) = $parts;

    $signature = base64url_decode($base64UrlSignature);
    $expectedSignature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);

    if (!hash_equals($expectedSignature, $signature)) {
        return false;
    }

    $payload = json_decode(base64url_decode($base64UrlPayload), true);
    if (!$payload || !isset($payload['exp']) || $payload['exp'] < time()) {
        return false;
    }

    return $payload;
}

/**
 * Get Bearer Token from HTTP Authorization Header
 * @return string|null
 */
function get_bearer_token() {
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER['Authorization']);
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER['HTTP_AUTHORIZATION']);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }

    if (!empty($headers) && preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
        return $matches[1];
    }
    return null;
}

/**
 * Require Valid Authentication
 * @return array payload
 */
function require_auth() {
    $token = get_bearer_token();
    if (!$token) {
        send_json(['error' => 'Akses ditolak. Token autentikasi tidak ditemukan.'], 401);
    }

    $payload = verify_jwt($token);
    if (!$payload) {
        send_json(['error' => 'Sesi Anda telah berakhir. Silakan login kembali.'], 401);
    }

    return $payload;
}
