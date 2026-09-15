import axios from 'axios';
import router from '../router';
import { useAuthStore } from '../stores/authStore';

const baseURL = import.meta.env.VITE_API_URL || 'https://dmhab-chatbot-web.onrender.com';

const axiosInstance = axios.create({
  baseURL,
  // Add other default configs here if needed
});

// Variables to handle concurrent requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// 1. Intercept all outgoing requests to attach the current access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Intercept incoming responses to handle 401/403
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 or 403 and it's not a retry request
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // 6. Handle concurrent requests: queue them until token is refreshed
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 3. Pause the failed request and automatically make a POST request to refresh
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${baseURL}/api/auth/refresh`, { refreshToken });
        
        // 4. If refresh is successful, save the new access token
        const newAccessToken = response.data.token || response.data.accessToken; 
        
        localStorage.setItem('token', newAccessToken);
        const authStore = useAuthStore();
        if (authStore) {
            authStore.token = newAccessToken;
        }

        // Update the authorization header of the original failed request
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        
        // Process the queued requests with the new token
        processQueue(null, newAccessToken);

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (err) {
        // 5. If refresh fails, clear auth data and redirect to login
        processQueue(err, null);
        
        const authStore = useAuthStore();
        if (authStore) {
            authStore.logout(); 
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        }

        router.push('/login');
        
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
