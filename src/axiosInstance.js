import axios from 'axios';

const token = localStorage.getItem('token')

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3002/api', 
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": 'application/json', 
  },
});

export default axiosInstance