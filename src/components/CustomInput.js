import React, { useState } from "react";

export const CustomInput = ({
  type = "text",
  inputClassName = "",
  lableClassName = "",
  containerClassName = "flex",
  placeholder,
  value,
  label,
  onChange,
  prefix,
  error,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <div>
        {/* Label Code Start */}
        {label && (
          <label
            className={`flex mb-2 text-sm font-medium text-white ${lableClassName}`}
          >
            {label}
          </label>
        )}
        {/* Label Code End */}

        <div className={`relative ${containerClassName}`}>
          {/* Prefix Code Start */}
          {prefix && (
            <div
              dangerouslySetInnerHTML={{ __html: prefix }}
              className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            ></div>
          )}

          {/* Prefix Code End */}

          {/* Input Code Start */}
          <input
            className={`${
              prefix ? "ps-10" : ""
            } block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${inputClassName}`}
            type={type}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            {...props}
          />
          {/* Input Code End */}
        </div>

        {/* Error Block Start */}
        {error && (
          <p className="flex mt-1 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
        {/* Error Block End */}  
      </div>
    </>
  );
};
