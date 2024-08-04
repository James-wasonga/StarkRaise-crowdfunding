import React, { useState } from "react";
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full  bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
      style={{ backgroundColor: "#1C1C24 !important" }}
    >
      <div
        className="bg-[#1C1C24] rounded-lg shadow-lg w-1/2 max-w-md p-4 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <br />
        <br />
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;