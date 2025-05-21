<?php

// Basic health check that doesn't require database access
header('Content-Type: application/json');
echo json_encode([
    'status' => 'ok',
    'timestamp' => time(),
    'environment' => getenv('APP_ENV'),
    'php_version' => phpversion(),
    'extensions' => get_loaded_extensions(),
]); 