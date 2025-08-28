import axios from 'axios';

const api = axios.create({
    baseURL: 'https://myblogs-qmny.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor để tự động thêm token vào headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const adminService = {
    // === ABOUT ME ===
    aboutme: {
        getAll: async () => {
            const response = await api.get('/aboutme');
            return response.data;
        },
        create: async (data) => {
            const response = await api.post('/aboutme', data);
            return response.data;
        },
        update: async (id, data) => {
            const response = await api.put(`/aboutme/${id}`, data);
            return response.data;
        },
        delete: async (id) => {
            const response = await api.delete(`/aboutme/${id}`);
            return response.data;
        },
    },

    // === PROJECTS ===
    projects: {
        getAll: async () => {
            const response = await api.get('/projects');
            return response.data;
        },
        create: async (data) => {
            const response = await api.post('/projects', data);
            return response.data;
        },
        update: async (id, data) => {
            const response = await api.put(`/projects/${id}`, data);
            return response.data;
        },
        delete: async (id) => {
            const response = await api.delete(`/projects/${id}`);
            return response.data;
        },
    },

    // === BLOGS ===
    blogs: {
        getAll: async () => {
            const response = await api.get('/blogs');
            return response.data;
        },
        create: async (data) => {
            const response = await api.post('/blogs', data);
            return response.data;
        },
        update: async (id, data) => {
            const response = await api.put(`/blogs/${id}`, data);
            return response.data;
        },
        delete: async (id) => {
            const response = await api.delete(`/blogs/${id}`);
            return response.data;
        },
    },
};

export default adminService;