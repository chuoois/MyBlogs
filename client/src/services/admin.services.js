import axios from 'axios';

const api = axios.create({
    baseURL: 'https://myblogs-qmny.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const adminService = {
    // Lấy toàn bộ dữ liệu
    getAll: async () => {
        const response = await api.get('/aboutme');
        return response.data;
    },

    // Tạo mới
    create: async (data) => {
        const response = await api.post('/aboutme', data);
        return response.data;
    },

    // Cập nhật theo id
    update: async (id, data) => {
        const response = await api.put(`/aboutme/${id}`, data);
        return response.data;
    },

    // Xóa theo id
    delete: async (id) => {
        const response = await api.delete(`/aboutme/${id}`);
        return response.data;
    },
};

export default adminService;
