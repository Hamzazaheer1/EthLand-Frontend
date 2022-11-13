import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Utils/auth-context";

const Logout = () => {
  const auth = useContext(AuthContext);
  const Navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("superadmin");
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    auth.logout();
    Navigate("/");
  }, [Navigate, auth]);
  return null;
};

export default Logout;
