import { Route, Routes } from "react-router-dom";
import { Signup } from "../page/Signup";
import { Dashboard } from "../page/Dashboard";
import RootLayout from "../page/Root";
import { SignupHookForm } from "../page/SignupHookForm";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Signup />} />
        <Route path="/signup-hookform" element={<SignupHookForm />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
