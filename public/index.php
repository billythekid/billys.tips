<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
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
