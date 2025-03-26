import React, { useState } from "react";
import axios from "axios";
import { BsEnvelopeAt } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const ForgotPage = () => {
  const [status, setStatus] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmitEmail = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_HOST}/auth/forgot`,
        { email }
      );
      if (res?.status === 200) {
        setStatus("success");
        toast.success(res.data.message);

        let countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prevCountdown - 1;
          });
        }, 1000);

        setTimeout(() => {
          navigate("/");
        }, 10000);
      }
    } catch (error) {
      setStatus("error");
      toast.error(
        error?.response?.data.message ||
          "Something went wrong. Please try again"
      );
    }
    setLoading(false);
  };

  const validateEmail = (value) => {
    if (value.length < 3) {
      setEmailError("Email must be at least 3 characters long.");
    } else if (value.length > 48) {
      setEmailError("Email must be at most 48 characters long.");
    } else {
      setEmailError("");
    }
  };

  const handleGetEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  if (loading) return <Loading />;

  return (
    <div className="w-[100%] h-[fit-content] xl:h-screen bg-white">
      <div className="w-[100%] flex flex-col items-center gap-[80px] px-8">
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
              Verify your email
            </div>
          </div>

          <div className="mt-4 flex justify-start items-center gap-2 text-blue-900">
            <span>Email</span>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => handleGetEmail(e)}
            placeholder="e.g. example@domain.com"
            className={` py-3 px-6 border-[1px] hover:border-[#006bff] rounded-[48px] w-[100%] bg-white ${
              emailError === "" ? "" : "border-[red]"
            } focus:outline-none focus:border-[#006bff]`}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
          <button
            className="mt-3 p-3 border-[1px] border-[#006bff] rounded-[48px] w-[100%] bg-[#006bff] text-white"
            onClick={handleSubmitEmail}
            disabled={loading}
          >
            Submit
          </button>
          <div className="mt-4">
            {status === "success" && (
              <div className="flex flex-col gap-4">
                <div className="bg-blue-200 py-4 px-6 w-[100%] text-blue-900 h-[80px] flex justify-center items-center rounded-[4px]">
                  <span className="">
                    Request was successful. Please check your email.
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
            {status === "error" && (
              <div className="bg-red-100 py-4 px-6 w-[100%] text-[#ff3131] h-[80px] flex justify-start items-center rounded-[4px]">
                <span className="">
                  The email you entered does not exist on our database. Please
                  try again.
                </span>
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

export default ForgotPage;
