import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInAsync } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const SigninForm = () => {

  const history = useHistory();

  const dispatch = useDispatch();
  return (
    <div className="bg-white p-4 m-4 flex flex-col w-80">
      <h1 className="text-3xl text-gray-500 mb-4 font-semibold">Log in</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 6) {
            errors.password = "Password must be atleast 6 characters";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signInAsync(values)).then((res) => {
            // localStorage.setItem('token', res.payload.token);
            history.push('/allblogs');
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <Field
              placeholder="Email"
              className="m-2 p-2 border"
              type="email"
              name="email"
            />
            <ErrorMessage
              name="email"
              className="ml-4 mb-4 text-sm text-red-500 font-bold"
              component="div"
            />
            <Field
              placeholder="Password"
              className="m-2 p-2 border"
              type="password"
              name="password"
            />
            <ErrorMessage
              name="password"
              className="ml-4 mb-4 text-sm text-red-500 font-bold"
              component="div"
            />

            <button
              className="m-2 p-2 border bg-indigo-500 text-white font-semibold"
              type="submit"
              disabled={isSubmitting}
            >
              Signin
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SigninForm;
