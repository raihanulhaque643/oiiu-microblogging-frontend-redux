import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createBlogAsync, fetchBlogsAsync } from "../../features/blog/blogSlice";

const CreateBlogForm = () => {
  const createBlogStatus = useSelector((state) => state.blog.createBlogStatus);

  const auth = useSelector((state) => state.auth);
  let firstName = JSON.parse(localStorage.getItem('user')).firstName;

  const dispatch = useDispatch();

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
          dispatch(createBlogAsync(values)).then((res) => {
            dispatch(fetchBlogsAsync(localStorage.getItem('token')));
            setSubmitting(false);
          });
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

            <button
              className="m-2 p-2 border bg-indigo-500 text-white font-semibold"
              type="submit"
              disabled={isSubmitting}
            >
              Post
            </button>

            {
              createBlogStatus === 'loading' &&
              <div className="ml-4 mb-4 text-sm text-green-500 font-bold">Processing...Please wait...</div>
            }
            {
              createBlogStatus === 'fulfilled' &&
              <div className="ml-4 mb-4 text-sm text-green-500 font-bold">Successfully posted...</div>
            }
            {
              createBlogStatus === 'rejected' &&
              <div className="ml-4 mb-4 text-sm text-red-500 font-bold">Failed to submit...</div>
            }

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlogForm;
