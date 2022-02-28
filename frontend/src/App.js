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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="login" element={<Login />} />
        {/* <Route exact path="register" element={<RegistrationBasicInfo />}> */}
        <Route path="register" element={<RegistrationBasicInfo />} />
        <Route path="register/2" element={<RegistrationMoreDetails />} />
        <Route path="register/3" element={<RegistrationInterests />} />
      </Routes>
    </Router>
  );
};

export default App;
