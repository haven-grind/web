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

## Production Deployment to Render

This project includes Docker configuration for production deployment on Render, using a Supabase PostgreSQL database.

### Prerequisites

- A Render account
- Supabase PostgreSQL database (already configured)

### Deployment Steps

1. Fork or push this repository to your Git provider (GitHub, GitLab, etc.)
2. In Render, create a new "Blueprint" and connect to your repository
3. Render will automatically detect the `render.yaml` configuration file
4. Confirm the resources to be created (web service and disk)
5. Set your database password in the environment variables through the Render dashboard
6. Deploy the application

### Manual Deployment

If you prefer to set up the services manually:

1. Create a web service with the following settings:
   - Environment: Docker
   - Dockerfile Path: `./Dockerfile`
   - Branch: main (or your preferred branch)
   - Environment Variables: Configure the Supabase database connection variables
2. Create a disk and mount it to `/var/www/html/storage/app`
3. Deploy the application

### Local Testing of Production Image

To test the production setup locally:

```bash
# Set your database password
export DB_PASSWORD=your_password_here

# Build and run the production setup
docker-compose -f docker-compose.prod.yml up -d --build

# Access the application at http://localhost:8080
```

### Environment Variables

The following environment variables are required:

- `APP_KEY`: Your Laravel application key
- `APP_URL`: The URL of your application
- `DB_CONNECTION`: Set to `pgsql`
- `DB_HOST`: Database hostname (`aws-0-us-east-2.pooler.supabase.com`)
- `DB_PORT`: Database port (`5432`)
- `DB_DATABASE`: Database name (`postgres`)
- `DB_USERNAME`: Database username (`postgres.mjlzhgujctdbxgmxcszy`)
- `DB_PASSWORD`: Your Supabase database password
- `DB_URL`: Full database connection URL (optional) 