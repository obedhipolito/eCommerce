<?php

$config = parse_ini_file(__DIR__ . '/../.env');

define('DB_HOST', $config['DB_HOST']);
define('DB_PORT', $config['DB_PORT']);
define('DB_NAME', $config['DB_NAME']);
define('DB_USER', $config['DB_USER']);
define('DB_PASS', $config['DB_PASS']);

define('LOG_FILE', __DIR__ . '/setup_log.txt');