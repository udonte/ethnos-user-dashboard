import React from "react";
import { CgClose } from "react-icons/cg";

const Modal = ({
  isOpen,
  title,
  children,
  width = "md",
  position = "center",
  showHeader = true,
  showCloseIcon = true,
  onClose, // Add an onClose prop to handle modal close
}) => {
  const widths = {
    sm: "w-[90%] md:w-[60%] lg:w-[35%] ",
    md: "w-[90%] md:w-[70%] lg:w-[40%]",
    lg: "w-[65%]",
  };

  const modalStyleRight = {
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.5s ease-in-out",
  };

  const modalStyleCenter = {
    display: isOpen ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className={`fixed inset-0 z-50 w-full ${isOpen ? "block" : "hidden"}`}>
      {position === "right" ? (
        <div
          className={`fixed inset-y-0 right-6 z-50 ${widths[width]} bg-white dark:bg-deskit-black-100 transition-transform rounded-2xl`}
          style={modalStyleRight}
        >
          {showHeader && (
            <div className="px-8 mt-8">
              <div className="flex justify-between items-center h-8 w-full border-b border-gray-200 py-6">
                <h1 className="font-bold text-lg text-deskit-blue-300 dark:text-white">
                  {title}
                </h1>
                {showCloseIcon && (
                  <div
                    className="p-2 rounded-lg bg-deskit-gray-200 dark:bg-deskit-black-100 flex items-center justify-center cursor-pointer"
                    onClick={onClose}
                  >
                    <CgClose />
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="h-full p-8">{children}</div>
        </div>
      ) : (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 w-full "
          style={modalStyleCenter}
        >
          <div
            onClick={onClose}
            className="fixed inset-0 bg-gray-800 bg-opacity-10 backdrop-blur-none"
          />
          <div
            className={`bg-white rounded-xl z-50 px-8 py-4 dark:bg-deskit-black-300 transition-all  ${widths[width]}`}
          >
            {showHeader && (
              <div className="flex justify-between items-center h-8">
                <h1 className="font-bold text-lg text-deskit-blue-300 dark:text-white">
                  {title}
                </h1>
                {showCloseIcon && (
                  <div
                    className="p-2 rounded-lg bg-deskit-gray-200 dark:bg-deskit-black-100 flex items-center justify-center cursor-pointer"
                    onClick={onClose}
                  >
                    <CgClose size={21} className="font-bold" />
                  </div>
                )}
              </div>
            )}
            <div
              className="max-h-[500px] md:max-h-none overflow-y-scroll md:overscroll-y-none pr-4 md:pr-0"
              style={{
                scrollbarWidth: "thin" /* For Firefox */,
                WebkitScrollbarWidth: "thin" /* For WebKit-based browsers */,
                scrollbarTrackColor:
                  "#f1f1f1" /* Background color of the scrollbar track */,
                scrollbarColor:
                  "#E2E4E8 #ffffff" /* Color of the scrollbar thumb and track */,
                borderRadius: "4px" /* Radius of the scrollbar thumb */,
              }}
            >
              {children}
            </div>
          </div>
        </div>
      )}
      <div
        onClick={onClose}
        className={`inset-0 bg-gray-600 backdrop-blur fixed transition-all ${
          isOpen ? "block opacity-30" : "opacity-0 hidden -z-10"
        }`}
      />
    </div>
  );
};

export default Modal;
