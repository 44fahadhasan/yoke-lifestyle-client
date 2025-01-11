import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // required for sending signed cookies
});

const useAxiosSecure = () => {
  const { logout } = useAuth();

  // axios request interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      // modify config before request is sent
      return config;
    },

    (error) => {
      // handle request errors
      return Promise.reject(error);
    }
  );

  // axios response interceptor
  axiosSecure.interceptors.response.use(
    (response) => {
      // handle successful responses
      return response;
    },

    async (error) => {
      const originalRequest = error.config;
      // access token is expired then run the code block
      if (error.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;

        try {
          // refresh the access token
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/users/refresh`,
            {},
            { withCredentials: true }
          );

          // retry the original request with refreshed token
          return axiosSecure(originalRequest);
        } catch (refreshError) {
          //
          if (
            error.response?.status === 401 ||
            error.response?.status === 403
          ) {
            logout();
          }

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
