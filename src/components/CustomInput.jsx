// CustomInput Component

const CustomInput = ({
  inputRef,
  disabled,
  name,
  value,
  handleInputChange, // Ensure this prop is passed correctly
  type,
  label,
  className,
  inputClassName,
  placeholder,
  size, // New size prop
  icon, // New icon prop
  onLabelClick, // New onLabelClick prop
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "p-1 min-h-6";
      case "medium":
        return "p-3 min-h-14";
      case "large":
        return "p-4 min-h-16";
      default:
        return "p-3 min-h-14"; // Default size
    }
  };

  const sizeClasses = getSizeClasses();

  if (type === "textarea") {
    return (
      <div>
        <label htmlFor={name} className="font-light">
          {label}
        </label>
        <textarea
          onChange={(e) => handleInputChange(e)} // Use the passed function here
          className={`w-full outline-0 border-0 bg-[#F3F5F9]  rounded-md placeholder:font-light placeholder:text-deskit-gray-400 dark:bg-deskit-black-100 dark:text-white  ${sizeClasses} ${inputClassName}`}
          name={name}
          value={value}
          rows="4"
          placeholder={placeholder}
        ></textarea>
      </div>
    );
  } else {
    return (
      <div className={`${className}`}>
        <div className="flex item gap-2 items-center">
          <label
            htmlFor={name}
            className="font-bold text-deskit-blue-300 dark:text-white"
          >
            {label}
          </label>
          {icon && (
            <span onClick={onLabelClick} className="cursor-pointer">
              {icon}
            </span>
          )}
        </div>
        <input
          ref={inputRef}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full border-0 outline-none bg-[#F3F5F9] placeholder:text-deskit-gray-400  rounded-md placeholder:font-light dark:bg-deskit-black-100 dark:text-white ${sizeClasses} ${inputClassName}`}
          type={type}
          value={value}
          name={name}
          onChange={(e) => handleInputChange(e)} // Use the passed function here
        />
      </div>
    );
  }
};

export default CustomInput;
