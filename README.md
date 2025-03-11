# WebApp-Kit: Modern Full-Stack Web Application

This project is a modern full-stack web application built with Laravel backend API and Vue.js Single Page Application (SPA) frontend. It follows a decoupled architecture pattern for maximum flexibility and scalability.

## Technology Stack

### Backend (Laravel)
- PHP 8.2+
- Laravel 12
- MySQL Database
- Laravel Sanctum for Authentication
- RESTful API Architecture
- Composer for Package Management

### Frontend (Vue.js)
- Vue.js 3
- Vite as Build Tool
- Tailwind CSS for Styling
- Pinia for State Management
- Vue Router for Routing
- Axios for HTTP Requests
- Shadcn Components
- Inter Font Family
- NPM for Package Management

## Project Structure

```
webapp-kit/
├── backend/          # Laravel API backend
├── frontend/         # Vue.js SPA frontend
├── MYRULES.mdc      # Project-specific guidelines
└── README.md        # Project documentation
```

## Requirements

### Backend Requirements
- PHP >= 8.2
- Composer
- MySQL
- Node.js & NPM (for asset compilation)

### Frontend Requirements
- Node.js >= 16.x
- NPM >= 8.x

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
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

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Run database migrations:
   ```bash
   php artisan migrate
   ```

7. Start the development server:
   ```bash
   php artisan serve
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install JavaScript dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## Development Guidelines

### Coding Standards
- Backend: Follow PSR-12 coding standards (enforced by Laravel Pint)
- Frontend: Follow Vue.js Style Guide and ESLint configuration
- CSS: Use Tailwind CSS utility classes and follow the project's custom theme
- Typography: Use Inter font family for consistent typography

### Development Workflow
1. Create feature branches from `main`
2. Follow conventional commits for commit messages
3. Submit pull requests for code review
4. Ensure all tests pass before merging

### API Development
- RESTful API endpoints in the backend
- Use Laravel resources for API responses
- Implement proper error handling and validation
- Document all API endpoints

### Frontend Development
- Component-based architecture using Vue.js
- State management with Pinia
- Route management with Vue Router
- Use Shadcn components for consistent UI
- Implement responsive design using Tailwind CSS

## Production Deployment

### Backend Deployment
1. Set production environment variables
2. Run composer install --optimize-autoloader --no-dev
3. Cache configuration and routes
4. Set up proper web server configuration (Nginx/Apache)

### Frontend Deployment
1. Set production environment variables
2. Run npm run build
3. Deploy the generated dist directory
4. Configure web server for SPA routing

## Maintenance

- Regular updates of dependencies
- Security patches
- Database backups
- Performance monitoring
- Error logging and monitoring

## Support

For detailed explanation on how things work, check out:
- [Laravel Documentation](https://laravel.com/docs)
- [Vue.js Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is proprietary and confidential. 