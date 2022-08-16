import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://laqil.com/public/api',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
