import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  status: "",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchBlogsAsync = createAsyncThunk("blog/fetch", async (token) => {
  let response;
  try {
    response = await axios({
      method: "get",
      url: "https://oiiu-backend.herokuapp.com/oiiu//get/allblogposts",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.log({ e });
  }
  return response.data;
});

export const createBlogAsync = createAsyncThunk(
  "blog/create",
  async (values) => {
    let response;
    try {
      response = await axios({
        method: "post",
        url: "https://oiiu-backend.herokuapp.com/oiiu/create/blogpost",
        data: {
          description: values.description,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (e) {
      console.log({ e });
    }
    return response.data;
  }
);

export const deleteBlogAsync = createAsyncThunk(
  "blog/delete",
  async ({ blogId, userId }) => {
    let response;
    try {
      response = await axios({
        method: "delete",
        url: `https://oiiu-backend.herokuapp.com/oiiu/delete/blogpost/${blogId}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (e) {
      console.log({ e });
    }
    return response.data;
  }
);

export const likeBlogAsync = createAsyncThunk(
  "blog/like",
  async ({ blogId, userId }) => {
    let response;
    try {
      response = await axios({
        method: "patch",
        url: `https://oiiu-backend.herokuapp.com/oiiu/react/blogpost/${blogId}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (e) {
      console.log({ e });
    }
    return response.data;
  }
);

export const blogSlice = createSlice({
  name: "blog",
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
      .addCase(fetchBlogsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogsAsync.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.blogs = action.payload;
      })
      .addCase(createBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBlogAsync.fulfilled, (state, action) => {
        state.status = "fullfilled";
        // state.blogs = [action.payload, ...state.blogs];
      })
      .addCase(deleteBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBlogAsync.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.blogs = state.blogs.filter((item, index) => {
          return item._id !== action.payload._id;
        });
      })
      .addCase(likeBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likeBlogAsync.fulfilled, (state, action) => {
        state.status = "fullfilled";
        // state.blogs = state.blogs.filter((item, index) => {
        //   return item._id !== action.payload._id;
        // });
      });
  },
});

export const { increment, decrement, incrementByAmount } = blogSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBlog = (state) => state.blog;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default blogSlice.reducer;
