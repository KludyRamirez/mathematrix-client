import React, { useState } from "react";
import AdminBar from "../components/AdminBar";
import Question from "../admin/Question";

const AdminPage = () => {
  const [active, setActive] = useState("Question");

  return (
    <div className="w-full flex justify-start items-start">
      <AdminBar active={active} setActive={setActive} />
      {active === "Question" && <Question />}
    </div>
  );
};

export default AdminPage;
