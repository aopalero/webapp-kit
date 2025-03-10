import { defineStore } from 'pinia';
import { authService } from '../services/auth';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: authService.getStoredUser(),
        token: authService.getToken(),
        loading: false,
        error: null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user
    },

    actions: {
        setAuthHeader() {
            if (this.token) {
                const authHeader = this.token.startsWith('Bearer ') ? this.token : `Bearer ${this.token}`;
                axios.defaults.headers.common['Authorization'] = authHeader;
                console.log('Setting auth header:', authHeader); // Debug header setting
            } else {
                delete axios.defaults.headers.common['Authorization'];
                console.log('Cleared auth header'); // Debug header clearing
            }
        },

        async login(credentials) {
            this.loading = true;
            this.error = null;
            try {
                const data = await authService.login(credentials);
                this.user = data.user;
                this.token = data.token;
                this.setAuthHeader();
                return true;
            } catch (error) {
                this.error = error.response?.data?.message || 'Login failed';
                return false;
            } finally {
                this.loading = false;
            }
        },

        async register(userData) {
            this.loading = true;
            this.error = null;
            try {
                const data = await authService.register(userData);
                this.user = data.user;
                this.token = data.token;
                this.setAuthHeader();
                return true;
            } catch (error) {
                this.error = error.response?.data?.message || 'Registration failed';
                return false;
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            this.loading = true;
            try {
                // Ensure auth header is set before logout
                if (!this.token) {
                    console.warn('No token found before logout');
                    this.token = localStorage.getItem('token');
                }
                this.setAuthHeader();
                
                await authService.logout();
            } catch (error) {
                console.error('Logout error:', error.response?.data || error);
                // Even if the server request fails, we should still clear local state
            } finally {
                this.user = null;
                this.token = null;
                this.error = null;
                this.loading = false;
                this.setAuthHeader();
            }
        },

        async fetchUser() {
            this.loading = true;
            try {
                const user = await authService.getUser();
                this.user = user;
                return user;
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch user';
                return null;
            } finally {
                this.loading = false;
            }
        },

        initialize() {
            this.setAuthHeader();
        }
    }
}); 