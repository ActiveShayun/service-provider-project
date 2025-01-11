import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Auth-provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const axiosInstant = axios.create({
    baseURL: 'https://server-site-service.vercel.app',
    withCredentials: true,
})
const AxiosSecure = () => {
   // const { handleLogOut } = useContext(AuthContext); // Context for logout handling
    //const navigate = useNavigate(); // React Router for navigation

    useEffect(() => {
        //Request Interceptor: Attach token to request headers
        const requestInterceptor = axiosInstant.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                // Handle request error
                return Promise.reject(error);
            }
        );

        // Response Interceptor: Handle errors like 401 and 403
        const responseInterceptor = axiosInstant.interceptors.response.use(
            (response) => response,
            (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                  //  console.warn(`Authentication error (${status}): Logging out...`);
                    handleLogOut()
                        .then(() => navigate('/login'))
                        .catch((err) => console.error('Logout error:', err));
                }
                return Promise.reject(error); // Propagate the error
            }
        );

        // Cleanup interceptors when the component unmounts
        return () => {
            axiosInstant.interceptors.request.eject(requestInterceptor);
            axiosInstant.interceptors.response.eject(responseInterceptor);
        };
    }, [ ]); // Dependency array to ensure effect runs when these values change

    return axiosInstant; // Return the configured axios instance

};

export default AxiosSecure;