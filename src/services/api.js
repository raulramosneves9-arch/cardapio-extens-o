import axios from 'axios';

const api = axios.create({
    baseURL: '/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    response => response,
    error => {
        // Centraliza tratamento de erro
        const message = error.response?.data?.message || error.message || 'Erro desconhecido';
        return Promise.reject(new Error(message));
    }
);

export async function fetchSuggestions() {
    try {
        const response = await api.get('/suggestions.json');
        if (!Array.isArray(response.data)) {
            throw new Error('Resposta inválida da API de sugestões');
        }
        return response.data;
    } catch (err) {
        throw err;
    }
}

export default api;
