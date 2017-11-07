<?php

/**
 * General Configuration
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

require_once(CRAFT_PLUGINS_PATH . '/updatenotifier/UpdateNotifierHelper.php');
use Craft\UpdateNotifierHelper;

$isUpdateNotifierRequest = UpdateNotifierHelper::isApiRequest();

return array(
    '*' => [
        'omitScriptNameInUrls' => true,
        'devMode' => false,
        'enableCsrfProtection' => !$isUpdateNotifierRequest,
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
