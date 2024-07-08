import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const GoogleLoginButton = () => {
  const navigate = useNavigate();

  // Simple Login
  const handleLoginSuccess = async (response) => {
    const { credential } = response;
    try {
      await axios
        .post("http://localhost:3001/auth/google-signup-jwt", {
          credential,
        })
        .then((response) => {
          let { data } = response;
          if (data?.status) {
            const { token, user } = data.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard");
          }
        });
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleLoginError = (error) => {};

  return (
    <>
      <div>Google Login</div>

      <div className="flex flex-col">
        <div>
          <GoogleLogin
            auto_select={false}
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>
      </div>
    </>
  );
};
