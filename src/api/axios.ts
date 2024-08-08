// src/api/axios.ts
import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com', // 기본 URL
  timeout: 1000, // 1000ms = 1초
  headers: { 'X-Custom-Header': 'foobar' },
});

export default axiosInstance;
