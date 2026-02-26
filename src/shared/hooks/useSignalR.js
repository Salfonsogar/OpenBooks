import { useEffect, useState, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';

export default function useSignalR() {
    const [notifications, setNotifications] = useState([]);
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        // Crear la conexión con el Hub
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7080/Hub/NotificacionesHub', {
                skipNegotiation: false,
                withCredentials: true
            })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            // Definir el evento que escuchará las notificaciones
            connection.on('Notificacion', (mensaje) => {
                setNotifications((prev) => [...prev, { id: Date.now(), mensaje, timestamp: new Date() }]);
            });

            // Iniciar la conexión
            connection.start().then(() => { }).catch(() => { });

            // Limpiar la conexión al desmontar
            return () => {
                connection.stop();
            };
        }
    }, [connection]);

    const clearNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const clearAllNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    return {
        notifications,
        clearNotification,
        clearAllNotifications,
        isConnected: connection?.state === signalR.HubConnectionState.Connected
    };
}
