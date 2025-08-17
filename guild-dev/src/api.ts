 // src/api.ts
    import axios from 'axios';

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/users'; 

    const api = axios.create({
      baseURL: baseURL,
      timeout: 10000, 
    });

    export default api;