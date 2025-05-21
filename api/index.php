<?php

// Initialize SQLite if in Vercel environment
if (getenv('VERCEL') || getenv('VERCEL_REGION')) {
    // Set environment to use our SQLite connection
    putenv('DB_CONNECTION=vercel');
    
    // Include bootstrap file that creates SQLite if needed
    include __DIR__ . '/bootstrap-vercel.php';
}

// Include the Laravel application
require __DIR__ . '/../public/index.php';