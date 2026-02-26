import { useState, useCallback } from 'react';

export default function useNotification() {
    const [notification, setNotification] = useState({ message: '', isOpen: false });

    const showNotification = useCallback((message) => {
        setNotification({ message, isOpen: true });
    }, []);

    const closeNotification = useCallback(() => {
        setNotification({ message: '', isOpen: false });
    }, []);

    return {
        notification,
        showNotification,
        closeNotification
    };
}
