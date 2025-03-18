import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import axios from "react-native-axios";

const baseURL= 'http://192.168.29.33:5000';

const createAxiosInstanceAuth = async () => {
  const axiosInstance = axios.create({
  baseURL,
});

return axiosInstance;
};

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const axiosInstance = await createAxiosInstanceAuth();
      const response = await axiosInstance.post("/auth/signUp", { name, email, password });

      if (response.data && response.data.user) {
        const { _id, name, email } = response.data.user;
        return { message: response.data.message, user: { id: _id, name, email } };
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const axiosInstance = await createAxiosInstanceAuth();
      const response = await axiosInstance.post("/auth/login", { email, password });

      if (response.data) {
        const { _id, name, email } = response.data.user;

        const userData = { id: _id, email, name };

        await SecureStore.setItemAsync("authToken", response.data.token);

        return userData;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token:null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; 
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
