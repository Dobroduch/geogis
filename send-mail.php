<?php
/**
 * GEOGIS SK — contact form handler.
 * Upload this file next to index.html / kontakt.html on your hosting
 * (works on standard PHP shared hosting, e.g. WebSupport.sk).
 */

// ---- Config -----------------------------------------------------------
$recipientEmail = 'neemand27@gmail.com';
$siteName       = 'GEOGIS SK';
// Must be an address on your own hosted domain, otherwise many mail
// servers will reject or spam-flag the message. Any address at your
// domain works even if nobody reads it (e.g. noreply@geogis.sk) —
// it does not need to be a real mailbox.
$fromEmail      = 'noreply@geogis.sk';

// Spam / abuse limits.
$maxPerWindow       = 4;    // max submissions...
$windowSeconds      = 3600; // ...per IP, per hour
$minSecondsBetween  = 20;   // minimum gap between two submissions from the same IP
$minFormSeconds     = 3;    // reject submits faster than this after the page loaded
$maxFieldLength = [
    'name'    => 120,
    'email'   => 254,
    'phone'   => 40,
    'subject' => 150,
    'message' => 5000,
];
// A fixed pepper for hashing IPs at rest (not a secret worth protecting —
// just keeps raw IPs out of the rate-limit file). Change it if you like.
$ipHashSalt = 'geogis-sk-ratelimit';
// -------------------------------------------------------------------- -

// Never leak PHP errors/warnings into the JSON response or expose paths.
ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

set_exception_handler(function ($e) {
    error_log('GEOGIS contact form: ' . $e->getMessage());
    respond(500, ['success' => false, 'error' => 'server_error']);
});

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['success' => false, 'error' => 'method_not_allowed']);
}

// ---- Same-origin check ---------------------------------------------------
// Blind cross-site POSTs (a hidden form or fetch() on someone else's page)
// still reach this script even without CORS permission, since CORS only
// stops the attacker's JS from reading the *response* — not the server
// from acting on the request. Comparing Origin/Referer against the host
// this request actually came in on blocks that, with no hardcoded domain
// (so it keeps working on localhost while testing and on the live host).
function hostOnly(string $hostOrUrl): ?string {
    $host = str_contains($hostOrUrl, '://')
        ? parse_url($hostOrUrl, PHP_URL_HOST)
        : parse_url('http://' . $hostOrUrl, PHP_URL_HOST);
    return $host !== false && $host !== null ? strtolower($host) : null;
}

$selfHost = hostOnly((string)($_SERVER['HTTP_HOST'] ?? ''));
$originHeader = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
$refererHeader = (string)($_SERVER['HTTP_REFERER'] ?? '');
$claimedHost = $originHeader !== '' ? hostOnly($originHeader) : ($refererHeader !== '' ? hostOnly($refererHeader) : null);

if ($claimedHost !== null && $selfHost !== null && $claimedHost !== $selfHost) {
    respond(403, ['success' => false, 'error' => 'forbidden']);
}

// ---- Honeypot --------------------------------------------------------
// Real visitors never fill this hidden field in. Bots that do get a fake
// "success" so they don't learn to avoid it.
if (!empty($_POST['_honey'])) {
    respond(200, ['success' => true]);
}

// ---- Minimum fill time -------------------------------------------------
// _ts is set client-side (js/script.js) to the page-load time. Submitting
// faster than a human could read and fill the form is a strong bot signal.
$loadedAtMs = filter_input(INPUT_POST, '_ts', FILTER_VALIDATE_FLOAT);
if ($loadedAtMs) {
    $elapsed = time() - (int)round($loadedAtMs / 1000);
    if ($elapsed >= 0 && $elapsed < $minFormSeconds) {
        respond(422, ['success' => false, 'error' => 'too_fast']);
    }
}

