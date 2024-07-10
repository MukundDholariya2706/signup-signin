import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../components/CustomInput";
import { FacebookLoginButton } from "../components/FacebookLoginButton";
import { GoogleLoginButtonImplicit } from "../components/GoogleLoginButtonImplicit";
import { LinkedinLoginButton } from "../components/LinkedinLoginButton";
import toast from "react-hot-toast";

export const Signin = () => {
  const emailIcon = `<svg class="w-4 h-4 text-gray-500 dark:text-gray-400" data-name="1-Email" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M29 4H3a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h26a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.72 2L16 14.77 3.72 6zM30 25a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.23l13.42 9.58a1 1 0 0 0 1.16 0L30 7.23z"/></svg>`;
  const lockIcon = `<svg fill="#000000" class="w-4 h-4 text-gray-500 dark:text-gray-400" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 330 330" xml:space="preserve">
<g id="XMLID_486_">
	<path id="XMLID_487_" d="M165,330c63.411,0,115-51.589,115-115c0-29.771-11.373-56.936-30-77.379V85c0-46.869-38.131-85-85-85
		S80.001,38.131,80.001,85v52.619C61.373,158.064,50,185.229,50,215C50,278.411,101.589,330,165,330z M180,219.986V240
		c0,8.284-6.716,15-15,15s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25
		C190,208.162,186.068,215.421,180,219.986z M110.001,85c0-30.327,24.673-55,54.999-55c30.327,0,55,24.673,55,55v29.029
		C203.652,105.088,184.91,100,165,100c-19.909,0-38.651,5.088-54.999,14.028V85z"/>
</g>
</svg>`;

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
      await axios
        .post("http://localhost:3001/auth/login", payload)
        .then((response) => {
          let { data } = response;
          if (data?.status) {
            toast.success(data?.message);
            const { token, user } = data.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard");
          }
        });
    } catch (error) {
      console.error("Failed to save userdata:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  // Handle Submit Funcation - End

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, []);

  return (
    <div className="border border-white rounded-lg p-8 bg-white">
      <div className="">
        <div className="font-semibold mb-4">SignIn</div>
        <div className="flex flex-col lg:flex-row items-center gap-1">
          <GoogleLoginButtonImplicit buttonLabel={"Continue with Google"} />
          <FacebookLoginButton buttonLabel={"Continue with Facebook"} />
          <LinkedinLoginButton buttonLabel={"Continue with LinkedIn"} />
        </div>
        <div className="flex items-center justify-between">
          <div className="border border-[#9BA1B9] w-full"></div>
          <div className="bg-white p-2 text-[#9BA1B9]">OR</div>
          <div className="border border-[#9BA1B9] w-full"></div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="space-y-5">
              <div className="">
                <CustomInput
                  type={"email"}
                  label={"Email"}
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                  name="email"
                  error={errors.email}
                  prefix={emailIcon}
                />
              </div>
              <div className="">
                <CustomInput
                  type={"password"}
                  label={"Password"}
                  placeholder="Enter your password"
                  onChange={handleOnChange}
                  name="password"
                  suffix={true}
                  prefix={lockIcon}
                  error={errors.password}
                />
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 
              focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
              text-sm px-5 py-2.5 text-center 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
