"use client";
import { useEffect } from "react";

export default function PopupModal({
  message = "Message sent successfully",
  onClose,
}: {
  message?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const modal = document.getElementById("modal-content");
      if (modal && !modal.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex justify-center items-center">
      <div
        id="modal-content"
        className="bg-green-300 p-5 rounded-lg shadow-lg w-4/5 max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl font-bold text-white hover:text-black"
        >
          &times;
        </button>
        <p className="text-white text-xl font-bold">{message}</p>
      </div>
    </div>
  );
}
