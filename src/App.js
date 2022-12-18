import { useContext, useCallback, useState } from "react";
import { AuthContext } from "./Utils/auth-context";
import { themeContext } from "./Context";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Shared/Homepage/Homepage";
import AboutUs from "./Shared/AboutUs/AboutUs";
import ContactUs from "./Shared/ContactUs/ContactUs";
import HelpNav from "./Shared/Help/HelpNav";
import Blockchain from "./Shared/Blockchain/Blockchain";
import GotoTop from "./Utils/GotoTop/GotoTop";
import AdminPanel from "./Admin/AdminPanel";
import SuperAdminPanel from "./SuperAdmin/SuperAdminPanel";
import UserPanel from "./User/UserPanel/UserPanel";
import Login from "./Shared/Login/Login";
import Signup from "./User/Signup/Signup";
import TxData from "./Shared/Blockchain/Pages/TxData";
import NavigationBar from "./Shared/NavigationBar/NavigationBar";
import Footer from "./Shared/Footer/Footer";
import LandDetailedInfo from "./User/UserPanel/Pages/LandDetailedInfo/LandDetailedInfo";
import LandDetailedInfoByAdmin from "./Admin/Pages/LandDetailedInfo/LandDetailedInfoByAdmin";
import Logout from "./Shared/Logout/Logout";
import UsersDetailedInfo from "./Admin/Pages/ManageUsers/UsersDetailedInfo";
import AdminDetailedInfo from "./SuperAdmin/Pages/AdminDetailedInfo/AdminDetailedInfo";
import PurchaseableLandInfo from "./User/UserPanel/Pages/PurchaseAbleLand/PurchaseableLandInfo";
import LandTransfer from "./Admin/Pages/LandTransfer/LandTransfer";
import "./App.css";

function App() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  return (
    <div
      className="App"
      style={{
        background: darkMode ? "#212529" : "",
        color: darkMode ? "white" : "",
      }}
    >
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/help-panel" element={<HelpNav />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/superadminpanel" element={<SuperAdminPanel />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/userpanel" element={<UserPanel />} />
          <Route path="/txdata/:blockid" element={<TxData />} />
          <Route path="/detailed-info/:landid" element={<LandDetailedInfo />} />
          <Route
            path="/purchaseableland-info/:landid"
            element={<PurchaseableLandInfo />}
          />
          <Route
            path="/detailed-user-info/:addr"
            element={<UsersDetailedInfo />}
          />
          <Route
            path="/detailed-admin-info/:addr"
            element={<AdminDetailedInfo />}
          />
          <Route
            path="/detailedlandinfobyadmin/:landid"
            element={<LandDetailedInfoByAdmin />}
          />
          <Route path="/landtransfer/:landid" element={<LandTransfer />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer className="sticky-footer" />
        <GotoTop />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
