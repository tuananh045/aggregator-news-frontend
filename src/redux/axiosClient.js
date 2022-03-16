import axios from 'axios'
const axiosClient = axios.create({
    headers: {
        'content-type': 'application/json'
    },
})

axiosClient.interceptors.request.use(async (config) => {
    const token = sessionStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

axiosClient.interceptors.response.use(response => {
    if(response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    if(error) {
        console.log(error);
    }
    console.log(error);
    // throw err;
})

export default axiosClient;