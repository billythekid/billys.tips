<?php

/**
 * Database Configuration
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(

    '*' => [
        'server'      => '212.71.255.242',
        'tablePrefix' => 'craft',
    ],

    'ngrok.io' => [
        'database' => 'tips',
        'user'     => 'root',
        'password' => '',
    ],
    
    '.dev' => [
        'database' => 'tips',
        'user'     => 'root',
        'password' => '',
    ],
    
    '.tips' => [
        'database' => 'billys.tips',
        'user'     => 'billys.tips',
        'password' => 'YAizdt7trijn',
    ],
);
