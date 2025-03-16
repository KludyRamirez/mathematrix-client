import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import { api } from "../api/axios";
import {
  BsBookmarkStar,
  BsClockHistory,
  BsController,
  BsTrophy,
} from "react-icons/bs";
import controller from "../assets/images/controller.png";
import folder from "../assets/images/folder.png";
import trophy from "../assets/images/trophy.png";
import clock from "../assets/images/clock.png";
import { Link } from "react-router-dom";
import StarsCanvas from "../components/StarsCanvas";

import crown from "../assets/images/crown.png";
import rationalfunctions from "../assets/images/rational-functions-thumbnail.jpg";
import rationalinequalities from "../assets/images/rational-inequalities-thumbnail.jpg";

import { BsYoutube } from "react-icons/bs";

const lectures = [
  {
    name: "Rational Functions, Equations and Inequalities",
    thumbnail: rationalfunctions,
    link: "https://youtu.be/sIrZQZBDjbM?si=CoWh7dJ9TofgfdlF",
    description:
      "This video is a presentation of how to identify rational inequalities, rational equations, and rational functions.",
  },
  {
    name: "Rational Inequalities",
    thumbnail: rationalinequalities,
    link: "https://youtu.be/x4u2IVcCOdY?si=VuCsCKir9B5EtZ77",
    description:
      "This video teaches how to solve rational inequalities using formulas, with a clear, step-by-step guide.",
  },
  {
    name: "Rational Inequalities 2.0",
    thumbnail: rationalinequalities,
    link: "https://youtu.be/sq3my6iY7Ao?si=Evrbp853zTJaOUV0",
    description:
      "This video is a secondary part and a continuation of the first rational inequalities video",
  },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [leaderboard, setLeaderboard] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);
  const [videoLink, setVideoLink] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState("");

  useEffect(() => {
    if (user) {
      fetchLeaderboard();
      fetchMatchHistory();
    }
  }, [user]);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get(`/singleplayer/leaderboard`);
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const fetchMatchHistory = async () => {
    try {
      const response = await api.get(`/history/${user.username}`);
      setMatchHistory(response.data);
    } catch (error) {
      console.error("Error fetching match history:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleVideoPlayer = (link) => {
    setVideoLink(link);
  };

  const handleClosePlayer = () => {
    setVideoLink(null);
  };

  const filteredLectures = lectures?.filter((lecture) => {
    return (
      lecture.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <StarsCanvas />
      {videoLink && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <button
            onClick={handleClosePlayer}
            className="absolute top-4 right-20 text-white text-4xl"
          >
            &times;
          </button>
          <div className="max-w-4xl w-full max-h-[80%] h-full">
            <ReactPlayer url={videoLink} width="100%" height="100%" />
          </div>
        </div>
      )}
      <div className="w-full h-screen flex items-start justify-center px-20">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full flex justify-between items-center py-20">
            <div className="flex justify-center items-center gap-8">
              <span className="text-[56px] font-bold text-6xl text-gray-900 font-[mighty] tracking-wide">
                Mathematrix
              </span>
            </div>
            <div className="flex justify-end items-center gap-8">
              <div className="w-[20px] h-[20px] bg-red-500 rounded-[50%]"></div>
              <span className="text-[24px]">
                Note:{" "}
                <span className="font-[regular] text-yellow-500">
                  Ready for testing but currently under construction.
                </span>
              </span>
              <span className="text-[24px] font-[mighty]">
                Welcome, {user.username} !
              </span>
              <div className="flex justify-center items-center w-[60px] h-[60px] font-[mighty] text-white text-2xl rounded-[50%] bg-blue-500 shadow-2xl shadow-sky-500/50">
                {user.username.slice(0, 1).toUpperCase()}
              </div>
            </div>
          </div>
          <div className="w-[1336px] flex flex-wrap justify-center items-start gap-8">
            <Link to="/singleplayer">
              <div className="cursor-pointer relative w-[310px] h-[290px] bg-blue-500 rounded-3xl shadow-2xl shadow-sky-500/50 group hover:bg-white/20 hover:shadow-sky-100/50 hover:border-[1px] border-blue-300 transition-all duration-500">
                <div className="absolute -top-8 w-full 2xl:left-20 left-14 text-white/10 text-[250px] group-hover:text-blue-600 group-hover:rotate-[40deg] group-hover:-translate-x-10 transition-all duration-500 ease-in-out">
                  <BsController />
                </div>

                <div className="absolute -top-14 w-[310px] left-8 text-white/10 hidden group-hover:block">
                  <img src={controller} alt="" />
                </div>

                <p className="absolute bottom-4 left-5 w-full text-white text-[38px] font-[vip-regular] group-hover:text-blue-600 transition-colors duration-500">
                  Play
                </p>
              </div>
            </Link>
            <div
              className={`${
                active === "Lectures"
                  ? "bg-white/20 shadow-sky-100/50 border-[1px] border-blue-300 text-blue-600"
                  : "bg-blue-500 shadow-sky-500/50"
              } cursor-pointer relative w-[310px] h-[290px] rounded-3xl shadow-2xl group text-white hover:bg-white/20 hover:shadow-sky-100/50 hover:border-[1px] hover:border-blue-300 transition-all duration-500`}
              onClick={() => setActive("Lectures")}
            >
              <div className="absolute -top-8 w-full 2xl:left-20 left-14 text-white/10 text-[240px] group-hover:text-blue-600 group-hover:rotate-[18deg] group-hover:-translate-x-10 transition-all duration-500 ease-in-out">
                <BsBookmarkStar />
              </div>

              <div
                className={`${
                  active === "Lectures" ? "block" : "hidden"
                } absolute -top-12 left-16 w-[274px] group-hover:block`}
              >
                <img src={folder} alt="" className="" />
              </div>

              <p
                className={`${
                  active === "Lectures" ? "text-blue-500" : "text-white"
                } absolute bottom-4 left-5 w-full text-[38px] font-[vip-regular] group-hover:text-blue-500`}
              >
                Lectures
              </p>
            </div>

            <div
              className={`${
                active === "Leaderboards"
                  ? "bg-white/20 shadow-sky-100/50 border-[1px] border-blue-300 text-blue-600"
                  : "bg-blue-500 shadow-sky-500/50"
              } cursor-pointer relative w-[310px] h-[290px] rounded-3xl shadow-2xl group text-white hover:bg-white/20 hover:shadow-sky-100/50 hover:border-[1px] hover:border-blue-300 transition-all duration-500`}
              onClick={() => setActive("Leaderboards")}
            >
              <div className="absolute -top-8 w-full 2xl:left-20 left-14 text-white/10 text-[240px] group-hover:text-blue-600 group-hover:rotate-[18deg] group-hover:-translate-x-10 transition-all duration-500 ease-in-out">
                <BsTrophy />
              </div>

              <div
                className={`${
                  active === "Leaderboards" ? "block" : "hidden"
                } absolute -top-12 left-16 w-[274px] group-hover:block`}
              >
                <img src={trophy} alt="" className="" />
              </div>

              <p
                className={`${
                  active === "Leaderboards" ? "text-blue-500" : "text-white"
                } absolute bottom-4 left-5 w-full text-[38px] font-[vip-regular] group-hover:text-blue-500`}
              >
                Boards
              </p>
            </div>

            <div
              className={`${
                active === "History"
                  ? "bg-white/20 shadow-sky-100/50 border-[1px] border-blue-300 text-blue-600"
                  : "bg-blue-500 shadow-sky-500/50"
              } cursor-pointer relative w-[310px] h-[290px] rounded-3xl shadow-2xl group text-white hover:bg-white/20 hover:shadow-sky-100/50 hover:border-[1px] hover:border-blue-300 transition-all duration-500`}
              onClick={() => setActive("History")}
            >
              <div className="absolute -top-8 w-full 2xl:left-20 left-14 text-white/10 text-[240px] group-hover:text-blue-600 group-hover:rotate-[18deg] group-hover:-translate-x-10 transition-all duration-500 ease-in-out">
                <BsClockHistory />
              </div>

              <div
                className={`${
                  active === "History" ? "block" : "hidden"
                } absolute -top-12 left-16 w-[274px] group-hover:block`}
              >
                <img src={clock} alt="" className="" />
              </div>

              <p
                className={`${
                  active === "History" ? "text-blue-500" : "text-white"
                } absolute bottom-4 left-5 w-full text-[38px] font-[vip-regular] group-hover:text-blue-500`}
              >
                History
              </p>
            </div>
          </div>
          <div className="spacer-medium"></div>

          {/* Lectures */}

          <div
            className={`${
              active === "Lectures" ? "block" : "hidden"
            } w-[1336px] flex flex-col justify-start items-start border-[1px] border-blue-300 pt-8 pb-0 rounded-3xl bg-blue-300/10`}
          >
            <div className="w-full flex justify-between items-center px-8">
              <span className="text-[38px] font-[vip-regular] text-blue-600">
                Lectures
              </span>
              <input
                name="search"
                className="w-[274px] h-[46px] border-[1px] border-blue-300 px-4 focus:outline-none focus:border-blue-400 rounded-[32px] font-[extra-light]"
                placeholder="Search lectures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="spacer-medium"></div>
            <div className="w-full flex justify-start items-start gap-8 px-8">
              {filteredLectures?.map((lecture) => (
                <div
                  key={lecture.name}
                  className="w-[445px] flex flex-col justify-start items-start group relative"
                  onClick={() => handleVideoPlayer(lecture.link)}
                >
                  <div
                    className="
                relative cursor-pointer"
                  >
                    <img
                      src={lecture.thumbnail}
                      className="cursor-pointer aspect-[3/2] rounded-2xl"
                      alt=""
                    />
                  </div>
                  <div className="spacer-small"></div>
                  <div className="flex align-items gap-2 text-[.850rem] text-gray-500 font-[extra-light]">
                    <span>March 16, 2025</span>
                    <span>|</span>
                    <span>by Mathematrix</span>
                  </div>
                  <div className="spacer-xs"></div>
                  <a href={lecture.link} target="blank">
                    <div className="text-[#282828] cursor-pointer group-hover:underline">
                      {lecture.name}
                    </div>
                  </a>
                  <div className="spacer-xs"></div>
                  <div className="text-[#282828]">{lecture.description}</div>
                  <div className="spacer-xs"></div>
                  <div className="w-full flex flex-wrap justify-start items-start gap-4">
                    <a href={lecture.link} target="blank">
                      <div className="cursor-pointer w-[fit-content] flex justify-center items-center gap-2 p-2 bg-white text-[14px] text-red-500 rounded-[50%] border-[1px] border-gray-300 hover:bg-red-500 hover:text-white hover:border-red-500">
                        <BsYoutube size={18} />
                      </div>
                    </a>
                  </div>
                  <div className="spacer-small"></div>
                  <div className="w-full flex flex-wrap justify-start items-start gap-2">
                    <div className="cursor-pointer w-[fit-content] flex justify-center items-center py-1 px-3 gap-2 border-[1px] border-gray-300 bg-white text-[14px] text-[#282828] hover:border-[#282828] hover:bg-[#282828] hover:text-white rounded-[32px]">
                      {/* <FaReact size={16} /> */}
                      <div className="mt-[2px] tracking-wide">Core</div>
                    </div>
                    <div className="cursor-pointer w-[fit-content] flex justify-center items-center py-1 px-3 gap-2 border-[1px] border-gray-300 bg-white text-[14px] text-[#282828] hover:border-[#282828] hover:bg-[#282828] hover:text-white rounded-[32px]">
                      {/* <FaJava size={16} /> */}
                      <div className="mt-[2px] tracking-wide">Gen Math</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="spacer-medium"></div>
            <div className="w-full flex justify-start items-start">
              <div className="w-full flex flex-col justify-center items-center px-8"></div>
              <div className="spacer-small"></div>
            </div>
          </div>

          {/* Leaderboards contents */}
          <div
            className={`${
              active === "Leaderboards" ? "block" : "hidden"
            } w-[1336px] flex flex-col justify-start items-start border-[1px] border-blue-300 pt-8 pb-0 rounded-3xl bg-blue-300/10`}
          >
            <div className="text-[38px] font-[vip-regular] text-blue-600 px-8">
              Leaderboards
            </div>
            <div className="spacer-medium"></div>
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full flex flex-col justify-center items-center px-8">
                {leaderboard.slice(0, 1).map((player, index) => (
                  <div
                    key={player._id}
                    className="w-full flex items-center justify-center relative leading-none gap-8 py-14 bg-blue-100/60 rounded-3xl shadow-md shadow-gray-300/10 border-[1px] border-blue-200"
                  >
                    <img src={crown} alt="" className="w-[90px] -mt-[12px]" />
                    <span className="whitespace-nowrap font-[mighty] text-[72px] text-yellow-600 inline-block">
                      {index + 1}st
                    </span>
                    <span className="whitespace-nowrap text-center font-[mighty] tracking-wider text-[36px] text-yellow-950 pt-2 inline-block">
                      {player._id}
                    </span>
                    <span className="whitespace-nowrap font-[mighty] text-[72px] text-blue-950 inline-block">
                      {player.totalCorrect}
                    </span>
                  </div>
                ))}
              </div>

              <div className="w-full flex justify-center items-center gap-2 py-16">
                {leaderboard.slice(1, 3).map((player, index) => {
                  const rank = index === 0 ? "2nd" : "3rd";
                  const rankColor =
                    index === 0 ? "text-gray-500" : "text-yellow-800";

                  return (
                    <div
                      key={player._id}
                      className="w-[50%] flex items-center justify-center relative leading-none gap-6"
                    >
                      <span
                        className={`whitespace-nowrap font-[mighty] text-[48px] ${rankColor} inline-block`}
                      >
                        {rank}
                      </span>
                      <span className="whitespace-nowrap text-center font-[mighty] text-[24px] text-yellow-950 pt-2 inline-block">
                        {player._id}
                      </span>
                      <span className="whitespace-nowrap font-[mighty] text-[48px] text-blue-950 inline-block">
                        {player.totalCorrect}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="w-full px-8">
                <div className="w-full flex flex-col justify-start items-start border-t-[1px] border-l-[1px] border-r-[1px] border-blue-200 rounded-tl-3xl rounded-tr-3xl overflow-auto shadow-xl">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="font-[semi-bold] text-[20px]">
                        <th className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                          Rank
                        </th>
                        <th className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                          Player
                        </th>
                        <th className="w-[20%] py-6 font-[mighty] tracking-wider text-blue-700">
                          Correct
                        </th>
                        <th className="w-[20%] py-6 font-[mighty] tracking-wider text-red-700">
                          Wrong
                        </th>
                        <th className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                          Rating
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.length > 3 ? (
                        leaderboard.slice(3).map((player, index) => (
                          <tr
                            key={player._id}
                            className={`text-[20px] ${
                              index % 2 === 0
                                ? "bg-blue-100/60"
                                : "bg-transparent"
                            }`}
                          >
                            <td className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                              {index + 4}{" "}
                              {/* Adjusting index to match actual rank */}
                            </td>
                            <td className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                              {player._id}
                            </td>
                            <td className="w-[20%] py-6 font-[mighty] tracking-wider text-blue-700">
                              {player.totalCorrect}
                            </td>
                            <td className="w-[20%] py-6 font-[mighty] tracking-wider text-red-700">
                              {player.totalIncorrect}
                            </td>
                            <td className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                              1990
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-4 py-3 text-center text-gray-400"
                          >
                            No leaderboard data available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* History contents */}
          <div
            className={`${
              active === "History" ? "block" : "hidden"
            } w-[1336px] flex flex-col justify-start items-start border-[1px] border-blue-300 pt-8 pb-0 rounded-3xl bg-blue-300/10`}
          >
            <div className="text-[38px] font-[vip-regular] text-blue-600 px-8">
              History
            </div>
            <div className="spacer-medium"></div>
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full flex flex-col justify-center items-center px-8">
                <div className="w-full flex items-center justify-center relative leading-none gap-8 py-14 bg-blue-100/60 rounded-3xl shadow-md shadow-gray-300/10 border-[1px] border-blue-200">
                  <img src={crown} alt="" className="w-[90px] -mt-[12px]" />
                  <span className="whitespace-nowrap font-[mighty] text-[72px] text-yellow-600 inline-block">
                    1st
                  </span>
                  <span className="whitespace-nowrap text-center font-[mighty] tracking-wider text-[36px] text-yellow-950 pt-2 inline-block">
                    James Jameson
                  </span>
                  <span className="whitespace-nowrap font-[mighty] text-[72px] text-blue-950 inline-block">
                    1978
                  </span>
                </div>
              </div>
              <div className="spacer-xs"></div>
              <div className="spacer-small"></div>
              <div className="w-full px-8">
                <div className="w-full h-[390px] flex flex-col justify-start items-start border-t-[1px] border-l-[1px] border-r-[1px] border-blue-200 rounded-tl-3xl rounded-tr-3xl overflow-auto shadow-xl">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="font-[semi-bold] text-[20px]">
                        <th className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                          Date
                        </th>
                        <th className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                          Type
                        </th>
                        <th className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                          Result
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchHistory.length > 0 ? (
                        matchHistory.map((match, index) => (
                          <tr
                            key={index}
                            className={`text-[20px] ${
                              index % 2 === 0
                                ? "bg-blue-100/60"
                                : "bg-transparent"
                            }`}
                          >
                            <td className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                              {new Date(match.date).toLocaleDateString()}
                            </td>
                            <td className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                              {match.mode}
                            </td>
                            <td
                              className={`w-[24%] py-6 font-[mighty] tracking-wider font-semibold ${
                                match.result === "Win"
                                  ? "text-green-400"
                                  : match.result === "Loss"
                                  ? "text-red-400"
                                  : "text-blue-950"
                              }`}
                            >
                              {match.result}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            className="p-2 text-center text-gray-400"
                          >
                            No match history found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="spacer-medium"></div>
          <div className="spacer-medium"></div>

          {/* <div className="w-full flex justify-start items-center py-20">
            <div className="flex flex-col gap-8 items-start">
              <Link to="/admin">
                <div className="cursor-pointer text-5xl text-gray-800 font-[vip-bold] hover:text-blue-600 skew-y-6 hover:skew-y-0">
                  Admin
                </div>
              </Link>
              <div
                className="flex gap-8 items-center cursor-pointer text-5xl text-gray-800 font-[vip-bold] hover:text-red-600 skew-y-6 hover:skew-y-0"
                onClick={handleLogout}
              >
                <span>Sign out</span>
              </div>
            </div>
          </div> */}
          {/* {active === "Lectures" && (
            <div className="w-[666px] h-[612px] flex flex-wrap justify-start items-start">
              <span className="text-[32px] text-blue-700 px-4">
                Lecture Links
              </span>
            </div>
          )}
          {active === "Leaderboards" && (
            
          )}
          {active === "History" && (
            <div className="w-[666px] h-[612px] flex flex-col justify-start items-start">
              <span className="text-[32px] text-gray-700">Match History</span>

              <div className="spacer-small"></div>
              <div className="w-full h-[600px] bg-gray-700 p-4 rounded-lg shadow-lg overflow-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-500">
                      <th className="p-2">Date</th>
                      <th className="p-2">Type</th>
                      <th className="p-2">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchHistory.length > 0 ? (
                      matchHistory.map((match, index) => (
                        <tr key={index} className="border-gray-600">
                          <td className="p-2">
                            {new Date(match.date).toLocaleDateString()}
                          </td>
                          <td className="p-2">{match.mode}</td>
                          <td
                            className={`p-2 font-semibold ${
                              match.result === "Win"
                                ? "text-green-400"
                                : match.result === "Loss"
                                ? "text-red-400"
                                : "text-gray-400"
                            }`}
                          >
                            {match.result}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="p-2 text-center text-gray-400"
                        >
                          No match history found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
