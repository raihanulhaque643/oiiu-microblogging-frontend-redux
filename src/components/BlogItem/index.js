import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogAsync } from "../../features/blog/blogSlice";

const BlogItem = ({ _id, description, owner, likes }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLike = () => {
    // const user = JSON.parse(localStorage.getItem('user'));
    console.log({
      myId: auth.user._id,
    });
    console.log({
      itemId: _id,
    });
  };

  const handleDelete = (blogId, userId) => {
    const data = {userId, blogId}
    dispatch(deleteBlogAsync(data))
  }

  return (
    <div className="border my-2 p-2">
      <div className="flex flex-col">
        <div className="flex flex-row font-semibold">
          {owner.firstName} {owner.lastName}
        </div>
        <div className="flex flex-row px-4">{description}</div>
        <div className="flex flex-row">
          <button
            onClick={handleLike}
            className="mx-4 p-2 border border-indigo-700 rounded"
          >
            Like
          </button>
          <div className="flex justify-center items-center p-2 bg-indigo-500 rounded text-white">
            {likes.length}
          </div>
          {user._id === owner._id && (
            <button
              onClick={() => {handleDelete(_id, owner._id)}}
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
