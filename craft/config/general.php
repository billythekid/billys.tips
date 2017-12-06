<?php

/**
 * General Configuration
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

$secretKey = '33a6306c-a1e7-2656-4btk-76689d017c36';

$protocol = (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "off") ? 'http:' : 'https:';
$siteUrl  = $protocol . '//' . $_SERVER['HTTP_HOST'] . '/';

return array(
    '*' => [
        'siteUrl'              => $siteUrl,
        'omitScriptNameInUrls' => true,
        'devMode'              => false,
        'enableCsrfProtection' => (!isset($_POST['updatenotifierkey']) || $_POST['updatenotifierkey'] !== $secretKey),
        'environmentVariables' => [
            'baseUrl'  => $siteUrl,
            'siteUrl'  => $siteUrl,
        ],
    ],

    '.dev' => [
        'siteUrl'              => 'http://tips.dev/',
        'devMode'              => true,
        'environmentVariables' => [
            'basePath' => '/Users/billythekid/sites/billys.tips/public/',
        ],
    ],

    '.tips' => [
        'siteUrl'              => 'https://billys.tips/',
        'environmentVariables' => [
            'basePath' => '/home/forge/billys.tips/public/',
        ],
    ],
);
