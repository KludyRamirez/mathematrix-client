import React, { useEffect, useState } from "react";
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

import gym from "../assets/images/gym.png";
import crown from "../assets/images/crown.png";
import silvertrophy from "../assets/images/silver-trophy.png";

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [leaderboard, setLeaderboard] = useState([]);
  const [matchHistory, setMatchHistory] = useState([]);

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

  return (
    <>
      <StarsCanvas />
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
              <span className="text-[24px] font-[mighty] ">
                Note:{" "}
                <span className="font-[regular] text-red-500">
                  Currently under construction. Thank you !
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
                active === "Leaderboards" ? "block" : "block"
              } cursor-pointer relative w-[310px] h-[290px] bg-blue-500 rounded-3xl shadow-2xl shadow-sky-500/50 group hover:bg-white/20 hover:shadow-sky-100/50 hover:border-[1px] border-blue-300 transition-all duration-500`}
              onClick={() => setActive("Lectures")}
            >
              <div className="absolute -top-8 w-full left-16 text-white/10 text-[234px] group-hover:text-blue-600 group-hover:rotate-[12deg] group-hover:-translate-x-10 transition-all duration-500 ease-in-out">
                <BsBookmarkStar />
              </div>

              <div className="absolute -top-12 left-16 w-[274px] text-white/10 text-[250px] hidden group-hover:block">
                <img src={folder} alt="" className="" />
              </div>

              <p className="absolute bottom-4 left-5 w-full text-white text-[38px] font-[vip-regular] group-hover:text-blue-600 transition-colors duration-500">
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
                } absolute -top-12 left-16 w-[274px]`}
              >
                <img src={trophy} alt="" className="" />
              </div>

              <p className="absolute bottom-4 left-5 w-full text-[38px] font-[vip-regular] group-hover:text-blue-600">
                Boards
              </p>
            </div>

            <div
              className="cursor-pointer relative w-[310px] h-[290px] bg-blue-500 rounded-3xl shadow-2xl shadow-sky-500/50 group hover:bg-white/20 hover:shadow-sky-100/50 hover:border-[1px] border-blue-300 transition-all duration-500"
              onClick={() => setActive("History")}
            >
              <div className="absolute -top-8 w-full 2xl:left-20 left-14 text-white/10 text-[240px] group-hover:text-blue-600 group-hover:rotate-[18deg] group-hover:-translate-x-10 transition-all duration-500 ease-in-out">
                <BsClockHistory />
              </div>

              <div className="absolute -top-12 left-16 w-[274px] text-white/10 text-[250px] hidden group-hover:block">
                <img src={clock} alt="" className="" />
              </div>

              <p className="absolute bottom-4 left-5 w-full text-white text-[38px] font-[vip-regular] group-hover:text-blue-600 transition-colors duration-500">
                History
              </p>
            </div>
          </div>
          <div className="spacer-medium"></div>
          <div
            className={`${
              active === "Leaderboards" ? "block" : "hidden"
            } w-[1336px] flex flex-col justify-start items-start pt-8 pb-0 px-8 border-t-[1px] border-l-[1px] border-r-[1px] border-blue-300 rounded-tl-3xl rounded-tr-3xl bg-blue-300/10`}
          >
            <div className="text-[38px] font-[vip-regular] text-blue-600">
              Leaderboards
            </div>
            <div className="spacer-small"></div>
            <div className="spacer-medium"></div>
            <div className="w-full flex flex-col justify-center items-center gap-[60px]">
              <div className="w-[240px] flex flex-col justify-center items-center">
                <div className="w-full flex items-center justify-center relative leading-none gap-8">
                  <span className="whitespace-nowrap font-[semi-bold] text-[90px] text-yellow-500 inline-block">
                    1st
                  </span>
                  <img src={crown} alt="" className="w-[100px] -mt-[12px]" />
                  <span className="whitespace-nowrap text-center font-[mighty] tracking-wider text-[28px] text-yellow-950 pt-2 inline-block">
                    James Jameson
                  </span>
                  <span className="whitespace-nowrap font-[semi-bold] text-[90px] text-blue-950 inline-block">
                    1978
                  </span>
                </div>
              </div>
              <div className="w-full flex justify-center items-center gap-2">
                <div className="w-[50%] flex items-center justify-center relative leading-none gap-6">
                  <span className="whitespace-nowrap font-[semi-bold] text-[48px] text-gray-500 inline-block">
                    2nd
                  </span>
                  <img src={crown} alt="" className="w-[80px] -mt-[12px]" />
                  <span className="whitespace-nowrap text-center font-[regular] text-[24px] text-yellow-950 pt-2 inline-block">
                    Veronica Demition
                  </span>
                  <span className="whitespace-nowrap font-[semi-bold] text-[48px] text-blue-950 inline-block">
                    1690
                  </span>
                </div>
                <div className="w-[50%] flex items-center justify-center relative leading-none gap-6">
                  <span className="whitespace-nowrap font-[semi-bold] text-[48px] text-yellow-800 inline-block">
                    3rd
                  </span>
                  <img src={crown} alt="" className="w-[86px] -mt-[4px]" />
                  <span className="whitespace-nowrap text-center font-[regular] text-[24px] text-yellow-950 pt-2 inline-block">
                    Kludy Ramirez
                  </span>
                  <span className="whitespace-nowrap font-[semi-bold] text-[48px] text-blue-950 inline-block">
                    1570
                  </span>
                </div>
              </div>
              <div className="w-full border-t-[1px] border-l-[1px] border-r-[1px] border-blue-300 rounded-tl-3xl rounded-tr-3xl flex flex-col justify-start items-start overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white font-[semi-bold] text-[20px]">
                      <th className="px-6 py-4">Rank</th>
                      <th className="p-4">Player</th>
                      <th className="p-4">Correct</th>
                      <th className="p-4">Wrong</th>
                      <th className="p-4">MMR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.length > 0 ? (
                      leaderboard.map((player, index) => (
                        <tr
                          key={player._id}
                          className={`text-[18px] ${
                            index % 2 === 0 ? "bg-transparent" : "bg-white"
                          }`}
                        >
                          <td className="px-6 pt-4 pb-3">{index + 1}</td>
                          <td className="px-4 py-3">{player._id}</td>
                          <td className="px-4 py-3 text-blue-600">
                            {player.totalCorrect}
                          </td>
                          <td className="px-4 py-3 text-red-600">
                            {player.totalIncorrect}
                          </td>
                          <td className="px-4 py-3 text-red-600">
                            {player.mmr}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
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
