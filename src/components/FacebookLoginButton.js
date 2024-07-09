import React from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const FacebookLoginButton = ({ buttonLabel = "" }) => {
  const navigate = useNavigate();

  const responseFacebook = async (response) => {
    try {
      await axios
        .post("http://localhost:3001/auth/facebook-signup", {
          email: response.email,
          first_name: response.first_name,
          last_name: response.last_name,
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

  const failureFacebook = async (error) => {
    console.log(error, "error");
  };

  return (
    <div>
      <FacebookLogin
        textButton={buttonLabel}
        appId={process.env.REACT_APP_FACEBOOK_APPID}
        size="small"
        autoLoad={false}
        fields="name,email,first_name,last_name"
        callback={responseFacebook}
        onFailure={failureFacebook}
        cssClass="flex items-center bg-white border rounded-lg px-2 text-black font-semibold text-[14px] h-[40px]"
        icon={`fa-facebook w-[18px] text-blue-700 ${buttonLabel ? "pr-2" : ""}`}
      />
    </div>
  );
};
