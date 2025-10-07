import { View, Text, TouchableOpacity, TextInput, FlatList, Image, Modal, Pressable, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useChatList } from "../socket/UseChatList";
import { formatChatTime } from "../util/DateFormatter";
import { Chat } from "../socket/chat";
import { AuthContext } from "../components/AuthProvider"

type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const [search, setSearch] = useState("");
  const chatlist = useChatList();
  const [isModalVisible, setModalVisible] = useState(false);
  const auth = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View
          className={`bg-white shadow-md flex-row items-center justify-between px-4 ${Platform.OS === "android" ? "pt-10 pb-3" : "pt-14 pb-4"
            }`}
          style={{
            elevation: 6,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            borderBottomWidth: Platform.OS === "ios" ? 0.2 : 0,
            borderBottomColor: "#E5E7EB",
          }}
        >
          {/* Left section - App title */}
          <View className="flex-1">
            <Text className="text-3xl font-extrabold tracking-wide text-gray-900">
              Chatify
            </Text>
          </View>

          {/* Right section - Icons */}
          <View className="flex-row items-center space-x-5">
            <TouchableOpacity
              activeOpacity={0.7}
              className="p-2 bg-gray-100 rounded-full"
            >
              <Ionicons name="camera-outline" size={26} color="#111827" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setModalVisible(true)}
              className="p-2 bg-gray-100 rounded-full"
            >
              <Ionicons name="ellipsis-vertical" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Options Modal */}
          <Modal
            animationType="fade"
            visible={isModalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable
              className="flex-1 bg-black/30"
              onPress={() => setModalVisible(false)}
            >
              <Pressable
                className="absolute right-5 top-16"
                onPress={(e) => e.stopPropagation()}
              >
                <View
                  className="w-56 p-3 bg-white rounded-2xl"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 6,
                  }}
                >
                  {/* Profile */}
                  <TouchableOpacity
                    className="flex-row items-center py-3 border-b border-gray-100"
                    onPress={() => {
                      navigation.navigate("ProfileScreen");
                      setModalVisible(false);
                    }}
                  >
                    <Ionicons
                      name="person-circle-outline"
                      size={26}
                      color="#374151"
                    />
                    <Text className="ml-3 text-base font-semibold text-gray-800">
                      My Profile
                    </Text>
                  </TouchableOpacity>

                  {/* Logout */}
                  <TouchableOpacity
                    className="flex-row items-center py-3"
                    onPress={() => {
                      if (auth) auth.signOut();
                    }}
                  >
                    <Ionicons name="log-out-outline" size={26} color="#EF4444" />
                    <Text className="ml-3 text-base font-semibold text-red-600">
                      Log Out
                    </Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
        </View>
      ),
    });
  }, [navigation, isModalVisible]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  const filteredChats = [...chatlist].filter((chat) => {
    return (
      chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
    );
  }).sort(
    (a, b) =>
      new Date(b.lastTimeStamp).getTime() -
      new Date(a.lastTimeStamp).getTime()
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      className='flex-row items-center px-2 py-2 bg-gray-50'
      onPress={() => {
        navigation.navigate("SingleChatScreen", {
          chatId: item.friendId,
          friendName: item.friendName,
          lastSeenTime: formatChatTime(item.lastTimeStamp),
          profileImage: item.profileImage
            ? item.profileImage
            : `https://ui-avatars.com/api/?name=FirstName+LastName=${item.friendName.replace("", "+")}&background=random`,
        });
      }}
    >
      <TouchableOpacity className="items-center justify-center border-gray-300 rounded-full h-14 w-14 border-1">
        {item.profileImage ? (
          <Image
            source={{ uri: item.profileImage }}
            className="rounded-full h-14 w-14"
          />
        ) : (
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${item.friendName.replace(" ", "+")}&background=random`,
            }}
            className="rounded-full h-14 w-14"
          />
        )}
      </TouchableOpacity>

      <View className='flex-1 ms-3'>
        <View className='flex-row justify-between'>
          <Text className='text-xl font-bold text-gray-600'
            numberOfLines={1} ellipsizeMode='tail'>{item.friendName}</Text>
          <Text className='text-xs font-bold text-gray-500'>{formatChatTime(item.lastTimeStamp)}</Text>
        </View>
        <View className='flex-row items-center justify-between'>
          <Text className='items-center flex-1 text-gray-500'
            numberOfLines={1} ellipsizeMode='tail'>{item.lastMessage}</Text>
          {item.unreadCount > 0 && (
            <View className='px-2 py-2 bg-purple-500 rounded-full ms-2'>
              <Text className='text-xs font-bold text-slate-50'>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='flex-1 p-0' edges={["right", "bottom", "left"]}>
      <View className='flex-row items-center px-3 mx-2 mt-3 bg-gray-300 rounded-full h-14'>
        <Ionicons name='search' size={24} color='gray' />
        <TextInput onChangeText={setSearch} className='flex-1 text-lg font-bold ps-2' placeholder='Search' />
      </View>
      <View className='mt-1'>
        <FlatList data={filteredChats} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 80 }} />
      </View>
      <View className='absolute bg-purple-500 bottom-10 right-6 rounded-3xl'>
        <TouchableOpacity className='items-center justify-center w-20 h-20 rounded-3xl'
          onPress={() => navigation.navigate("NewChatScreen")}>
          <Ionicons name='chatbox-ellipses' size={24} color='black' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};
