import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/images/logo.png";
import { BsEnvelopeAt } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPage = () => {
  const [status, setStatus] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [countdown, setCountdown] = useState(3);

  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmitPassword = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/auth/resetpassword/${id}/${token}`,
        { password }
      );
      if (res?.status === 200) {
        setStatus("success");
        toast.success(res.data.message);

        let timer;
        let countdownInterval;

        countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prevCountdown - 1;
          });
        }, 1000);

        timer = setTimeout(() => {
          navigate("/");
        }, 10000);
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setStatus("error");
        toast.error(error?.response?.data.message);
      } else {
        toast.error(
          error?.response?.data.message ||
            "Something went wrong. Please try again"
        );
      }
    }
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else if (value.length > 20) {
      setPasswordError("Password must be at most 20 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (value) => {
    if (password !== value) {
      setConfirmPasswordError("Password must be same.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleGetPassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleGetConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

  return (
    <div className="w-full h-[fit-content] xl:h-screen flex justify-center bg-white">
      <div className="w-full flex flex-col items-center gap-[60px]">
        <div className="spacer-medium"></div>
        <div className="w-full xl:w-[500px] flex items-center justify-start relative z-20">
          <span className="text-[48px] text-[#282828] font-[extra-light-italic]">
            Mathematrix
            <span className="font-[extra-light]"> */</span>
          </span>
        </div>
        <div className="w-full xl:w-[500px] flex flex-col gap-4 z-20">
          <div className="flex items-center justify-start relative">
            <div className="text-[36px] text-blue-500 font-[semi-bold]">
              Password Change
            </div>
          </div>

          <div className="mt-4 flex justify-start items-center gap-2 text-blue-900">
            <span>Password</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => handleGetPassword(e)}
            placeholder="Enter password"
            className={` py-3 px-6 border-[1px] hover:border-[#006bff] rounded-[48px] w-[100%] bg-white ${
              passwordError === "" ? "" : "border-[red]"
            } focus:outline-none focus:border-[#006bff]`}
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
          <div className="mt-4 flex justify-start items-center gap-2 text-blue-900">
            <span>Confirm Password</span>
          </div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => handleGetConfirmPassword(e)}
            placeholder="Confirm password"
            className={` py-3 px-6 border-[1px] hover:border-[#006bff] rounded-[48px] w-[100%] bg-white ${
              confirmPasswordError === "" ? "" : "border-[red]"
            } focus:outline-none focus:border-[#006bff]`}
          />
          {confirmPasswordError && (
            <p className="text-red-500">{confirmPasswordError}</p>
          )}
          {password !== "" &&
          confirmPassword !== "" &&
          passwordError === "" &&
          confirmPasswordError === "" &&
          password === confirmPassword ? (
            <button
              className="mt-3 p-3 border-[1px] border-[#006bff] rounded-[48px] w-[100%] bg-[#006bff] text-white"
              onClick={handleSubmitPassword}
            >
              Submit
            </button>
          ) : (
            <button className="mt-3 p-3 border-[1px] border-blue-400 rounded-[48px] w-[100%] bg-blue-400 text-white">
              Submit
            </button>
          )}

          <div className="mt-4">
            {status === "success" && (
              <div className="flex flex-col gap-4">
                <div className="bg-blue-200 py-4 px-6 w-[100%] text-blue-900 h-[80px] flex justify-center items-center rounded-[4px]">
                  <span className="">
                    Password changed successfully. You can now close this window
                    or wait for automatic redirection.
                  </span>
                </div>
                <div className="text-white rounded-[4px] mt-8 flex items-center justify-end border-[1px] h-[77px] px-4 bg-blue-900 relative">
                  <span className="mr-2">
                    Redirecting you to login page in {countdown} seconds.
                  </span>
                  <div className="absolute bottom-[20px] left-[40px] w-[120px] h-[120px] rounded-[50%] bg-white flex justify-center items-center">
                    <div className="text-[36px] text-white flex justify-center items-center w-[100px] h-[100px] bg-[#006bff] rounded-[50%]">
                      {countdown}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute flex justify-center items-center w-[800px] h-[800px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-160px] right-[200px] z-10 transform rotate-[45deg]">
          <div className="flex justify-center items-center w-[760px] h-[760px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
            <div className="flex justify-center items-center w-[720px] h-[720px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
              <div className="flex justify-center items-center w-[680px] h-[680px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                <div className="flex justify-center items-center w-[640px] h-[640px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                  <div className="flex justify-center items-center w-[600px] h-[600px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                    <div className="flex justify-center items-center w-[560px] h-[560px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                      <div className="flex justify-center items-center w-[520px] h-[520px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                        <div className="flex justify-center items-center w-[480px] h-[480px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                          <div className="flex justify-center items-center w-[440px] h-[440px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                            <div className="flex justify-center items-center w-[400px] h-[400px] rounded-[50%] border-[2px] border-[#f9f9f9] top-[-200px] left-[-400px] z-10">
                              <BsEnvelopeAt className="text-[72px] text-[#f9f9f9]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
