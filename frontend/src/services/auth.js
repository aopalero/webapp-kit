import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Add axios request interceptor
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Ensure token is in the correct format
            config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
            console.log('Request headers:', config.headers); // Debug headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    async login(credentials) {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        if (response.data.token) {
            // Ensure token is stored without 'Bearer ' prefix
            const token = response.data.token.replace('Bearer ', '');
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log('Token stored:', token); // Debug token storage
        }
        return response.data;
    },

    async register(userData) {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        if (response.data.token) {
            // Ensure token is stored without 'Bearer ' prefix
            const token = response.data.token.replace('Bearer ', '');
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log('Token stored:', token); // Debug token storage
        }
        return response.data;
    },

    async logout() {
        try {
            console.log('Token before logout:', localStorage.getItem('token')); // Debug token before logout
            const response = await axios.post(`${API_URL}/auth/logout`);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return response.data;
        } catch (error) {
            console.error('Logout error:', error.response?.data || error); // Better error logging
            throw error;
        }
    },

    async getUser() {
        const response = await axios.get(`${API_URL}/auth/user`);
        return response.data;
    },

    getStoredUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    getToken() {
        return localStorage.getItem('token');
    },

    isAuthenticated() {
        return !!this.getToken();
    }
}; 