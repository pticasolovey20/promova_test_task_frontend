import axios from 'axios';

const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL;

const axiosInstance = axios.create({
	baseURL: STRAPI_BASE_URL,
});

export default axiosInstance;
