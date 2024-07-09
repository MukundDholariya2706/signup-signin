import React from "react";
import { useForm } from "react-hook-form";
import { CustomInput } from "../components/CustomInput";

export const SignupHookForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, "dataaa");
  };

  // Option 1
  //   return (
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //       <div>
  //         <label>FirstName</label>
  //         <CustomInput
  //           error={errors.firstname?.message}
  //           {...register("firstname", {
  //             required: {
  //               value: true,
  //               message: "This First Name is required",
  //             },
  //             maxLength: {
  //               value: 2,
  //               message: "Too Many Characters",
  //             },
  //           })}
  //         />
  //       </div>
  //       <div>
  //         <label>LastName</label>
  //         <CustomInput
  //           {...register("lastName", {
  //             required: { value: true, message: "This Last Name is required" },
  //           })}
  //           error={errors.lastName?.message}
  //         />
  //       </div>

  //       <button type="submit">submit</button>
  //     </form>
  //   );

  // Option 2
  const handleChange = (name) => (event) => {
    setValue(name, event.target.value, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <CustomInput
            label={"First Name"}
            type="text"
            {...register("firstname", {
              required: {
                value: true,
                message: "First name is required",
              },
              maxLength: {
                value: 20,
                message: "Too Many Characters",
              },
            })}
            onChange={handleChange("firstname")}
            error={errors.firstname?.message}
          />
        </div>
        <div>
          <CustomInput
            label={"Last Name"}
            type="text"
            {...register("lastName", {
              required: "Last name is required",
              maxLength: { value: 20, message: "Too Many Characters" },
            })}
            onChange={handleChange("lastName")}
            error={errors.lastName?.message}
          />
        </div>
        <div>
          <CustomInput
            label={"Password"}
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 Characters required" },
              maxLength: { value: 20, message: "Too Many Characters" },
            })}
            onChange={handleChange("password")}
            error={errors.password?.message}
          />
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};
