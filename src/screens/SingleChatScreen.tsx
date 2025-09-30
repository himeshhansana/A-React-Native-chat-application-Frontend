
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSingleChat } from "../socket/UseSingleChat";
import { Chat } from "../socket/chat";
import { formatChatTime } from "../util/DateFormatter";
import { useSendChat } from "../socket/UseSendChat";

type Message = {
  id: number;
  text: string;
  sender: "me" | "friend";
  time: string;
  status?: "sent" | "delivered" | "read";
};

type SingleChatScreenProps = NativeStackScreenProps<
  RootStack,
  "SingleChatScreen"
>;
export default function SingleChatScreen({
  route,
  navigation,
}: SingleChatScreenProps) {
  const { chatId, friendName, lastSeenTime, profileImage } = route.params;
  const singleChat = useSingleChat(chatId); // chatId == friendId
  const messages = singleChat.messages;
  const friend = singleChat.friend;
  const sendMessage = useSendChat();
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className="items-center justify-center"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <Image
            source={{ uri: profileImage }}
            className="p-1 border-2 border-gray-400 rounded-full h-14 w-14"
          />
          <View className="space-y-2 ">
            <Text className="text-2xl font-bold">
              {friend?.firstName} {friend?.lastName}
            </Text>
            <Text className="text-xs italic font-bold text-gray-500">
              {friend?.status === "ONLINE"
                ? "Online"
                : `Last seen ${formatChatTime(
                  friend?.updatedAt ?? ""
                )}`}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, friend]);

  const renderItem = ({ item }: { item: Chat }) => {
    const isMe = item.from.id !== chatId;
    return (
      <View
        className={`my-1 px-3 py-2 max-w-[75%] ${isMe
            ? `self-end bg-green-900 rounded-tl-xl rounded-bl-xl rounded-br-xl`
            : `rounded-tr-xl rounded-bl-xl rounded-br-xl self-start bg-gray-700`
          }`}
      >
        <Text className={`text-white text-base`}>{item.message}</Text>
        <View className="flex-row items-center justify-end mt-1">
          <Text className={`text-white italic text-xs me-2`}>
            {formatChatTime(item.createdAt)}
          </Text>
          {isMe && (
            <Ionicons
              name={
                item.status === "READ"
                  ? "checkmark-done-sharp"
                  : item.status === "DELIVERED"
                    ? "checkmark-done-sharp"
                    : "checkmark"
              }
              size={20}
              color={item.status === "READ" ? "#0284c7" : "#9ca3af"}
            />
          )}
        </View>
      </View>
    );
  };

  const handleSendChat = () => {
    if (!input.trim()) {
      return;
    }
    sendMessage(chatId, input);
    setInput("");
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["right", "bottom", "left"]}
    >
      <StatusBar hidden={false} />
      <KeyboardAvoidingView
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "android" ? 90 : 50}
        behavior={Platform.OS === "android" ? "padding" : "height"}
      >
        <FlatList
          data={messages} //Chat[]
          renderItem={renderItem}
          className="flex-1 px-3"
          inverted
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
        <View className="flex-row items-end p-2 bg-white">
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            multiline
            placeholder="Type a message"
            className="flex-1 h-auto px-5 py-2 text-base bg-gray-200 min-h-14 max-h-32 rounded-3xl"
          />
          <TouchableOpacity
            className="items-center justify-center bg-green-600 rounded-full w-14 h-14"
            onPress={handleSendChat}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
