import React from "react";
import RiseLoader from "react-spinners/RiseLoader";

const Loading = ({ color, loading }) => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <RiseLoader
        color={color}
        loading={loading}
        size={75}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
