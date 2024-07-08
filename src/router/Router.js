import { Route, Routes } from "react-router-dom";
import { Signup } from "../page/Signup";
import { Dashboard } from "../page/Dashboard";
import RootLayout from "../page/Root";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
          <Route index element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
