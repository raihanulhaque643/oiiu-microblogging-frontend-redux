import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogItem from "../BlogItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogsAsync } from "../../features/blog/blogSlice";

const AllBlogs = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const blogs = useSelector((state) => state.blog.blogs);
  const dispatch = useDispatch();

  const fetchAllBlogs = async () => {
    dispatch(fetchBlogsAsync(localStorage.getItem('token'))).then(() => {
      setLoading(false);
    })
  };


  useEffect(() => {
      fetchAllBlogs();
  }, []);

  return (
    <div className="bg-white p-4 m-4 flex flex-col w-full md:w-6/12">
      <div className="text-3xl text-gray-500 mb-4 font-semibold">
        Blog Feeds....
      </div>
      {
        errorMessage &&
        <div className="text-red-400 font-bold">errorMessage</div>
      }
      {loading ? (
        <div className="font-bold">Loading posts...</div>
      ) : (
        blogs.map((item, index) => {
          return (
            <BlogItem
              key={index}
              description={item.description}
              owner={item.owner}
              likes={item.likes}
              _id={item._id}
            />
          );
        })
      )}
    </div>
  );
};

export default AllBlogs;
