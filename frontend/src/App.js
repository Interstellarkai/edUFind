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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={PAGES.homePage} element={<Home />} />

        <Route path={PAGES.loginPage} element={<Login />} />
        {/* <Route exact path="register" element={<RegistrationBasicInfo />}> */}
        <Route path={PAGES.registerPage1} element={<RegistrationBasicInfo />} />
        <Route
          path={PAGES.registerPage2}
          element={<RegistrationMoreDetails />}
        />
        <Route path={PAGES.registerPage3} element={<RegistrationInterests />} />
      </Routes>
    </Router>
  );
};

export default App;
