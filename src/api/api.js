import axios from "axios";
import AuthStore from "../store/AuthStore.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API_URL
});

api.interceptors.request.use(config => {
    if (AuthStore.token.value !== undefined) {
        config.headers.Authorization = "Bearer " + AuthStore.token.value;
    }

    return config;
});

export default api;