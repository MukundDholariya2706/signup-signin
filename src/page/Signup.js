import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLoginButtonImplicit } from "../components/GoogleLoginButtonImplicit";
import { FacebookLoginButton } from "../components/FacebookLoginButton";
import { LinkedinLoginButton } from "../components/LinkedinLoginButton";
import { CustomInput } from "../components/CustomInput";
import axios from "axios";
import toast from "react-hot-toast";
import { GithubLoginButton } from "../components/GithubLoginButton";

export const Signup = () => {
  const svgIcon = `<svg
  class="w-4 h-4 text-gray-500 dark:text-gray-400"
  aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 20 20"
>
  <path
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
  />
</svg>`;

  const userIcon = `<svg class="w-4 h-4 text-gray-500 dark:text-gray-400" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32" xml:space="preserve"><style>.st1{fill:#333}</style><path class="st1" d="M25.838 31H6.162a3.957 3.957 0 0 1-3.245-1.661 3.956 3.956 0 0 1-.549-3.604l.704-2.113a6.034 6.034 0 0 1 4.966-4.059C10.131 19.307 13.211 19 16 19c2.788 0 5.869.307 7.963.563a6.032 6.032 0 0 1 4.965 4.059l.704 2.113a3.954 3.954 0 0 1-.55 3.604A3.955 3.955 0 0 1 25.838 31zM16 21c-2.688 0-5.681.298-7.718.549a4.02 4.02 0 0 0-3.312 2.706l-.704 2.112c-.206.618-.106 1.274.274 1.802S5.511 29 6.162 29h19.676a1.98 1.98 0 0 0 1.622-.83c.381-.528.48-1.185.275-1.803l-.704-2.112a4.02 4.02 0 0 0-3.312-2.706C21.681 21.298 18.687 21 16 21zM16 18c-4.687 0-8.5-3.813-8.5-8.5S11.313 1 16 1c4.687 0 8.5 3.813 8.5 8.5S20.687 18 16 18zm0-15c-3.584 0-6.5 2.916-6.5 6.5S12.416 16 16 16s6.5-2.916 6.5-6.5S19.584 3 16 3z"/><path d="M12.04 10.54c-.543 0-.988-.435-1-.98a4.964 4.964 0 0 1 1.394-3.564 4.968 4.968 0 0 1 3.505-1.535c.562.01 1.009.428 1.02.98a1 1 0 0 1-.98 1.02 2.982 2.982 0 0 0-2.103.92 2.981 2.981 0 0 0-.836 2.139 1 1 0 0 1-.98 1.02h-.02z" style="fill:#008ad0"/></svg>`;
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
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
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

    if (name === "first_name") {
      if (value.trim() === "") {
        error = "First name is required";
      } else if (value.length < 3) {
        error = "First name must be at least 3 characters";
      }
    }
    if (name === "last_name") {
      if (value.trim() === "") {
        error = "Last name is required";
      } else if (value.length < 3) {
        error = "Last name must be at least 3 characters";
      }
    }
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
    if (name === "confirm_password") {
      if (value.trim() === "") {
        error = "Confirm Password is required";
      } else if (value !== formData.password) {
        error = "Passwords do not match";
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

    const { first_name, last_name, email, password, confirm_password } =
      formData;

    validateField("first_name", first_name);
    validateField("last_name", last_name);
    validateField("email", email);
    validateField("password", password);
    validateField("confirm_password", confirm_password);

    const isInvalid = areFieldsEmpty(formData);

    // Form is in invalid return;
    if (isInvalid) return;

    // Form is valid - API call for save data
    saveUserData(formData);
  };

  const saveUserData = async (payload) => {
    try {
      await axios
        .post("http://localhost:3001/auth/signup", payload)
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
  });

  return (
    <div className="border border-white rounded-lg p-8 bg-white">
      <div className="">
        <div className="font-semibold mb-4">Signup</div>
        <div className="flex flex-col lg:flex-row items-center gap-1">
          <GithubLoginButton />
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
                  type={"text"}
                  label={"First Name"}
                  placeholder="Enter your first name"
                  onChange={handleOnChange}
                  name="first_name"
                  prefix={userIcon}
                  error={errors.first_name}
                />
              </div>
              <div className="">
                <CustomInput
                  type={"text"}
                  label={"Last name"}
                  placeholder="Enter your last name"
                  onChange={handleOnChange}
                  name="last_name"
                  prefix={userIcon}
                  error={errors.last_name}
                />
              </div>
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
              <div className="">
                <CustomInput
                  type={"password"}
                  label={"Confirm password"}
                  placeholder="Enter your confirm password"
                  onChange={handleOnChange}
                  name="confirm_password"
                  suffix={true}
                  prefix={lockIcon}
                  error={errors.confirm_password}
                />
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
