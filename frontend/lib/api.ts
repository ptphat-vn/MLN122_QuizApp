import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

type RetriableConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    // Unwrap backend's { success, message, data } envelope
    if (
      response.data &&
      typeof response.data === 'object' &&
      'success' in response.data &&
      'data' in response.data
    ) {
      response.data = response.data.data;
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post<{
          success: boolean;
          data: { accessToken: string };
        }>(`${BASE_URL}/auth/refresh`, {}, { withCredentials: true });

        const newToken = refreshResponse.data.data.accessToken;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('accessToken', newToken);
          document.cookie = `accessToken=${newToken}; path=/; max-age=3600`;
        }

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('accessToken');
          window.location.href = '/dang-nhap';
        }
      }
    }

    return Promise.reject(error);
  },
);

export { api };
