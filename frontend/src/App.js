import Home from "./Pages/Home";
import Login from "./Pages/Login";
import RegistrationBasicInfo from "./Pages/RegistrationBasicInfo";
import RegistrationInterests from "./Pages/RegistrationInterests";
import RegistrationMoreDetails from "./Pages/RegistrationMoreDetails";

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
          path={
            currentUser.username ? <Navigate to="/" /> : PAGES.registerPage3
          }
          element={<RegistrationInterests />}
        />
      </Routes>
    </Router>
  );
};

export default App;
