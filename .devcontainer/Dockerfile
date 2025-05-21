FROM php:8.2-fpm

# Install essential packages
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

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash \
    && ln -s $HOME/.bun/bin/bun /usr/local/bin/bun

# Add Bun to PATH
ENV PATH="${PATH}:/root/.bun/bin"

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set up working directory
WORKDIR /workspace

# Install Laravel CLI tools
RUN composer global require laravel/installer

# Add Composer's global bin directory to PATH
ENV PATH="${PATH}:/root/.composer/vendor/bin"

# Configure PHP
COPY php.ini /usr/local/etc/php/conf.d/custom.ini 