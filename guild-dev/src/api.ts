 // src/api.ts
    import axios from 'axios';

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com'; // Замени на свой базовый URL

    const api = axios.create({
      baseURL: baseURL,
      timeout: 10000, // Необязательно: установи таймаут запроса
    });

    export default api;