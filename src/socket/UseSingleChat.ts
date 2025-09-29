import { useEffect, useState } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { Chat, WSResponse } from "./chat";

export function useSingleChat(friendId: number) {
  const { socket, sendMessage } = useWebSocket();
  const [messages, setMessage] = useState<Chat[]>([]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    sendMessage({ type: "get_single_chat", friendId });

    const onMessage = (event: MessageEvent) => {
      const response: WSResponse = JSON.parse(event.data);
      if (response.type === "single_chat") {
        setMessage(response.payload);
      }
    };

    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("message", onMessage);
    };
  }, [socket, friendId]);

  return messages;
}
