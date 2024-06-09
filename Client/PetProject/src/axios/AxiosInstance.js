import axios from 'axios'
import { storage } from '../mmkv';
import { useContext } from 'react';
import { AuthContext } from '../context';

const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
})

export function setClientToken(newToken) {
    storage.set('user.token', newToken)
    // Add a request interceptor
    AxiosInstance.interceptors.request.use(async function (config) {
        const token = await storage.getString('user.token')
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
}
export function setResponseAxios(setAuth) {
    AxiosInstance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        console.log("response.status", response.data)
        if (response.data.statusCode == 403) {
            console.log('setAuth')
            setAuth({
                username: '',
                userid: '',
                token: '',
                isAuthorization: false
            })
        }
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        console.log('Error code', error)
        return Promise.reject(error);
    });
}

export default AxiosInstance