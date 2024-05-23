import React from "react";

const Modal = ({ show, onClose, children, maxWidth = "max-w-2xl" }) => {
  if (!show) return null;

  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClick}
    >
      <div className={`bg-white rounded-lg p-6 w-full ${maxWidth} relative`}>
        <button className="absolute top-4 right-6 text-3xl" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
