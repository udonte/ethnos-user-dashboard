import React from "react";

const CustomRadioButton = ({
  id,
  name,
  value,
  checked,
  onChange,
  label,
  disabled = false,
  size = "md", // default size
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <label
      htmlFor={id}
      className={`flex items-center cursor-pointer ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${className}`}
    >
      <span className="mr-3 text-ethnos-blue-600 dark:text-white text-base transition-all">
        {label}
      </span>
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <span
        className={`block rounded-full ring-1 ring-ethnos-blue-600 ring-offset-2 shadow-sm ${
          sizeClasses[size]
        } ${checked ? "bg-ethnos-blue-600" : "bg-white"}`}
      ></span>
    </label>
  );
};

export default CustomRadioButton;
