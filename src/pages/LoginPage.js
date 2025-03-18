import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import MatrixEffect from "../utils/matrixEffect";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "username":
        if (!value.trim()) errorMsg = "Username is required";
        else if (value.length < 3)
          errorMsg = "Username must be at least 3 characters";
        else if (value.length > 20)
          errorMsg = "Username cannot exceed 20 characters";
        break;

      case "password":
        if (!value) errorMsg = "Password is required";
        else if (value.length < 6)
          errorMsg = "Password must be at least 6 characters";
        else if (value.length > 20)
          errorMsg = "Password cannot exceed 20 characters";
        break;

      // case "confirmPassword":
      //   if (!value) errorMsg = "Please confirm your password";
      //   else if (value !== formValues.password) errorMsg = "Passwords do not match";
      //   break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(formValues).forEach((field) => {
      const error = validateField(field, formValues[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(login(formValues.username, formValues.password));
    }
  };

  return (
    <div id="login" className="relative">
      <MatrixEffect />
      <div className="flex w-full h-[100vh] relative">
        <div className="bg-transparent w-[58%] h-[100vh]"></div>
        <div className="bg-white w-full max-w-[50rem] h-full px-[1.75rem] md:px-[1.25rem] relative z-20">
          <div className="spacer-xs"></div>
          <div className="spacer-small"></div>
          <div className="spacer-small"></div>
          <div className="spacer-medium hidden md:block"></div>

          <div className="w-full flex flex-col justify-start items-center">
            <span className="text-[48px] text-[#282828] font-[extra-light-italic]">
              Welcome back, micros
              <span className="font-[extra-light]"> */</span>
            </span>
            <div className="spacer-small"></div>
            <div className="spacer-medium"></div>
            <span className="text-[48px] text-[#282828] font-[semi-bold]">
              Login
            </span>
            <div className="spacer-medium"></div>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center flex-col items-start gap-4">
                <input
                  name="username"
                  className="w-[320px] md:w-[400px] h-[56px] border-[1px] border-[#282828] px-4 focus:outline-none focus:border-blue-700 font-[extra-light]"
                  placeholder="Enter your username"
                  value={formValues.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.username && (
                  <span className="text-red-500 text-[14px]">
                    {errors.username}
                  </span>
                )}
              </div>
              <div className="spacer-small"></div>
              <div className="flex justify-center flex-col items-start gap-4">
                <input
                  name="password"
                  type="password"
                  className="w-[320px] md:w-[400px] h-[56px] border-[1px] border-[#282828] px-4 focus:outline-none focus:border-blue-700 font-[extra-light]"
                  placeholder="Enter your password"
                  value={formValues.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && (
                  <span className="text-red-500 text-[14px]">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="spacer-xs"></div>
              <div className="spacer-small"></div>
              <button
                type="submit"
                className={`cursor-pointer py-[1rem] w-[320px] md:w-[400px] ${
                  Object.values(errors).some((err) => err !== "") ||
                  !formValues.username ||
                  !formValues.password
                    ? "border-[1px] border-gray-300 bg-gray-300 text-white"
                    : "footer-btn"
                } `}
                disabled={
                  Object.values(errors).some((err) => err !== "") ||
                  !formValues.username ||
                  !formValues.password
                }
              >
                Login
              </button>
            </form>
            <div className="spacer-xs"></div>
            <div className="spacer-medium"></div>
            <div className="cursor-pointer text-red-500 hover:underline">
              Forgot Password?
            </div>
            <div className="spacer-small"></div>
            <div
              className="cursor-pointer text-[#282828] hover:underline"
              onClick={() => navigate("/register")}
            >
              Don't have an account yet?
            </div>
            <div className="spacer-medium"></div>
            <div className="w-[320px] md:w-[400px] h-[1px] bg-gray-300"></div>
            <div className="spacer-medium"></div>
            <span className="text-[14px] font-[extra-light]">
              All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
