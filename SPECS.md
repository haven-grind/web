# Hage WebGL Games Platform (MVP)

## Overview

Hage is a web platform designed to showcase and host WebGL games developed by Hage Studio. This platform allows users to browse, discover, and play games directly in their web browser. This document outlines the Minimum Viable Product (MVP) version of the platform, including technical specifications and implementation details.

## MVP Goals

*   **Showcase Hage Studio:** Provide a simple page displaying information about the studio.
*   **List Games:** Display a list of WebGL games (Unity builds) developed by the studio, including titles and thumbnails.
*   **Play Games:** Allow users to launch and play selected games within the browser using an iframe.
*   **Basic Admin:** Enable administrators to upload new game builds (zip files) along with basic metadata (title, description, thumbnail).
*   **User Authentication:** Implement basic user registration and login functionality.

## Technology Stack (MVP)

*   **Backend:** Laravel 12 (PHP 8.2+)
*   **Frontend:** React (integrated with Laravel Blade using Vite)
*   **JavaScript Runtime & Package Manager:** Bun
*   **Database:** PostgreSQL 17+
*   **Styling:** Tailwind CSS
*   **Web Server:** Nginx
*   **Development Environment:** Docker
*   **Game Storage:** Local Server Storage (or basic AWS S3)

## Key Features (MVP)

### User-Facing
*   Homepage with Studio Info & Game List
*   Game Detail/Launch Page (iframe embed)
*   User Registration Page
*   User Login Page

### Admin-Facing
*   Simple Admin Login
*   Basic Admin Dashboard
*   Game Upload Form (Zip file, Title, Description, Thumbnail)

## Getting Started

### Prerequisites

*   Docker & Docker Compose
*   PHP 8.2+
*   Composer
*   Bun (https://bun.sh/)

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd hage-web
    ```
2.  **Copy Environment File:**
    ```bash
    cp .env.example .env
    ```
    *   Update `.env` with your database credentials (PostgreSQL), app settings, etc. Ensure `DB_CONNECTION=pgsql`.
3.  **Build Docker Containers:**
    ```bash
    # Ensure your Dockerfile installs Bun instead of Node/npm/yarn
    docker-compose build
    ```
4.  **Start Docker Containers:**
    ```bash
    docker-compose up -d
    ```
5.  **Install PHP Dependencies:**
    ```bash
    docker-compose exec app composer install
    ```
6.  **Generate Application Key:**
    ```bash
    docker-compose exec app php artisan key:generate
    ```
7.  **Run Database Migrations:**
    ```bash
    docker-compose exec app php artisan migrate
    ```
    *   Optionally, seed the database: `docker-compose exec app php artisan db:seed`
8.  **Install Frontend Dependencies:**
    ```bash
    # Execute within the container where bun is installed
    docker-compose exec app bun install
    ```
9.  **Build Frontend Assets:**
    ```bash
    # Execute within the container
    docker-compose exec app bun run dev # For development with hot-reloading
    # or
    docker-compose exec app bun run build # For production build
    ```
10. **Access the Application:**
    Open your web browser and navigate to `http://localhost` (or the port specified in your Docker/env configuration).

## Server Configuration (Nginx)

For production deployments, Nginx is recommended as the web server. Below is a basic Nginx configuration for serving the Hage WebGL Games Platform:

### Basic Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourwebglgamesplatform.com;
    root /path/to/hage-web/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # WebGL-specific configurations
    location ~* \.(data|wasm|symbols\.json)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
        add_header Content-Type application/octet-stream;
        add_header Access-Control-Allow-Origin *;
    }

    location ~* \.(js\.gz|data\.gz|wasm\.gz|symbols\.json\.gz)$ {
        gzip off;
        add_header Content-Encoding gzip;
        add_header Content-Type application/octet-stream;
        add_header Access-Control-Allow-Origin *;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

### Special Considerations for Unity WebGL

For Unity WebGL games, add the following to your Nginx configuration:

```nginx
# Additional MIME types for Unity WebGL
types {
    application/wasm wasm;
    application/octet-stream data unityweb;
    application/javascript jsgz;
    application/octet-stream datagz;
    application/octet-stream memgz;
    application/octet-stream unity3dgz;
    application/octet-stream wasmgz;
}

# Compression settings for WebGL content
gzip on;
gzip_comp_level 9;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript application/wasm;
```

### HTTPS Configuration (Recommended)

For production, HTTPS is strongly recommended, especially for WebGL content:

```nginx
server {
    listen 443 ssl http2;
    server_name yourwebglgamesplatform.com;
    
    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;
    
    # Strong SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Rest of configuration as above...
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourwebglgamesplatform.com;
    return 301 https://$host$request_uri;
}
```

## Development Workflow (MVP)

*   **Branching:** Use `develop` as the main integration branch. Create feature branches off `develop` (e.g., `feature/game-upload`).
*   **Commits:** Write clear, concise commit messages. Conventional Commits format is encouraged but not mandatory for MVP.
*   **Pull Requests:** Submit PRs to merge feature branches into `develop`. Basic code review is encouraged.
*   **Linting:** Run linters (PHP_CodeSniffer, ESLint) where practical. Configure ESLint for Bun environment if necessary.

## Coding Standards (MVP)

*   **PHP:** Aim for PSR-12 standards.
*   **JavaScript/React:** Follow general React best practices (functional components, hooks). Use Bun APIs where appropriate if replacing Node built-ins.
*   **Naming:**
    *   Classes: `PascalCase`
    *   Methods/Variables: `camelCase`
    *   DB Tables/Columns: `snake_case`
    *   URLs: `kebab-case`
*   **Comments:** Focus on *why* code exists, not *what* it does. Minimal comments for MVP.

## Future Enhancements (Post-MVP)

*   User Profiles & Advanced Progress Saving
*   Game Categories, Tags, and Search/Filtering
*   Comments & Ratings System
*   CDN Integration for Assets
*   Advanced Analytics
*   Enhanced Admin Dashboard
*   Social Features