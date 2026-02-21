import { useState } from 'react';
import useSignalR from '../../hooks/useSignalR';
import NotificationModal from '../ui/NotificationModal';

export default function AdminNotifications() {
    const { notifications, clearNotification } = useSignalR();
    const [currentNotification, setCurrentNotification] = useState(null);

    // Mostrar la primera notificación no vista
    if (notifications.length > 0 && !currentNotification) {
        setCurrentNotification(notifications[0]);
    }

    const handleClose = () => {
        if (currentNotification) {
            clearNotification(currentNotification.id);
            setCurrentNotification(null);
        }
    };

    return (
        <div className="admin-notifications">
            <NotificationModal
                message={currentNotification?.mensaje || ''}
                isOpen={!!currentNotification}
                onClose={handleClose}
            />
        </div>
    );
}
