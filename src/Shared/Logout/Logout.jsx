import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("superadmin");
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    Navigate("/");
  }, []);
  return null;
};

export default Logout;
