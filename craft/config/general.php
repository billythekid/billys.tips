<?php

/**
 * General Configuration
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

$secretKey = '33a6306c-a1e7-2656-4daa-76689d017c36';

return array(
    '*' => [
        'omitScriptNameInUrls' => true,
        'devMode' => false,
        'enableCsrfProtection' => (!isset($_POST['updatenotifierkey']) || $_POST['updatenotifierkey'] !== '33a6306c-a1e7-2656-4daa-76689d017c36'),
    ],

    '.dev' => [
        'siteUrl' => 'http://tips.dev/',
        'devMode' => true,
        'environmentVariables' => [
            'basePath' => '/Users/billythekid/sites/billys.tips/public/',
            'baseUrl' => 'http://tips.dev/',
            'siteUrl' => 'http://tips.dev/',
        ],
    ],

    '.tips' => [
        'siteUrl' => 'https://billys.tips/',
        'environmentVariables' => [
            'basePath' => '/home/forge/billys.tips/public/',
            'baseUrl' => 'https://billys.tips/',
            'siteUrl' => 'https://billys.tips/',

        ],
    ],
);