// ---- Rate limiting (per IP) --------------------------------------------
function checkRateLimit(string $ip, string $salt, int $maxPerWindow, int $windowSeconds, int $minSecondsBetween): bool {
    $dir = __DIR__ . '/data';
    $file = $dir . '/ratelimit.json';

    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }
    if (!is_dir($dir) || !is_writable($dir)) {
        // Storage unavailable (e.g. permissions on first deploy): fail
        // open so a hosting hiccup never blocks every real visitor —
        // the honeypot, origin check and timing guard still apply.
        return true;
    }

    $fp = fopen($file, 'c+');
    if (!$fp) {
        return true;
    }

    $allowed = true;
    if (flock($fp, LOCK_EX)) {
        $raw = stream_get_contents($fp);
        $data = $raw ? json_decode($raw, true) : [];
        if (!is_array($data)) {
            $data = [];
        }

        $now = time();
        $key = hash('sha256', $salt . '|' . $ip);
        $timestamps = array_values(array_filter($data[$key] ?? [], function ($t) use ($now, $windowSeconds) {
            return is_int($t) && ($now - $t) < $windowSeconds;
        }));

        if (count($timestamps) >= $maxPerWindow) {
            $allowed = false;
        } elseif (!empty($timestamps) && ($now - max($timestamps)) < $minSecondsBetween) {
            $allowed = false;
        }

        if ($allowed) {
            $timestamps[] = $now;
            $data[$key] = $timestamps;

            // Prune anything older than a day so the file can't grow forever.
            foreach ($data as $k => $times) {
                $times = array_values(array_filter((array)$times, function ($t) use ($now) {
                    return is_int($t) && ($now - $t) < 86400;
                }));
                if (empty($times)) {
                    unset($data[$k]);
                } else {
                    $data[$k] = $times;
                }
            }

            ftruncate($fp, 0);
            rewind($fp);
            fwrite($fp, json_encode($data));
            fflush($fp);
        }

        flock($fp, LOCK_UN);
    }
    fclose($fp);
    return $allowed;
}

$ip = (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (!checkRateLimit($ip, $ipHashSalt, $maxPerWindow, $windowSeconds, $minSecondsBetween)) {
    respond(429, ['success' => false, 'error' => 'rate_limited']);
}

// ---- Field validation ---------------------------------------------------
function field(string $key): string {
    return trim((string)($_POST[$key] ?? ''));
}

// Strip anything that could be used for email header injection.
function cleanHeaderValue(string $value): string {
    return trim(preg_replace('/[\r\n\x00]+/', ' ', $value));
}

$name    = field('name');
$email   = field('email');
$phone   = field('phone');
$subject = field('subject');
$message = field('message');

$errors = [];
// strlen() (byte length) is used instead of mb_strlen() so this doesn't
// hard-depend on the mbstring extension being enabled on the host — it
// just means the cap triggers a little earlier for non-ASCII text, which
// is fine for a safety limit rather than an exact character count.
if ($name === '' || strlen($name) > $maxFieldLength['name']) {
    $errors[] = 'name';
}
if ($email === '' || strlen($email) > $maxFieldLength['email'] || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email';
}
if (strlen($phone) > $maxFieldLength['phone']) {
    $errors[] = 'phone';
}
if (strlen($subject) > $maxFieldLength['subject']) {
    $errors[] = 'subject';
}
if ($message === '' || strlen($message) > $maxFieldLength['message']) {
    $errors[] = 'message';
}

if (!empty($errors)) {
    respond(422, ['success' => false, 'error' => 'validation', 'fields' => $errors]);
}

$name    = cleanHeaderValue($name);
$email   = cleanHeaderValue($email);
$phone   = cleanHeaderValue($phone);
$subject = cleanHeaderValue($subject);
// The message field may legitimately contain newlines; only normalise them.
$message = str_replace(["\r\n", "\r", "\x00"], "\n", $message);

$mailSubject = $subject !== '' ? $subject : "Nová správa z webu {$siteName}";
$encodedSubject = '=?UTF-8?B?' . base64_encode($mailSubject) . '?=';

$body  = "Nová správa z kontaktného formulára na webe {$siteName}\n\n";
$body .= "Meno a priezvisko: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Telefón: " . ($phone !== '' ? $phone : '-') . "\n";
$body .= "Predmet: " . ($subject !== '' ? $subject : '-') . "\n\n";
$body .= "Správa:\n{$message}\n";

// RFC 5321 requires CRLF line endings; normalise whatever we built above.
$body = str_replace(["\r\n", "\r"], "\n", $body);
$body = str_replace("\n", "\r\n", $body);

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: {$siteName} <{$fromEmail}>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";

$sent = @mail($recipientEmail, $encodedSubject, $body, $headers);

if ($sent) {
    respond(200, ['success' => true]);
}

error_log('GEOGIS contact form: mail() returned false');
respond(500, ['success' => false, 'error' => 'mail_failed']);
