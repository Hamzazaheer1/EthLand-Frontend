import { useContext } from "react";
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
import Protected from "./Utils/Protected";
import Logout from "./Shared/Logout/Logout";
import "./App.css";

function App() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div
      className="App"
      style={{
        background: darkMode ? "#212529" : "",
        color: darkMode ? "white" : "",
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
        <Route
          path="/adminpanel"
          element={<Protected Component={AdminPanel} />}
        />
        <Route path="/userpanel" element={<UserPanel />} />
        <Route path="/txdata/:blockid" element={<TxData />} />
        <Route path="/detailed-info/:landid" element={<LandDetailedInfo />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer className="sticky-footer" />
      <GotoTop />
    </div>
  );
}

export default App;
