<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}
// Path to your craft/ folder
$craftPath = __DIR__ . '/../craft';

// Do not edit below this line
$path = rtrim($craftPath, '/') . '/app/index.php';

if (!is_file($path))
{
    if (function_exists('http_response_code'))
    {
        http_response_code(503);
    }

    exit('Could not find your craft/ folder. Please ensure that <strong><code>$craftPath</code></strong> is set correctly in ' . __FILE__ . "currently: {$craftPath}}");
}

require_once $path;
