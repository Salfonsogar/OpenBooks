import { useEffect } from "react";
import "../../assets/styles/NotificationModal.css";

export default function NotificationModal({ message, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="notification-modal">
      <div className="notification-content">
        <p>{message}</p>
      </div>
    </div>
  );
}
