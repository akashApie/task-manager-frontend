import { getFromSecureStore } from "@/utils/secureStoreUtils";
import axios from "react-native-axios";

const baseURL = "https://task-manager-backend-1-kflq.onrender.com";
// const baseURL = "http://192.168.29.33:5000";

// console.log(baseURL);


const createAxiosInstance = async () => {
  const axiosInstance = axios.create({
    baseURL,
  });

  axiosInstance.interceptors.request.use(
    async function (config){
      const token = await getFromSecureStore("authToken");
      console.log("token", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  return axiosInstance;
};

export default createAxiosInstance;
