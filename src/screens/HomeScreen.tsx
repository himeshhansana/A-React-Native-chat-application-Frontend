import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useChatList } from "../socket/UseChatList";

const chats = [
  {
    id: 1,
    name: "Sahan Perera",
    lastMessage: "Hello, Kamal",
    time: "9:46 pm",
    unread: 2,
    profile: require("../../assets/avatar/avatar_1.png"),
  },
  {
    id: 2,
    name: "Fathima",
    lastMessage: "Hello, Sahn. Oyata kohomada",
    time: "Yesterday",
    unread: 0,
    profile: require("../../assets/avatar/avatar_2.png"),
  },
  {
    id: 3,
    name: "Nayana",
    lastMessage: "Hello, Kamal",
    time: "2025/9/24",
    unread: 2,
    profile: require("../../assets/avatar/avatar_3.png"),
  },
  {
    id: 4,
    name: "Tharaka Sankalpa Sir",
    lastMessage: "Sir,",
    time: "10.00 pm",
    unread: 1,
    profile: require("../../assets/avatar/avatar_4.png"),
  },
  {
    id: 5,
    name: "Pansilu Piyumantha ACH",
    lastMessage: "Mokada Karanne",
    time: "2025/09/20",
    unread: 2,
    profile: require("../../assets/avatar/avatar_5.png"),
  },
  {
    id: 6,
    name: "Hasitha Lakmal",
    lastMessage: "Mokada karanne Anjana",
    time: "2025/09/18",
    unread: 2,
    profile: require("../../assets/avatar/avatar_6.png"),
  },
  {
    id: 7,
    name: "Hasitha Lakmal",
    lastMessage: "Mokada karanne Anjana",
    time: "2025/09/18",
    unread: 2,
    profile: require("../../assets/avatar/avatar_6.png"),
  },
  {
    id: 8,
    name: "Hasitha Lakmal",
    lastMessage: "Mokada karanne Anjana",
    time: "2025/09/18",
    unread: 2,
    profile: require("../../assets/avatar/avatar_6.png"),
  },
];

type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const [search, setSearch] = useState("");

  const chatList = useChatList();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View
          className={`h-20 bg-white justify-center items-center flex-row shadow-2xl elevation-2xl ${
            Platform.OS === "ios" ? `py-5` : `py-0`
          }`}
        >
          <View className="items-start flex-1 ms-3">
            <Text className="text-2xl font-bold">ChatApp</Text>
          </View>
          <View className="me-3">
            <View className="flex-row space-x-4">
              <TouchableOpacity className="me-5">
                <Ionicons name="camera" size={26} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  const filterdChats = chats.filter((chat) => {
    return (
      chat.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
    );
  });

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      className="flex-row items-center py-2 px-3 bg-gray-50 my-0.5"
      onPress={() => {
        navigation.navigate("SingleChatScreen", {
          chatId: 1,
          friendName: "Anjana",
          lastSeenTime: "8:07 PM",
          profileImage: require("../../assets/avatar/avatar_1.png"),
        });
      }}
    >
      <Image source={item.profile} className="w-16 h-16 rounded-full" />
      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text
            className="text-xl font-bold text-gray-600"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text className="text-xs font-bold text-gray-500">{item.time}</Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text
            className="flex-1 text-base text-gray-500"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage}
          </Text>
          {item.unread > 0 && (
            <View className="px-2 py-2 bg-green-500 rounded-full ms-2">
              <Text className="text-xs font-bold text-slate-50">
                {item.unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      className="flex-1 p-0 bg-white"
      edges={["right", "bottom", "left"]}
    >
      <StatusBar hidden={false} />
      <View className="flex-row items-center px-3 mx-2 mt-3 border-2 border-gray-300 rounded-full h-14">
        <Ionicons name="search" size={20} color={"gray"} />
        <TextInput
          className="flex-1 text-lg font-bold ps-2"
          placeholder="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <View className="mt-1">
        <FlatList
          data={filterdChats}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
      <View className="absolute w-20 h-20 bg-green-500 bottom-16 right-10 rounded-3xl">
        <TouchableOpacity className="items-center justify-center w-20 h-20 rounded-3xl">
          <Ionicons name="chatbox-ellipses" size={26} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
