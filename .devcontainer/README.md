# Development Container for HAGE Web Application

This folder contains configuration files for setting up a development environment using VS Code's Remote - Containers extension.

## What's Included

- **PHP 8.2** with extensions required for Laravel 12
- **PostgreSQL 17** for database
- **Bun** for JavaScript runtime and package management (no npm)
- **Composer** for PHP dependency management
- VS Code extensions optimized for Laravel and frontend development

## Getting Started

1. Install [Docker](https://www.docker.com/products/docker-desktop) and [VS Code](https://code.visualstudio.com/)
2. Install the [Remote Development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) in VS Code
3. Open this project in VS Code
4. When prompted, click "Reopen in Container" or use the command palette (F1) and select "Remote-Containers: Reopen in Container"
5. VS Code will build the container and set up the development environment

## Custom Configuration

The environment uses these configuration files:

- `devcontainer.json`: Main configuration for the development container
- `docker-compose.yml`: Defines services (app, PostgreSQL)
- `Dockerfile`: Custom PHP image with extensions for Laravel
- `php.ini`: Custom PHP configuration

## Database Connection

The PostgreSQL database is pre-configured with:

- Host: `postgres`
- Port: `5432`
- Database: `hage` (configurable via environment)
- Username: `postgres` (configurable via environment)
- Password: `postgres` (configurable via environment)

These settings are automatically applied to the container environment, but you must update your `.env` file to match:

```
DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=hage
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

## Common Database Errors

### SQLite "no such table" Error

If you see an error like:
```
SQLSTATE[HY000]: General error: 1 no such table: games (Connection: sqlite, SQL: select * from "games" limit 5)
```

This means your `.env` file is still using SQLite instead of PostgreSQL. To fix:

1. Update the DB_CONNECTION and related settings in your `.env` file as shown above
2. Run `php artisan config:clear` to clear the configuration cache
3. Run `php artisan migrate:fresh` to recreate the tables in PostgreSQL

## Running the Application

Once the container is built and running:

```bash
# Start Laravel's development server
php artisan serve --host=0.0.0.0

# Run migrations
php artisan migrate

# Run frontend development server
bun run dev

# Install dependencies
bun install

# Build for production
bun run build
```

## Troubleshooting

If you encounter issues:

- Rebuild the container: Command Palette → "Remote-Containers: Rebuild Container"
- Check Docker logs: `docker logs <container_name>`
- Verify PostgreSQL connection: `php artisan tinker` then `DB::connection()->getPdo()`
- If database tables are missing: `php artisan migrate:fresh` 