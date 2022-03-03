import Home from "./Pages/Home";
import Login from "./Pages/Login";
import RegistrationBasicInfo from "./Pages/RegistrationBasicInfo";
import RegistrationInterests from "./Pages/RegistrationInterests";
import RegistrationMoreDetails from "./Pages/RegistrationMoreDetails";
import UserAccountPage from "./Pages/UserAccountPage"
import ShortlistPage from "./Pages/ShortlistPage"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PAGES from "./pageRoute";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const currentUser = useSelector((state) => state.user.value);
  useEffect(() => {}, [currentUser]);
  return (
    <Router>
      <Routes>
        <Route path={PAGES.homePage} element={<Home />} />

        <Route
          path={PAGES.loginPage}
          element={currentUser.username ? <Navigate to="/" /> : <Login />}
        />
        {/* <Route exact path="register" element={<RegistrationBasicInfo />}> */}
        <Route
          path={PAGES.registerPage1}
          element={
            currentUser.username ? (
              <Navigate to="/" />
            ) : (
              <RegistrationBasicInfo />
            )
          }
        />
        <Route
          path={PAGES.registerPage2}
          element={
            currentUser.username ? (
              <Navigate to="/" />
            ) : (
              <RegistrationMoreDetails />
            )
          }
        />
        <Route
          path={PAGES.registerPage3}
          element={
            currentUser.username ? (
              <Navigate to="/" />
            ) : (
              <RegistrationInterests />
            )
          }
        />

      <Route
          path={PAGES.accountPage}
          element={
            currentUser.username ? (
              <UserAccountPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path={PAGES.shortlistPage}
          element={
            currentUser.username ? (
              <ShortlistPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        
      </Routes>
    </Router>
  );
};

export default App;
