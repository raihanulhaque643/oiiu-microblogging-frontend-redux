import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  createBlogStatus: "",
  deleteBlogStatus: "",
  fetchBlogStatus: "",
};

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsAsync.pending, (state) => {
        state.fetchBlogStatus = "loading";
      })
      .addCase(fetchBlogsAsync.fulfilled, (state, action) => {
        state.fetchBlogStatus = "fulfilled";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogsAsync.rejected, (state, action) => {
        state.fetchBlogStatus = "rejected";
      })
      .addCase(createBlogAsync.pending, (state) => {
        state.createBlogStatus = "loading";
      })
      .addCase(createBlogAsync.fulfilled, (state, action) => {
        state.createBlogStatus = "fulfilled";
        // state.blogs = [action.payload, ...state.blogs];
      })
      .addCase(createBlogAsync.rejected, (state, action) => {
        state.createBlogStatus = "rejected";
      })
      .addCase(deleteBlogAsync.pending, (state) => {
        state.deleteBlogStatus = "loading";
      })
      .addCase(deleteBlogAsync.fulfilled, (state, action) => {
        state.deleteBlogStatus = "fulfilled";
        state.blogs = state.blogs.filter((item, index) => {
          return item._id !== action.payload._id;
        })
      })
      .addCase(deleteBlogAsync.rejected, (state) => {
        state.deleteBlogStatus = "rejected";
      })
      .addCase(likeBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likeBlogAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        // state.blogs = state.blogs.filter((item, index) => {
        //   return item._id !== action.payload._id;
        // });
      });
  },
});


export const selectBlog = (state) => state.blog;

export default blogSlice.reducer;
