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
import { useLayoutEffect, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSingleChat } from "../socket/UseSingleChat";
import { Chat } from "../socket/chat";
import { formatChatTime } from "../util/DateFormatter";
import { useSendChat } from "../socket/UseSendChat";
import { RootStack } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInUp,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
  interpolate,
  withSequence,
  withDelay
} from "react-native-reanimated";

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

  // Animation for background color
  const colorAnimation = useSharedValue(0);

  // Live animation elements
  const bubble1Animation = useSharedValue(0);
  const bubble2Animation = useSharedValue(0);
  const bubble3Animation = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);

  useEffect(() => {
    colorAnimation.value = withRepeat(
      withTiming(1, { duration: 8000 }),
      -1,
      true
    );

    // Floating bubbles with different timing
    bubble1Animation.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000 }),
        withTiming(0, { duration: 3000 })
      ),
      -1,
      false
    );

    bubble2Animation.value = withDelay(
      1000,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 4000 }),
          withTiming(0, { duration: 4000 })
        ),
        -1,
        false
      )
    );

    bubble3Animation.value = withDelay(
      2000,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 5000 }),
          withTiming(0, { duration: 5000 })
        ),
        -1,
        false
      )
    );

    // Gentle pulse effect
    pulseAnimation.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      false
    );
  }, []);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorAnimation.value,
      [0, 0.5, 1],
      ['#FEFEFE', '#F8FAFC', '#F1F5F9']
    );
    return {
      backgroundColor,
    };
  });

  // Animated styles for floating elements
  const bubble1Style = useAnimatedStyle(() => {
    const translateY = interpolate(bubble1Animation.value, [0, 1], [0, -100]);
    const opacity = interpolate(bubble1Animation.value, [0, 0.5, 1], [0.3, 0.6, 0.2]);
    const scale = interpolate(bubble1Animation.value, [0, 0.5, 1], [0.8, 1.2, 0.9]);
    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  });

  const bubble2Style = useAnimatedStyle(() => {
    const translateY = interpolate(bubble2Animation.value, [0, 1], [0, -120]);
    const translateX = interpolate(bubble2Animation.value, [0, 0.5, 1], [0, 20, -10]);
    const opacity = interpolate(bubble2Animation.value, [0, 0.5, 1], [0.2, 0.5, 0.1]);
    return {
      transform: [{ translateY }, { translateX }],
      opacity,
    };
  });

  const bubble3Style = useAnimatedStyle(() => {
    const translateY = interpolate(bubble3Animation.value, [0, 1], [0, -80]);
    const rotate = interpolate(bubble3Animation.value, [0, 1], [0, 180]);
    const opacity = interpolate(bubble3Animation.value, [0, 0.5, 1], [0.4, 0.7, 0.3]);
    return {
      transform: [{ translateY }, { rotate: `${rotate}deg` }],
      opacity,
    };
  });

  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseAnimation.value }],
    };
  });

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
          ? "self-end bg-purple-500 rounded-tl-2xl rounded-bl-2xl rounded-br-xl"
          : "self-start bg-gray-400 rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
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
    <Animated.View style={[{ flex: 1 }, animatedBackgroundStyle]}>
      <SafeAreaView className="flex-1" edges={["right", "bottom", "left"]}>
        <StatusBar hidden={false} />

        {/* Live Background Animation Elements */}
        <View className="absolute inset-0 pointer-events-none">
          {/* Floating Bubble 1 */}
          <Animated.View
            style={[
              bubble1Style,
              {
                position: 'absolute',
                bottom: 100,
                left: 50,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#E879F9',
              },
            ]}
          />

          {/* Floating Bubble 2 */}
          <Animated.View
            style={[
              bubble2Style,
              {
                position: 'absolute',
                bottom: 150,
                right: 80,
                width: 25,
                height: 25,
                borderRadius: 12.5,
                backgroundColor: '#A855F7',
              },
            ]}
          />

          {/* Floating Bubble 3 */}
          <Animated.View
            style={[
              bubble3Style,
              {
                position: 'absolute',
                bottom: 80,
                left: '50%',
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#C4B5FD',
                marginLeft: -30,
              },
            ]}
          />

          {/* Pulsing decorative elements */}
          <Animated.View
            style={[
              pulseStyle,
              {
                position: 'absolute',
                top: 100,
                right: 40,
                width: 15,
                height: 15,
                borderRadius: 7.5,
                backgroundColor: '#DDD6FE',
              },
            ]}
          />

          <Animated.View
            style={[
              pulseStyle,
              {
                position: 'absolute',
                top: 200,
                left: 30,
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: '#EDE9FE',
              },
            ]}
          />

          <Animated.View
            style={[
              pulseStyle,
              {
                position: 'absolute',
                top: 300,
                right: 60,
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: '#F3E8FF',
              },
            ]}
          />
        </View>

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
              className="items-center justify-center ml-2 bg-purple-500 rounded-full shadow-md w-14 h-14"
              onPress={handleSendChat}
              activeOpacity={0.7}
            >
              <Ionicons name="send" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

      </SafeAreaView>
    </Animated.View>
  );
}

