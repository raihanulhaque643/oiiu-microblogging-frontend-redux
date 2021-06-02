import React from "react";
import SigninForm from "../../components/SigninForm";
import SignupForm from "../../components/SignupForm";

const HomePage = () => {
  return (
    <div className="bg-indigo-200 min-h-screen max-h-auto flex justify-center items-center">
      <div className="flex flex-col md:flex-row items-center">
        <SigninForm />
        <SignupForm />
      </div>
    </div>
  );
};

export default HomePage;
