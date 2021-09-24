import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 100000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export default instance
