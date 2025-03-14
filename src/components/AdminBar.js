import React from "react";
import { TbMathFunction } from "react-icons/tb";
import { VscLayoutMenubar } from "react-icons/vsc";
import { BsClockHistory, BsPersonPlus, BsQuestionCircle } from "react-icons/bs";

const AdminBar = ({ active, setActive }) => {
  return (
    <div className="w-[240px] h-[100vh]">
      <div className="w-full h-full flex flex-col justify-start items-center bg-[#191970]">
        <div className="w-full flex justify-start items-center gap-3 px-6 py-12">
          <TbMathFunction className="text-white" size={24} />
          <span className="text-white text-[18px] mt-1">Mathematrix</span>
        </div>

        {/* <div
          className="w-full cursor-pointer hover:bg-white/20"
          onClick={() => setActive("Dashboard")}
        >
          <div className="w-full flex justify-start items-center gap-3 px-6 py-4">
            <VscLayoutMenubar className="text-gray-300" size={24} />
            <span className="text-gray-300 text-[18px] mt-1">Dashboard</span>
          </div>
        </div>
        <div
          className="w-full cursor-pointer hover:bg-white/20"
          onClick={() => setActive("History")}
        >
          <div className="w-full flex justify-start items-center gap-3 px-6 py-4">
            <BsClockHistory className="text-gray-300" size={24} />
            <span className="text-gray-300 text-[18px] mt-1">History</span>
          </div>
        </div>
        <div
          className="w-full cursor-pointer hover:bg-white/20"
          onClick={() => setActive("Users")}
        >
          <div className="w-full flex justify-start items-center gap-3 px-6 py-4">
            <BsPersonPlus className="text-gray-300" size={24} />
            <span className="text-gray-300 text-[18px] mt-1">Users</span>
          </div>
        </div> */}
        <div
          className={`w-full cursor-pointer ${
            active === "Question"
              ? "bg-white/20 text-white"
              : "hover:bg-white/20 text-gray-300"
          }`}
          onClick={() => setActive("Question")}
        >
          <div className="w-full flex justify-start items-center gap-3 px-6 py-4">
            <BsQuestionCircle size={24} />
            <span className="text-[18px] mt-1">Question</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBar;
