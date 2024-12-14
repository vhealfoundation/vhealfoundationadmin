import React, { useState } from "react";

const CustomTextField = ({
  label = "",
  placeholder = "",
  value,
  onChange,
  type = "text",
  error = false,
  helperText = "",
  className = "",
  inputClassName = "",
  textarea = false, // New prop for rendering textarea
  size = "medium", // New prop for size adjustment (small, medium, large)
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  // Define size classes
  const sizeClasses = {
    small: "p-2 text-sm",
    medium: "p-3.5 text-base",
    large: "p-4 text-lg",
  };

  return (
    <div className={`${focused ? "mt-2" : "mt-0"} relative w-full ${className}`}>
      {/* Label */}
      <label
        className={`absolute left-3 transition-all duration-200 ${
          focused || value
            ? "-top-5 text-xs text-primary"
            : "top-4 text-gray-500 pl-2"
        } ${error ? "text-red-500" : ""}`}
      >
        {label}
      </label>

      {/* Conditional Input or Textarea */}
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full mt-1 border-2 rounded-md outline-none transition-all resize-none hover:border-gray-500
            focus:ring-1 focus:ring-primary focus:border-none
            ${error ? "border-red-500" : "border-gray-300"}
            ${sizeClasses[size]} ${inputClassName}`}
          placeholder={placeholder}
          {...props}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full mt-1 border-2 rounded-md outline-none transition-all hover:border-gray-500
            focus:ring-1 focus:ring-primary focus:border-none
            ${error ? "border-red-500" : "border-gray-300"}
            ${sizeClasses[size]} ${inputClassName}`}
          placeholder={placeholder}
          {...props}
        />
      )}

      {/* Helper Text */}
      {helperText && (
        <p
          className={`mt-1 text-sm ${
            error ? "text-red-500" : "text-gray-500"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default CustomTextField;
