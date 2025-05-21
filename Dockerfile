FROM node:20-alpine AS frontend-builder

# Install Bun
RUN apk add --no-cache curl unzip
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV PATH="${PATH}:/root/.bun/bin"

WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy frontend source code
COPY resources/ resources/
COPY vite.config.ts tsconfig.json ./
COPY public/ public/

# Build frontend assets
RUN bun run build

# PHP Dependencies and Laravel App
FROM php:8.2-fpm AS backend-builder

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    libonig-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy composer files and install PHP dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader

# Copy Laravel application files
COPY . .

# Copy built frontend assets from the frontend builder
COPY --from=frontend-builder /app/public/build /app/public/build

# Generate optimized autoloader and complete installation
RUN composer dump-autoload --optimize

# Final production image
FROM php:8.2-fpm

# Add Nginx and Supervisor
RUN apt-get update && apt-get install -y \
    nginx \
    supervisor \
    libpng-dev \
    libonig-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd

# Copy configuration files
COPY docker/nginx/default.conf /etc/nginx/sites-available/default
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/php/php.ini /usr/local/etc/php/conf.d/custom.ini

# Copy application from backend builder
COPY --from=backend-builder /app /var/www/html

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Configure PHP-FPM
RUN sed -i 's/;clear_env = no/clear_env = no/g' /usr/local/etc/php-fpm.d/www.conf

# Expose port 80
EXPOSE 80

# Set working directory
WORKDIR /var/www/html

# Start Supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"] 