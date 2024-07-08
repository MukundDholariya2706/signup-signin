import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLoginButtonImplicit } from "../components/GoogleLoginButtonImplicit";
import { FacebookLoginButton } from "../components/FacebookLoginButton";
import { LinkedinLoginButton } from "../components/LinkedinLoginButton";

export const Signup = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) navigate("/dashboard");
  });

  return (
    <div className="flex">
      {/* <GoogleLoginButton /> */}
      <GoogleLoginButtonImplicit />
      <FacebookLoginButton />
      <LinkedinLoginButton />
    </div>
  );
};
