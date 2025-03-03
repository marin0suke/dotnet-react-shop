import axios from "axios";


//create axios instance with default baseURL
const api = axios.create({
    baseURL: "http://localhost:5000/api"
});

export default api;

// this axios instance can be used throughout proj to make requests without repeating the base URL.

