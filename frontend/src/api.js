import axios from "axios";

const api = axios.create({
    baseURL: "https://student-performance-analysis-yzgu.onrender.com"
});

export default api;