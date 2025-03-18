import { getFromSecureStore } from "@/utils/secureStoreUtils";
import axios from "react-native-axios";

const baseURL = "http://192.168.29.33:5000";

// console.log(baseURL);

const createAxiosInstance = async () => {
  console.log("coeo")
  const axiosInstance = axios.create({
    baseURL,
  });

  console.log("here and there")
  axiosInstance.interceptors.request.use(
    async function (config){
      console.log("hello in apiclient")
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
