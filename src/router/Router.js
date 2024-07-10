import { Route, Routes } from "react-router-dom";
import { Signup } from "../page/Signup";
import { Dashboard } from "../page/Dashboard";
import RootLayout from "../page/Root";
import { Signin } from "../page/Signin";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Signup />} />
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
