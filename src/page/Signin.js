import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../components/CustomInput";
import { FacebookLoginButton } from "../components/FacebookLoginButton";
import { GoogleLoginButtonImplicit } from "../components/GoogleLoginButtonImplicit";
import { LinkedinLoginButton } from "../components/LinkedinLoginButton";

export const Signin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value.trim() === "") {
        error = "Email is required";
      } else if (!emailRegex.test(value)) {
        error = "Email is not valid";
      }
    }

    if (name === "password") {
      if (value.trim() === "") {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Validation Check - Start
  const areFieldsEmpty = (fields) => {
    for (let key in fields) {
      const value = fields[key];
      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "")
      ) {
        return true; // Found an empty field
      }
    }
    return false; // No empty fields found
  };
  // Validation Check - End

  // Handle Submit Funcation - Start
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    validateField("email", email);
    validateField("password", password);

    const isInvalid = areFieldsEmpty(formData);

    // Form is in invalid return;
    if (isInvalid) return;

    // Form is valid - API call for save data
    saveUserData(formData);
  };

  const saveUserData = async (payload) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        formData
      );
      console.log(response, "response");
    } catch (error) {
      console.error("Failed to save userdata:", error);
    }
  };

  // Handle Submit Funcation - End

  useEffect(() => {
    if (token) navigate("/dashboard");
  });

  return (
    <div className="border border-white rounded-lg p-8 bg-white">
      <div className="flex flex-col">
        <div className="font-semibold mb-4">Sign In</div>
        <div className="flex gap-1 mb-1 justify-center ">
          <div>
            <GoogleLoginButtonImplicit />
          </div>
          <div>
            <FacebookLoginButton />
          </div>
          <div>
            <LinkedinLoginButton />
          </div>
        </div>
        <div className="w-[310px] sm:w-[416px] flex items-center justify-between">
          <div className="border border-[#9BA1B9] w-full"></div>
          <div className="bg-white p-2 text-[#9BA1B9]">OR</div>
          <div className="border border-[#9BA1B9] w-full"></div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="">
                <CustomInput
                  type={"email"}
                  // label={"Email"}
                  placeholder="Enter your email here"
                  onChange={handleOnChange}
                  name="email"
                  error={errors.email}
                />
              </div>
              <div className="">
                <CustomInput
                  type={"password"}
                  // label={"Password"}
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                  name="password"
                  suffix={true}
                  error={errors.password}
                />
              </div>
            </div>

            <div>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
