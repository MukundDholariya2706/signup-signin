import { googleLogout } from "@react-oauth/google";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/");
  }, []);

  const logoutUser = () => {
    localStorage.clear();
    googleLogout();
    navigate("/");
  }

  return (
    <>
      <div>Dashboard Page</div>
      <div>
        Welcome, {userDetails?.first_name} {userDetails?.last_name}
      </div>
      <div>
        <button onClick={logoutUser}>Logout</button>
      </div>
    </>
  );
};
