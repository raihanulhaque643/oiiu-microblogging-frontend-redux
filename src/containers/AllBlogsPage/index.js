import React, { useState } from "react";
import { useHistory } from "react-router";
import AllBlogs from "../../components/AllBlogs";
import CreateBlogForm from "../../components/CreateBlogForm";

const AllBlogsPage = () => {
  const history = useHistory();
  return (
    <div className="">
      <div className="flex flex-row items-center justify-between">
        <div className="p-2 m-2 rounded text-indigo-800 text-xl font-bold">Microblogging App</div>
        <button
          onClick={() => {
            localStorage.clear();
            history.push('/')
          }}
          className="bg-red-400 p-2 m-2 rounded"
        >
          Log out
        </button>
      </div>
      <div className="bg-indigo-200 min-h-screen max-h-auto flex flex-col justify-start items-center">
        <div className="flex flex-col items-center w-full">
          <CreateBlogForm />
          <AllBlogs />
        </div>
      </div>
    </div>
  );
};

export default AllBlogsPage;
