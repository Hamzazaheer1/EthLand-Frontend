import React from "react";
import "./GotoTop.css";
import { FaArrowUp } from "react-icons/fa";

const GotoTop = () => {
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div className="Top">
      <div className="top-btn" onClick={goToBtn}>
        <FaArrowUp className="top-btn--icon" />
      </div>
    </div>
  );
};

export default GotoTop;
