import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogAsync, fetchBlogsAsync, likeBlogAsync } from "../../features/blog/blogSlice";

const BlogItem = ({ _id, description, owner, likes }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [liked, setLiked] = useState(false);

  const handleLike = (blogId, userId) => {
    const data = { userId, blogId };
    dispatch(likeBlogAsync(data)).then((res) => {
      dispatch(fetchBlogsAsync(localStorage.getItem('token')))
    });
  };

  const handleDelete = (blogId, userId) => {
    const data = { userId, blogId };
    dispatch(deleteBlogAsync(data));
  };

  useEffect(() => {
    if(likes.includes(user._id)){
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [likes, user._id])

  return (
    <div className="border my-2 p-2">
      <div className="flex flex-col">
        <div className="flex flex-row font-semibold">
          {owner.firstName} {owner.lastName}
        </div>
        <div className="flex flex-row px-4">{description}</div>
        <div className="flex flex-row">
          <button
            onClick={() => {
              handleLike(_id, owner._id);
            }}
            className={`mx-4 p-2 border border-indigo-700 rounded ${liked ? "bg-blue-200" : "bg-white"} `}
          >
            Like
          </button>
          <div className="flex justify-center items-center p-2 bg-indigo-500 rounded text-white">
            {likes.length}
          </div>
          {user._id === owner._id && (
            <button
              onClick={() => {
                handleDelete(_id, owner._id);
              }}
              className="mx-4 p-2 border-2 border-red-700 rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
