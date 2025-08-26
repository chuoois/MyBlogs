import axios from 'axios';

const api = axios.create({
    baseURL: 'https://myblogs-qmny.onrender.com/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const authService = {
    login: async (data) => {
        const response = await api.post('/login', data);
        return response;
    }
};

export default authService;