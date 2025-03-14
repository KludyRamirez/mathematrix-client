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
import { ImBell } from "react-icons/im";

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
      <div className="w-full h-screen bg-gradient-to-b from-blue-100 to-blue-50 text-gray-800 flex items-center justify-center">
        <div className="w-[80%] flex flex-col items-center justify-center gap-20">
          <div className="w-full flex justify-between items-center">
            <span className="text-[48px] text-gray-800 font-[vip-bold]">
              Mathematrix
            </span>
            <div className="flex justify-end items-center">
              <ImBell size={48} />
              <div className=""></div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
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
              className="cursor-pointer relative w-[310px] h-[290px] bg-blue-500 rounded-3xl shadow-2xl shadow-sky-500/50 group hover:bg-white/20 hover:shadow-sky-100/50 hover:border-[1px] border-blue-300 transition-all duration-500"
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
              className="cursor-pointer relative w-[310px] h-[290px] bg-blue-500 rounded-3xl shadow-2xl shadow-sky-500/50 group hover:bg-white/20 hover:shadow-sky-100/50 hover:border-[1px] border-blue-300 transition-all duration-500"
              onClick={() => setActive("Leaderboards")}
            >
              <div className="absolute -top-8 w-full 2xl:left-20 left-14 text-white/10 text-[240px] group-hover:text-blue-600 group-hover:rotate-[18deg] group-hover:-translate-x-10 transition-all duration-500 ease-in-out">
                <BsTrophy />
              </div>

              <div className="absolute -top-12 left-16 w-[274px] text-white/10 text-[250px] hidden group-hover:block">
                <img src={trophy} alt="" className="" />
              </div>

              <p className="absolute bottom-4 left-5 w-full text-white text-[38px] font-[vip-regular] group-hover:text-blue-600 transition-colors duration-500">
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

          <div className="w-full flex justify-start items-center ">
            <div className="flex flex-col gap-4 items-start">
              <Link to="/admin">
                <div className="cursor-pointer text-[48px] text-gray-800 font-[vip-bold] hover:text-blue-600 skew-y-6 hover:skew-y-0">
                  Admin
                </div>
              </Link>
              <div
                className="flex gap-8 items-center cursor-pointer text-[48px] text-gray-800 font-[vip-bold] hover:text-red-600 skew-y-6 hover:skew-y-0"
                onClick={handleLogout}
              >
                <span>Sign out</span>
              </div>
            </div>
          </div>
          {/* {active === "Lectures" && (
            <div className="w-[666px] h-[612px] flex flex-wrap justify-start items-start">
              <span className="text-[32px] text-blue-700 px-4">
                Lecture Links
              </span>
            </div>
          )}
          {active === "Leaderboards" && (
            <div className="w-[666px] h-[612px] flex flex-col justify-start items-start">
              <span className="text-[32px] text-gray-700">Leaderboards</span>
              <div className="spacer-small"></div>
              <div className="w-full h-[600px] bg-gray-700 p-4 rounded-lg shadow-lg">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-500">
                      <th className="p-2">Rank</th>
                      <th className="p-2">Player</th>
                      <th className="p-2">Correct ✔ </th>
                      <th className="p-2">Incorrect ❌ </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.length > 0 ? (
                      leaderboard.map((player, index) => (
                        <tr key={player._id} className="border-gray-600">
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">{player._id}</td>
                          <td className="p-2 text-green-400">
                            {player.totalCorrect}
                          </td>
                          <td className="p-2 text-red-400">
                            {player.totalIncorrect}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="p-2 text-center text-gray-400"
                        >
                          No leaderboard data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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

        {/* <div
          className="cursor-pointer text-[64px] text-red-500 font-[semi-bold]"
          onClick={handleLogout}
        >
          Log out
        </div> */}
      </div>
    </>
  );
};

export default HomePage;
