import { useEffect, useState } from "react";
import { User, WSResponse } from "./chat";
import { useWebSocket } from "./WebSocketProvider";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export function useSendNewContact() {
  const { sendMessage, socket } = useWebSocket();
  const [responseText, setResponseText] = useState<string>();
  const sendNewContact = (user: User) => {
    sendMessage({ type: "save_new_contact", user });
  };

  useEffect(() => {
    if (!socket) {
      return;
    }
    const onMessage = (event: MessageEvent) => {
      const response: WSResponse = JSON.parse(event.data);
      if (response.type === "new_contact_response_text") {
        if (response.payload.responseStatus) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: response.payload.message,
          });
        } else {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: "Warning",
            textBody: response.payload.message,
          });
        }
      }
    };

    socket.addEventListener("message", onMessage);
    return () => {
      socket.removeEventListener("message", onMessage);
    };
  }, [socket]);
  return { sendNewContact: sendNewContact, responseText: responseText };
}
