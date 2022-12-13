import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("superadmin")) {
      Navigate("/superadminpanel");
    } else if (localStorage.getItem("admin")) {
      Navigate("/adminpanel");
    } else if (localStorage.getItem("user")) {
      Navigate("/userpanel");
    } else {
      Navigate("/");
    }
  }, [Navigate]);
  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
