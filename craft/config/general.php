<?php

/**
 * General Configuration
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
    '*' => [
        'omitScriptNameInUrls' => true,
    ],

    '.dev' => [
        'siteUrl'              => 'http://tips.dev/',
        'devMode'              => true,
        'environmentVariables' => [
            'basePath' => '/Users/billythekid/sites/billys.tips/public/',
            'baseUrl'  => 'http://tips.dev/',
        ],
    ],

    '.tips' => [
        'siteUrl'              => 'https://billys.tips/',
        'devMode'              => false,
        'environmentVariables' => [
            'basePath' => '/home/forge/billys.tips/public/',
            'baseUrl'  => 'https://billys.tips/',
        ],
    ],
);
