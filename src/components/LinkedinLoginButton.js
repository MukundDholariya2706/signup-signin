import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

export const LinkedinLoginButton = ({ buttonLabel }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get("code");

  useEffect(() => {
    // Effect if get code in params
    if (code) handleLogin(code);
  }, [code]);

  const handleLogin = async (code) => {
    // Exchange the code for an access token

    await axios
      .post("http://localhost:3001/auth/linkdin-signup", {
        code,
      })
      .then((response) => {
        let { data } = response;
        if (data?.status) {
          const { token, user } = data.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <a
        href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKDIN_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_LINKDIN_REDIRECT_URL}&scope=openid%20email%20profile`}
        className="h-[40px] w-fit cursor-pointer flex items-center bg-white border rounded-lg px-2"
      >
        <div className={`h-[18px] w-[18px] ${buttonLabel ? "mr-[8px]" : ""}`}>
          {/* Linkdin Logo */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path
              fill="#0288D1"
              d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
            />
            <path
              fill="#FFF"
              d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
            />
          </svg>
        </div>

        {/* Button Text */}
        <span className="text-black text-sm overflow-hidden text-ellipsis font-medium">
          {buttonLabel}
        </span>
      </a>
    </>
  );
};
