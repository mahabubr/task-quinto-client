import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

const Modal = ({ isOpen, onClose, children, title, footer }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
      document.body.style.overflow = "hidden"; // prevent background scroll
    } else {
      const timeout = setTimeout(() => setShow(false), 300);
      document.body.style.overflow = ""; // restore scroll
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!show) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
      onClick={onClose} // click outside closes
    >
      <div
        className={`
          bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-md relative
          transform transition-all duration-300
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()} // prevent close on modal click
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Title */}
        {title && (
          <div className="mb-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <hr className="border-gray-200 mt-2" />
          </div>
        )}

        {/* Modal content */}
        <div className="mt-2">{children}</div>

        {/* Footer */}
        {footer && (
          <>
            <hr className="border-gray-200 mt-4 mb-2" />
            <div className="flex justify-end gap-2">{footer}</div>
          </>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById("root"));
};

export default Modal;
