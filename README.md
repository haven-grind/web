# HAGE Game Portal

A web application for hosting and playing WebGL games using Laravel 12 and React.

## About

HAGE Game Portal is a platform for showcasing and playing WebGL games. The application features user authentication, game management, and an embedded game player.

## Tech Stack

- **Backend**: Laravel 12, PHP 8.2+
- **Database**: PostgreSQL 17
- **Frontend**: React with Tailwind CSS
- **Build Tools**: Vite, Bun

## Development Setup

### Prerequisites

- Docker Desktop
- VS Code with Remote - Containers extension

### Setup Instructions

1. Clone the repository
2. Open the project in VS Code
3. When prompted, click "Reopen in Container" or use the command palette (F1) and select "Remote-Containers: Reopen in Container"
4. VS Code will build the container and set up the development environment

### Database Configuration

The application uses PostgreSQL with the following configuration:

```
DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=hage
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

These settings are automatically configured in the development container.

### Running the Application

Once the container is built and running:

```bash
# Start Laravel's development server
php artisan serve --host=0.0.0.0

# Run migrations
php artisan migrate

# Run frontend development server
bun run dev
```

## Features

- User authentication
- Game browsing and filtering
- WebGL game embedding
- Game management (admin)

## Troubleshooting

If you encounter database connection issues:

1. Verify your `.env` file has the correct PostgreSQL configuration
2. Run `php artisan config:clear` to clear the configuration cache
3. Verify PostgreSQL connection with: `php artisan tinker` then `DB::connection()->getPdo()` 