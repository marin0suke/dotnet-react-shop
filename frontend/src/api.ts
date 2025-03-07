import axios from "axios";


//create axios instance with default baseURL
const api = axios.create({
    baseURL: "http://localhost:5000/api" 
});

api.interceptors.request.use(config => { // attach token to the Authorization header for every request.
    const token = localStorage.getItem("token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // every protected endpoint gets the token automatically.
});

export default api;

// this axios instance can be used throughout proj to make requests without repeating the base URL.

//although launch settings json has both https and http, this one needed to be set to the first one in the list, https. for CORS to work. 
