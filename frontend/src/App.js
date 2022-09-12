import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Campsite from "./pages/Campsite";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import NewCampsite from "./pages/NewCampsite";
import Edit from "./pages/Edit";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/newcampsite" element={<NewCampsite />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/campsites" element={<Campsite />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
        <Footer />
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </UserProvider>
  );
}

export default App;
