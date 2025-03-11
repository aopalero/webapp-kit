import { defineStore } from 'pinia';
import { authService } from '@/services/auth';
import { toast } from '@/lib/toast';

export const useAuthStore = defineStore('auth', {
    state: () => {
        const user = authService.getStoredUser();
        const token = authService.getToken();
        if (token) {
            authService.setAuthHeader(token);
        }
        return {
            user,
            token,
            loading: false,
            error: null
        };
    },

    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
        isLoading: (state) => state.loading
    },

    actions: {
        async login(credentials) {
            this.loading = true;
            this.error = null;
            try {
                const response = await authService.login(credentials);
                if (response.token) {
                    this.user = response.user;
                    this.token = response.token;
                    toast.success('Welcome back! Successfully logged in.');
                    return true;
                } else {
                    throw new Error('Invalid response from server');
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || 'Login failed';
                this.error = errorMessage;
                toast.error(errorMessage);
                return false;
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            try {
                await authService.logout();
                this.user = null;
                this.token = null;
                toast.success('You have been successfully logged out.');
                return true;
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message || 'Logout failed';
                toast.error(errorMessage);
                return false;
            }
        },

        requireAuth() {
            if (!this.isAuthenticated) {
                toast.error('Please log in to access this page');
                return false;
            }
            return true;
        },

        async fetchUser() {
            this.loading = true;
            try {
                const user = await authService.getUser();
                this.user = user;
                return user;
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch user';
                toast.error(this.error);
                return null;
            } finally {
                this.loading = false;
            }
        }
    }
}); 