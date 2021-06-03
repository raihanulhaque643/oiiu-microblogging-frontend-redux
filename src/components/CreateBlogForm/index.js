import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createBlogAsync, fetchBlogsAsync } from "../../features/blog/blogSlice";

const CreateBlogForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useSelector((state) => state.auth);
  let firstName = JSON.parse(localStorage.getItem('user')).firstName;

  const dispatch = useDispatch();

  // const firstName = localStorage.getItem('user').firstName;

  // const handlePost = async ({ description }) => {
  //   try {
  //     const response = await axios({
  //       method: "post",
  //       url: "https://oiiu-backend.herokuapp.com/oiiu/create/blogpost",
  //       data: {
  //         description
  //       },
  //       headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       }
  //     });
  //     console.log(response);
  //     setLoading(false);
  //     setErrorMessage("");
  //   } catch (e) {
  //     console.log({ e });
  //     setLoading(false);
  //     setErrorMessage(e.response.data.message);
  //   }
  // };

  return (
    <div className="bg-white p-4 m-4 flex flex-col w-full md:w-6/12">
      <div className="text-3xl text-gray-500 mb-4 font-semibold">Hi {firstName && `${firstName},`} <br/> Write a post...</div>
      <Formik
        initialValues={{ description: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.description) {
            errors.description = "Description can not be empty";
          } 
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(createBlogAsync(values));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <Field
              placeholder="Desription"
              className="m-2 p-2 border"
              type="text"
              name="description"
            />
            <ErrorMessage
              name="description"
              className="ml-4 mb-4 text-sm text-red-500 font-bold"
              component="div"
            />

            {errorMessage && (
              <div className="ml-4 my-2 text-md text-red-500 font-bold">
                {errorMessage}
              </div>
            )}

            <button
              className={`m-2 p-2 border bg-indigo-500 text-white font-semibold ${
                loading ? "animate-pulse" : ""
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              Post
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlogForm;
