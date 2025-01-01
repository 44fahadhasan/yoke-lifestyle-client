import axios from "axios";

const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // required for sending signed cookies
});

const useAxiosPublic = () => axiosPublic;

export default useAxiosPublic;
