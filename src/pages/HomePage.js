import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";
import { api } from "../api/axios";
import {
  BsBookmarkStar,
  BsClockHistory,
  BsController,
  BsFilter,
  BsTrophy,
} from "react-icons/bs";
import controller from "../assets/images/controller.png";
import folder from "../assets/images/folder.png";
import trophy from "../assets/images/trophy.png";
import clock from "../assets/images/clock.png";
import { Link, useNavigate } from "react-router-dom";
import StarsCanvas from "../components/StarsCanvas";

import crown from "../assets/images/crown.png";
import rationalfunctions from "../assets/images/rational-functions-thumbnail.jpg";
import rationalinequalities from "../assets/images/rational-inequalities-thumbnail.jpg";

import { BsYoutube } from "react-icons/bs";
import OtherMatrixRain from "../utils/OtherMatrixRain";

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
      "This video is a secondary part and a continuation of the first rational inequalities video.",
  },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [leaderboard, setLeaderboard] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);
  const [videoLink, setVideoLink] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState("");

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchLeaderboard();
      fetchMatchHistory();
    }
  }, [user]);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get("/singleplayer/leaderboard");
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
            className="absolute top-1 right-1 xl:top-4 xl:right-20 text-white text-4xl"
          >
            &times;
          </button>
          <div className="max-w-4xl w-full max-h-[80%] h-full">
            <ReactPlayer url={videoLink} width="100%" height="100%" />
          </div>
        </div>
      )}
      <div className="spacer-small"></div>
      <div className="spacer-small"></div>
      <div className="spacer-medium"></div>
      <div className="w-full flex items-start justify-center">
        <div className="w-full xl:max-w-[1336px] flex flex-col items-center justify-center">
          <div className="w-full flex flex-wrap justify-between items-center gap-16 px-4 xl:px-0">
            <div className="flex justify-center items-center gap-4">
              <span className="text-[56px] font-bold text-6xl text-gray-900 font-[mighty] tracking-wide">
                Mathematrix
              </span>
            </div>
            <div className="flex justify-end items-center gap-8">
              <div
                className="cursor-pointer pl-2 pr-5 py-2 flex justify-center items-center border-[1px] border-gray-300 rounded-[48px] gap-4 group hover:bg-blue-500 hover:border-blue-500 bg-white"
                onClick={() => handleLogout()}
              >
                <div className="font-[vip-bold] flex justify-center items-center w-[50px] h-[50px] font-[mighty] text-white group-hover:text-blue-600 group-hover:bg-white text-2xl rounded-[50%] bg-blue-500">
                  {user.username.slice(0, 1).toUpperCase()}
                </div>
                <span className="font-[vip-bold] text-[22px] text-blue-900 group-hover:text-white">
                  Log out
                </span>
              </div>
            </div>
          </div>
          <div className="spacer-small"></div>
          <div className="spacer-small"></div>
          <div className="spacer-medium"></div>
          <div className="w-full flex flex-wrap justify-center items-start gap-4 xl:gap-8 px-4 xl:px-0">
            <Link to="/singleplayer" className="w-full md:w-[fit-content]">
              <div className="cursor-pointer relative w-full md:w-[310px] h-[310px] md:h-[290px] bg-blue-500 rounded-3xl shadow-2xl shadow-sky-500/50 group hover:bg-white/20 hover:shadow-sky-100/50 hover:border-[1px] border-blue-300 transition-all duration-500 overflow-hidden xl:overflow-visible">
                <div className="absolute -top-8 w-full left-24 xl:left-14 text-white/10 text-[250px] group-hover:text-blue-600 group-hover:rotate-[40deg] group-hover:-translate-x-10 transition-all duration-500 ease-in-out">
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
              } cursor-pointer relative w-full md:w-[310px] h-[310px] md:h-[290px] rounded-3xl shadow-2xl group text-white hover:bg-white/20 hover:shadow-sky-100/50 hover:border-[1px] hover:border-blue-300 transition-all duration-500 overflow-hidden xl:overflow-visible`}
              onClick={() => setActive("Lectures")}
            >
              <div className="absolute -top-8 w-full left-24 xl:left-14 text-white/10 text-[240px] group-hover:text-blue-600 group-hover:rotate-[18deg] group-hover:-translate-x-10 transition-all duration-500 ease-in-out">
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
              } cursor-pointer relative w-full md:w-[310px] h-[310px] md:h-[290px] rounded-3xl shadow-2xl group text-white hover:bg-white/20 hover:shadow-sky-100/50 hover:border-[1px] hover:border-blue-300 transition-all duration-500 overflow-hidden xl:overflow-visible`}
              onClick={() => setActive("Leaderboards")}
            >
              <div className="absolute -top-8 w-full left-24 xl:left-14 text-white/10 text-[240px] group-hover:text-blue-600 group-hover:rotate-[18deg] group-hover:-translate-x-10 transition-all duration-500 ease-in-out">
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
              } cursor-pointer relative w-full md:w-[310px] h-[310px] md:h-[290px] rounded-3xl shadow-2xl group text-white hover:bg-white/20 hover:shadow-sky-100/50 hover:border-[1px] hover:border-blue-300 transition-all duration-500 overflow-hidden xl:overflow-visible`}
              onClick={() => setActive("History")}
            >
              <div className="absolute -top-8 w-full left-24 xl:left-14 text-white/10 text-[240px] group-hover:text-blue-600 group-hover:rotate-[18deg] group-hover:-translate-x-10 transition-all duration-500 ease-in-out">
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
            } w-full xl:w-[1336px] flex flex-col justify-start items-start xl:border-[1px] border-blue-300 pt-8 pb-0 rounded-3xl xl:bg-gradient-to-b from-white to-[#efffff]`}
          >
            <div className="w-full flex-wrap xl:flex-nowrap flex justify-between items-center px-8 gap-4">
              <span className="text-[33px] md:text-[38px] font-[vip-regular] text-blue-600">
                Lectures
              </span>
              <div className="w-full xl:w-[fit-content] relative">
                <input
                  name="search"
                  className="w-full xl:w-[274px] h-[50px] border-[1px] border-blue-300 px-4 focus:outline-none focus:border-[2px] focus:border-blue-500 rounded-[10px] font-[tarrgethalf] text-blue-800 tracking-wider"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <BsFilter
                  size={26}
                  className="absolute top-[12px] right-3 text-blue-500"
                />
              </div>
            </div>
            <div className="spacer-small"></div>
            <div className="spacer-medium"></div>
            <div className="w-full flex flex-wrap xl:flex-nowrap justify-start items-start gap-8 px-8">
              {filteredLectures.length > 0 ? (
                filteredLectures?.map((lecture) => (
                  <div
                    key={lecture.name}
                    className="w-full xl:w-[445px] flex flex-col justify-start items-start group relative"
                    onClick={() => handleVideoPlayer(lecture.link)}
                  >
                    <div
                      className="
                relative cursor-pointer"
                    >
                      <img
                        src={lecture.thumbnail}
                        className="cursor-pointer aspect-[3/2] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-xl shadow-sky-500/10"
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
                        <div className="cursor-pointer w-[fit-content] flex justify-center items-center gap-2 p-2 bg-white text-[14px] text-red-500 rounded-[50%] hover:border-[1px] hover:bg-red-500 hover:text-white hover:border-red-500">
                          <BsYoutube size={18} />
                        </div>
                      </a>
                    </div>
                    <div className="spacer-small"></div>
                    <div className="w-full flex flex-wrap justify-start items-start gap-2">
                      <div className="cursor-pointer w-[fit-content] flex justify-center items-center py-1 px-3 gap-2 border-[1px] border-gray-300 bg-white text-[14px] text-[#282828] hover:border-[#282828] hover:bg-[#282828] hover:text-white rounded-[4px]">
                        {/* <FaReact size={16} /> */}
                        <div className="mt-[2px] tracking-wide">Core</div>
                      </div>
                      <div className="cursor-pointer w-[fit-content] flex justify-center items-center py-1 px-3 gap-2 border-[1px] border-gray-300 bg-white text-[14px] text-[#282828] hover:border-[#282828] hover:bg-[#282828] hover:text-white rounded-[4px]">
                        {/* <FaJava size={16} /> */}
                        <div className="mt-[2px] tracking-wide">Gen Math</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex justify-center items-center">
                  <div className="px-4 py-20 text-center text-[18px] text-red-500 font-[tarrget3d]">
                    No lectures available
                  </div>
                </div>
              )}
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
            } w-full xl:w-[1336px] flex flex-col justify-start items-start pt-8 pb-0 xl:border-[1px] border-blue-300 rounded-3xl xl:bg-gradient-to-b from-white to-blue-300/10`}
          >
            <div className="text-[33px] md:text-[38px] font-[vip-regular] text-blue-600 px-8">
              Leaderboards
            </div>
            <div className="spacer-medium"></div>

            <div className="w-full flex flex-wrap flex-col justify-center items-center xl:px-8">
              {leaderboard.slice(0, 1).map((player, index) => (
                <div
                  key={player._id}
                  className="w-full flex flex-wrap items-center justify-center relative leading-none gap-4 xl:gap-8 py-14 xl:rounded-3xl shadow-md shadow-gray-300/10 border-[1px] border-blue-200 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[192px]">
                    <OtherMatrixRain />
                  </div>
                  <img
                    src={crown}
                    alt=""
                    className="hidden xl:block w-[90px] -mt-[16px] z-20"
                  />
                  <span className="xl:whitespace-nowrap font-[vip-bold] text-[32px] xl:text-[64px] text-yellow-600 inline-block z-20">
                    {index + 1}st
                  </span>
                  <span className="xl:whitespace-nowrap text-center font-[vip-bold] text-[32px] xl:text-[64px] text-yellow-950 inline-block z-20">
                    {player._id}
                  </span>
                  <div className="flex justify-center items-center">
                    <span className="whitespace-nowrap text-center font-[vip-bold] text-[32px] xl:text-[48px] text-blue-600 inline-block z-20">
                      {player.totalCorrect}
                    </span>
                    <span className="text-[32px] text-yellow-950 font-[vip-bold] z-20">
                      -
                    </span>
                    <span className="whitespace-nowrap text-center font-[vip-bold] text-[32px] xl:text-[48px] text-red-600 inline-block z-20">
                      {player.totalIncorrect}
                    </span>
                  </div>
                  <span className="xl:whitespace-nowrap font-[vip-bold] text-[32px] xl:text-[64px] text-blue-950 inline-block z-20">
                    {player.elo}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full flex flex-wrap xl:flex-nowrap justify-center items-center gap-8 xl:gap-2 py-8 xl:py-16">
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
                      className={`whitespace-nowrap font-[mighty] text-[32px] xl:text-[48px] ${rankColor} inline-block`}
                    >
                      {rank}
                    </span>
                    <span className="whitespace-nowrap text-center font-[mighty] text-[32px] xl:text-[48px] text-yellow-950 inline-block">
                      {player._id}
                    </span>
                    <div className="flex justify-center items-center">
                      <span className="whitespace-nowrap text-center font-[mighty] text-[32px] xl:text-[48px] text-blue-600 inline-block">
                        {player.totalCorrect}
                      </span>
                      <span className="text-[32px] text-yellow-950 font-[mighty]">
                        -
                      </span>
                      <span className="whitespace-nowrap text-center font-[mighty] text-[32px] xl:text-[48px] text-red-600 inline-block">
                        {player.totalIncorrect}
                      </span>
                    </div>
                    <span className="whitespace-nowrap font-[mighty] text-[32px] xl:text-[48px] text-blue-950 inline-block">
                      {player.elo}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="w-full px-0 xl:px-8">
              <div className="w-full h-[624px] flex flex-col justify-start items-start border-t-[1px] xl:border-l-[1px] border-r-[1px] border-blue-200 xl:rounded-tl-3xl xl:rounded-tr-3xl overflow-auto shadow-xl">
                <table className="w-full text-center">
                  <thead>
                    <tr className="text-[16px] xl:text-[20px]">
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
                          className={`text-[16px] xl:text-[20px] ${
                            index % 2 === 0 ? "bg-[#efffff]" : "bg-transparent"
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
                            {player.elo}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div className="w-full flex justify-center items-center">
                        <div className="px-4 py-20 text-center text-[18px] text-red-500 font-[tarrget3d]">
                          No leaderboard data available
                        </div>
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* History contents */}
          <div
            className={`${
              active === "History" ? "block" : "hidden"
            } w-full xl:w-[1336px] flex flex-col justify-start items-start xl:border-[1px] border-blue-300 pt-8 pb-0 rounded-3xl bg-gradient-to-b from-white to-blue-300/10`}
          >
            <div className="text-[33px] md:text-[38px] font-[vip-regular] text-blue-600 px-8">
              History
            </div>
            <div className="spacer-medium"></div>
            <div className="w-full flex flex-wrap flex-col justify-center items-center">
              <div className="w-full flex flex-wrap flex-col justify-center items-center px-0 xl:px-8">
                {matchHistory.slice(0, 1).map((match, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-wrap items-center justify-center relative leading-none gap-2 xl:gap-8 py-14 bg-blue-100/30 xl:rounded-3xl shadow-md shadow-gray-300/10 border-[1px] border-blue-200 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-[192px]">
                      <OtherMatrixRain />
                    </div>
                    <span className="whitespace-nowrap font-[vip-bold] text-[24px] xl:text-[56px] text-yellow-600 inline-block z-20">
                      {new Date(match.date).toLocaleDateString()}
                    </span>
                    <span className="whitespace-nowrap text-center font-[vip-bold] text-[24px] xl:text-[56px] text-yellow-950 inline-block z-20">
                      {match.mode}
                    </span>
                    <span className="whitespace-nowrap font-[vip-bold] text-[24px] xl:text-[56px] text-blue-950 inline-block z-20">
                      {match.result}
                    </span>
                  </div>
                ))}
              </div>

              <div className="spacer-xs"></div>
              <div className="spacer-small"></div>
              <div className="w-full px-0 xl:px-8">
                <div className="w-full h-[624px] flex flex-col justify-start items-start border-t-[1px] xl:border-l-[1px] border-r-[1px] border-blue-200 xl:rounded-tl-3xl xl:rounded-tr-3xl overflow-auto shadow-xl">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="text-[16px] xl:text-[20px]">
                        <th className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                          Date
                        </th>
                        <th className="w-[20%] py-6 font-[mighty] tracking-wider text-blue-600">
                          Time
                        </th>
                        <th className="w-[20%] py-6 font-[mighty] tracking-wider text-red-600">
                          Mode
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
                            className={`text-[16px] xl:text-[20px] ${
                              index % 2 === 0
                                ? "bg-[#efffff]"
                                : "bg-transparent"
                            }`}
                          >
                            <td className="w-[20%] py-6 font-[mighty] tracking-wider text-yellow-950">
                              {new Date(match.date).toLocaleDateString()}
                            </td>
                            <td className="w-[20%] py-6 font-[mighty] tracking-wider text-blue-600">
                              {new Date(match.date).toLocaleTimeString(
                                "en-US",
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </td>
                            <td className="w-[20%] py-6 font-[mighty] tracking-wider text-red-600">
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
                        <div className="w-full flex justify-center items-center">
                          <div className="px-4 py-20 text-center text-[18px] text-red-500 font-[tarrget3d]">
                            No match history found
                          </div>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="spacer-medium hidden xl:block"></div>
          <div className="spacer-medium hidden xl:block"></div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
