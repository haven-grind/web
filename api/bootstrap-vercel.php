<?php

// Create SQLite database if it doesn't exist
$dbPath = '/tmp/database.sqlite';

if (!file_exists($dbPath)) {
    // Create empty database file
    touch($dbPath);
    
    // Set appropriate permissions
    chmod($dbPath, 0777);
    
    // Create schema table (minimal requirements for Laravel)
    try {
        $pdo = new PDO('sqlite:' . $dbPath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Create migrations table
        $pdo->exec('CREATE TABLE IF NOT EXISTS migrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            migration VARCHAR(255) NOT NULL,
            batch INTEGER NOT NULL
        )');
        
        // Create games table matching migration schema
        $pdo->exec('CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            game_path VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )');
        
        // Create users table matching migration schema
        $pdo->exec('CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            email_verified_at TIMESTAMP NULL,
            password VARCHAR(255) NOT NULL,
            remember_token VARCHAR(100) NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )');
        
        // Create notes table matching migration schema
        $pdo->exec('CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )');
        
        // Create password_reset_tokens table
        $pdo->exec('CREATE TABLE IF NOT EXISTS password_reset_tokens (
            email VARCHAR(255) PRIMARY KEY,
            token VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NULL
        )');
        
        // Create sessions table
        $pdo->exec('CREATE TABLE IF NOT EXISTS sessions (
            id VARCHAR(255) PRIMARY KEY,
            user_id INTEGER NULL,
            ip_address VARCHAR(45) NULL,
            user_agent TEXT NULL,
            payload TEXT NOT NULL,
            last_activity INTEGER NOT NULL
        )');
        
        // Create cache table
        $pdo->exec('CREATE TABLE IF NOT EXISTS cache (
            key VARCHAR(255) NOT NULL PRIMARY KEY,
            value TEXT NOT NULL,
            expiration INTEGER NOT NULL
        )');
        
        // Create cache locks table
        $pdo->exec('CREATE TABLE IF NOT EXISTS cache_locks (
            key VARCHAR(255) NOT NULL PRIMARY KEY,
            owner VARCHAR(255) NOT NULL,
            expiration INTEGER NOT NULL
        )');
        
        // Create jobs table
        $pdo->exec('CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            queue VARCHAR(255) NOT NULL,
            payload TEXT NOT NULL,
            attempts INTEGER NOT NULL,
            reserved_at INTEGER NULL,
            available_at INTEGER NOT NULL,
            created_at INTEGER NOT NULL
        )');
        
        $pdo->exec('CREATE INDEX IF NOT EXISTS jobs_queue_index ON jobs(queue)');
        
    } catch (Exception $e) {
        // Log any error but don't fail the request
        error_log('SQLite initialization error: ' . $e->getMessage());
    }
} 