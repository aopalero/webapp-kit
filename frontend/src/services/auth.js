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
    setAuthHeader(token) {
        if (token) {
            const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
            axios.defaults.headers.common['Authorization'] = authHeader;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    },

    async login(credentials) {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        if (response.data.token) {
            const token = response.data.token.replace('Bearer ', '');
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.setAuthHeader(token);
        }
        return response.data;
    },

    async logout() {
        try {
            const response = await axios.post(`${API_URL}/auth/logout`);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.setAuthHeader(null);
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.setAuthHeader(null);
            }
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