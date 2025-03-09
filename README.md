# Laravel Backend + Vue SPA Frontend

This project is a web application with a Laravel backend API and a Vue.js Single Page Application (SPA) frontend.

## Project Structure

- `backend/` - Laravel API backend
- `frontend/` - Vue.js SPA frontend

## Requirements

### Backend (Laravel)
- PHP >= 8.1
- Composer
- MySQL or PostgreSQL
- Node.js & NPM (for asset compilation)

### Frontend (Vue.js)
- Node.js >= 16.x
- NPM >= 8.x

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install PHP dependencies:
   ```
   composer install
   ```

3. Copy the environment file:
   ```
   cp .env.example .env
   ```

4. Generate application key:
   ```
   php artisan key:generate
   ```

5. Configure your database in the `.env` file

6. Run migrations:
   ```
   php artisan migrate
   ```

7. Start the development server:
   ```
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install JavaScript dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Documentation

API documentation can be found in the backend README.

## Development

For detailed explanation on how the project works, check the respective README files in the backend and frontend directories.

## Production Deployment

See the deployment instructions in each project's README for environment-specific deployment procedures. 