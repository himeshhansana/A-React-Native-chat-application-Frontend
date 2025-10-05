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
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSingleChat } from "../socket/UseSingleChat";
import { Chat } from "../socket/chat";
import { formatChatTime } from "../util/DateFormatter";
import { useSendChat } from "../socket/UseSendChat";
import { RootStack } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

type SingleChatScreenProps = NativeStackScreenProps<
  RootStack,
  "SingleChatScreen"
>;

export default function SingleChatScreen({ route, navigation }: SingleChatScreenProps) {
  const { chatId, friendName, profileImage, lastSeenTime } = route.params;
  const singleChat = useSingleChat(chatId);
  const messages = singleChat.messages;
  const friend = singleChat.friend;
  const sendMessage = useSendChat();
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 bg-gray-100 rounded-full"
          >
            <Ionicons name="arrow-back" size={22} color="black" />
          </TouchableOpacity>
          <Image
            source={{ uri: profileImage }}
            className="rounded-full w-11 h-11"
          />
          <View>
            <Text className="text-lg font-semibold text-gray-900">
              {friend ? friend.firstName + " " + friend.lastName : friendName}
            </Text>
            <Text className="text-xs text-gray-500">
              {friend?.status === "ONLINE"
                ? "Online"
                : `Last seen ${formatChatTime(friend?.updatedAt ?? "")}`}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity className="mr-2">
          <Ionicons name="ellipsis-vertical" className="ml-2" size={22} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, friend]);

  const renderItem = ({ item }: { item: Chat }) => {
    const isMe = item.from.id !== chatId;

    return (
      <Animated.View
        entering={isMe ? FadeInUp.springify().delay(100) : FadeInDown.springify().delay(100)}
        className={`my-1 px-4 py-2 max-w-[75%] ${isMe
          ? "self-end bg-green-500 rounded-tl-2xl rounded-bl-2xl rounded-br-xl"
          : "self-start bg-gray-300 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
          }`}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Text className={`${isMe ? "text-white" : "text-gray-800"} text-[15px]`}>
          {item.message}
        </Text>
        <View className="flex-row items-center justify-end mt-1 space-x-1">
          <Text className={`text-[10px] ${isMe ? "text-white" : "text-gray-600"}`}>
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
              size={16}
              color={item.status === "READ" ? "#0284c7" : "#d1d5db"}
            />
          )}
        </View>
      </Animated.View>
    );
  };

  const handleSendChat = () => {
    if (!input.trim()) return;
    sendMessage(chatId, input);
    setInput("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["right", "bottom", "left"]}>
      <StatusBar hidden={false} />

      {/* 🌈 Gradient background */}
      <KeyboardAvoidingView
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "android" ? 90 : 100}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          data={messages}
          renderItem={renderItem}
          className="flex-1 px-3"
          inverted
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 60 }}
        />

        {/* 💬 Input area */}
        <View className="flex-row items-end p-2 border-t border-gray-200 bg-white/90 backdrop-blur-md">
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            multiline
            placeholder="Type a message..."
            placeholderTextColor="#888"
            className="flex-1 h-auto px-5 py-2 text-base bg-gray-100 min-h-14 max-h-32 rounded-3xl"
          />
          <TouchableOpacity
            className="items-center justify-center ml-2 bg-green-500 rounded-full shadow-md w-14 h-14"
            onPress={handleSendChat}
            activeOpacity={0.7}
          >
            <Ionicons name="send" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

