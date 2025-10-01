import { useEffect, useState } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { User } from "./chat";

export function useUserList() {
    const { socket, sendMessage } = useWebSocket();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {

        if (socket) {
            return;
        }
        sendMessage({ type: "get_all_users" });

    }, [socket]);
    return users;
}