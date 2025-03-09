# Laravel Backend API

This is the backend API for the web application built with Laravel.

## Directory Structure

- `app/` - Contains the core code of the application
  - `Http/Controllers/` - API controllers
  - `Models/` - Eloquent models
  - `Services/` - Business logic services
  - `Repositories/` - Data access layer
- `config/` - Configuration files
- `database/` - Database migrations and seeders
- `routes/` - API route definitions
- `tests/` - Automated tests

## Requirements

- PHP >= 8.1
- Composer
- MySQL or PostgreSQL
- Node.js & NPM (for asset compilation)

## Setup Instructions

1. Install PHP dependencies:
   ```
   composer install
   ```

2. Copy the environment file:
   ```
   cp .env.example .env
   ```

3. Generate application key:
   ```
   php artisan key:generate
   ```

4. Configure your database in the `.env` file:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. Run migrations:
   ```
   php artisan migrate
   ```

6. (Optional) Seed the database with sample data:
   ```
   php artisan db:seed
   ```

7. Start the development server:
   ```
   php artisan serve
   ```

## API Documentation

### Authentication

The API uses Laravel Sanctum for authentication. To authenticate:

1. Register a user or login to get an API token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer {your_api_token}
   ```

### Available Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `POST /api/auth/logout` - Logout (invalidate token)
- `GET /api/user` - Get authenticated user info

Additional endpoints will be documented as they are developed.

## Development Guidelines

- Follow PSR-12 coding standards
- Write tests for all new features
- Use repository pattern for database operations
- Document all API endpoints

## Testing

Run tests with PHPUnit:
```
php artisan test
```

## Deployment

For production deployment:

1. Set appropriate environment variables in `.env`
2. Optimize the application:
   ```
   php artisan optimize
   ```

3. Run migrations:
   ```
   php artisan migrate --force
   ```

## Troubleshooting

Common issues:

- **Permission errors**: Ensure storage and bootstrap/cache directories are writable
- **Database connection issues**: Verify database credentials in .env
- **API errors**: Check Laravel logs in storage/logs
