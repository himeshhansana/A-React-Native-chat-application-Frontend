import { useEffect } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { WSResponse } from "./chat";


export function useWebSocketPing(interval: number) {
    const { socket, isConnected, sendMessage } = useWebSocket();
    useEffect(() => {
        if (!socket || !isConnected) {
            return;
        }

        const pingTimer = setInterval(() => {
            sendMessage({ type: "PING" });
        }, interval);

        const onMessage = (event: MessageEvent) => {
            const response: WSResponse = JSON.parse(event.data);
            if (response.type === "PONG") {
            }
        };
        socket.addEventListener("message", onMessage);

        return () => {
            socket.removeEventListener("message", onMessage);
        };
    }, [socket, isConnected, sendMessage, interval]);
}