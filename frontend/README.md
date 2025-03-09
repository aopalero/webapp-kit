# Vue.js SPA Frontend

This is the frontend Single Page Application (SPA) built with Vue.js for the web application.

## Directory Structure

- `src/` - Source code
  - `assets/` - Static assets (images, fonts, etc.)
  - `components/` - Reusable Vue components
  - `views/` - Page components
  - `router/` - Vue Router configuration
  - `store/` - Vuex store (state management)
  - `services/` - API services and utilities
  - `composables/` - Reusable Vue composition functions
- `public/` - Static files served as-is
- `dist/` - Production build output

## Requirements

- Node.js >= 16.x
- NPM >= 8.x

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file for environment variables:
   ```
   cp .env.example .env
   ```

3. Configure the API URL in the `.env` file:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Build for production:
   ```
   npm run build
   ```

## Features

- Vue 3 with Composition API
- Vue Router for navigation
- Pinia or Vuex for state management
- Axios for API requests
- Responsive design
- Form validation
- Authentication flow

## Development Guidelines

### Component Structure

- Use Single File Components (SFC)
- Follow the Vue Style Guide
- Use composition API for complex components
- Keep components small and focused

### State Management

- Use Pinia/Vuex for global state
- Use component state for local concerns
- Organize store by feature modules

### API Integration

- Use dedicated service modules for API calls
- Handle loading states and errors consistently
- Use interceptors for common request/response handling

## Testing

Run unit tests:
```
npm run test:unit
```

Run end-to-end tests:
```
npm run test:e2e
```

## Building and Deployment

1. Build the application:
   ```
   npm run build
   ```

2. The built files will be in the `dist/` directory, which can be deployed to any static file server

3. For production, consider:
   - Setting up proper cache headers
   - Enabling gzip/brotli compression
   - Using a CDN for static assets

## Troubleshooting

Common issues:

- **API connection issues**: Verify the API URL in the `.env` file
- **Build errors**: Check for dependency conflicts or version issues
- **Runtime errors**: Check the browser console for detailed error messages
