import axiosInstance from './axiosInstance';

export const fetchGlobalMetadata = (query: string) =>
	axiosInstance.get(`/api/global?${query}`).then(({ data }) => data);
