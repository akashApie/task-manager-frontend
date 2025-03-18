import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import createAxiosInstance  from "../apiClient";

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ userId, oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.post("/auth/change-password", { 
        userId, 
        oldPassword, 
        newPassword 
      });

      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error changing password");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    passwordChangeSuccess: false,
    passwordChangeMessage: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.passwordChangeSuccess = false;
      state.passwordChangeMessage = "";
    },
    clearPasswordChangeState: (state) => {
      state.passwordChangeSuccess = false;
      state.passwordChangeMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.passwordChangeSuccess = false;
        state.passwordChangeMessage = "";
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordChangeSuccess = true;
        state.passwordChangeMessage = action.payload; 
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.passwordChangeSuccess = false;
        state.passwordChangeMessage = "";
        state.error = action.payload;
      });
  },
});

export const { logout, clearPasswordChangeState } = authSlice.actions;
export default authSlice.reducer;
