 // src/api.ts
    import axios from 'axios';

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://randomuser.me/api/?results=10'; 

    const api = axios.create({
      baseURL: baseURL,
      timeout: 10000, 
    });

    export default api;