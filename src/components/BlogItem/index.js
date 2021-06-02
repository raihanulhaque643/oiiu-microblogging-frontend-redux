import React from 'react'

const BlogItem = ({ _id, description, owner, likes }) => {

    const handleLike = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log({
            myId: user._id
        })
        console.log({
            itemId: _id
        })
    }

    return (
        <div className="border my-2 p-2">
            <div className="flex flex-col">
                <div className="flex flex-row font-semibold">{owner.firstName}{' '}{owner.lastName}</div>
                <div className="flex flex-row px-4">{description}</div>
                <div className="flex flex-row">
                    <button onClick={handleLike} className="mx-4 p-2 border border-indigo-700 rounded">Like</button>
                    <div className="flex justify-center items-center p-2 bg-indigo-500 rounded text-white">{likes.length}</div>
                </div>
            </div>
        </div>
    )
}

export default BlogItem
