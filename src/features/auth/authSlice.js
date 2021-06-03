import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: '',
  user: '',
  signInStatus: '',
  signUpStatus: ''
};

export const signInAsync = createAsyncThunk(
  'auth/signin',
  async (values) => {
    console.log(values.email)
    console.log(values.password)
    let response;
    try {
       response = await axios({
        method: "post",
        url: "https://oiiu-backend.herokuapp.com/oiiu/signin",
        data: {
          email: values.email,
          password: values.password,
        },
        headers: {"Access-Control-Allow-Origin": "*"}
      });
      console.log(response);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (e) {
      console.log({ e });
    }
    return response.data;
  }
);

export const signUpAsync = createAsyncThunk(
  'auth/signup',
  async (values) => {
    console.log(values.email)
    console.log(values.password)
    let response;
    try {
       response = await axios({
        method: "post",
        url: "https://oiiu-backend.herokuapp.com/oiiu/signup",
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
        headers: {"Access-Control-Allow-Origin": "*"}
      });
      console.log(response);
    } catch (e) {
      console.log({ e });
    }
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.signInStatus = 'loading';
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.signInStatus = 'fulfilled';
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signInAsync.rejected, (state) => {
        state.signInStatus = 'rejected';
      })
      .addCase(signUpAsync.pending, (state) => {
        state.signUpStatus = 'loading';
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.signUpStatus = 'fulfilled';
      })
      .addCase(signUpAsync.rejected, (state) => {
        state.signUpStatus = 'rejected';
      })
  },
});

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
