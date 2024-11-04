import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { disconnect } from "process";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
  },
  reducers: {
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },

    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },

    fetchLeaderBoardRequest(state, action){
      state.loading = true;
      state.leaderboard = [];
    },
    fetchLeaderBoardSuccess(state, action){
      state.loading = false;
      state.leaderboard = action.payload;
    },
    fetchLeaderBoardFailed(state, action){
      state.loading = false;
      state.leaderboard = [];
    },

    fetchUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },

    logoutSuccess(state, action) {
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
    },
    clearAllError(state, action) {
      state.user = state.user;
      state.isAuthenticated = state.isAuthenticated;
      state.loading = false;
      state.leaderboard = state.leaderboard;
    },
  },
});
//Register function
export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/user/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllError());
  }
};

//Login function
export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/user/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllError());
  }
};

//Log out function
export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/user/logout",
      { withCredentials: true }
    );
    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllError());
  }
};

//Fetching user
export const fetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/user/me",
      { withCredentials: true }
    );
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllError());
    console.error(error);
  }
};


export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchLeaderBoardRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/user/leaderboard",
      { withCredentials: true }
    );
    dispatch(userSlice.actions.fetchLeaderBoardSuccess(response.data.leaderboard));
    
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.fetchLeaderBoardFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllError());
    console.error(error);
  }
};


//Auction Won
// In your userSlice.js
export const fetchAuctionWon = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());
  try {
    const response = await axios.get("http://localhost:5000/api/v1/user/me", {
      withCredentials: true,
    });
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed());
    toast.error(error.response.data.message);
    dispatch(userSlice.actions.clearAllError());
  }
};




export default userSlice.reducer;
