import axios from "axios";
import { getToken } from "@/src/shared/utils";

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASEURL}/`,
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  async (config) => {
    const token = getToken();
    config.headers = {
      ...config.params,
      ...config.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      document.location.href = "/auth/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
