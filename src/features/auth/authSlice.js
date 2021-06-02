import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: '',
  user: '',
  status: ''
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
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
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.token = action.payload.token;
        state.user = action.payload.user;
      });
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuth = (state) => state.auth;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default authSlice.reducer;
