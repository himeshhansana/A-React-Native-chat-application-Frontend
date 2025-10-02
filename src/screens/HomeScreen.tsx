import { View, Text, TouchableOpacity, TextInput, FlatList, Image, Modal, Pressable, Platform } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStack } from '../../App';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useChatList } from '../socket/UseChatList';
import { Chat } from '../socket/chat';
import { formatChatTime } from '../util/DateFormatter';

type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProps>();
  const [search, setSearch] = useState("");
  const chatlist = useChatList();
  const [isModalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ChatApp",
      headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
      header: () => (
        <View
          className={`h-20 bg-white justify-center items-center flex-row shadow-2xl elevation-2xl ${Platform.OS === "android" ? `py-5` : `py-0`
            }`}
        >
          <View className="items-start flex-1 mt-5 ms-3">
            <Text className="text-2xl font-bold">ChatApp</Text>
          </View>
          <View className="me-3">
            <View className="flex-row mt-5 space-x-4">
              <TouchableOpacity className="me-5">
                <Ionicons name="camera" size={26} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                visible={isModalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}

              >
                <Pressable
                  className="flex-1 bg-transparent"
                  onPress={() => {
                    setModalVisible(false); // modal close when press outside
                  }}
                >
                  <Pressable
                    className="bg-red-100"
                    onPress={(e) => {
                      e.stopPropagation(); // prevent modal close inside of the modal
                    }}
                  >
                    {/* root modal view */}
                    <View className="items-end justify-end p-5">
                      {/* content view */}

                      <View
                        className="p-5 bg-white w-80 rounded-3xl"
                        style={{
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 4 },
                          shadowOpacity: 0.15,
                          shadowRadius: 8,
                          elevation: 6,
                        }}
                      >
                        {/* Settings */}
                        <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-200">
                          <View className="flex-row items-center space-x-3">
                            <Ionicons name="settings-outline" size={28} color="#4B5563" />
                            <Text className="text-base font-bold text-gray-800">   Settings</Text>
                          </View>
                        </TouchableOpacity>

                        {/* Profile */}
                        <TouchableOpacity className="flex-row items-center justify-between py-4">
                          <View className="flex-row items-center mt-3 space-x-3">
                            <Ionicons name="person-circle-outline" size={28} color="#4B5563" />
                            <Text className="text-base font-bold text-gray-800">   My Profile</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Pressable>
                </Pressable>
              </Modal>
            </View>
          </View>
        </View>
      ),
    });
  }, [navigation, isModalVisible]);

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
            : `https://ui-avatars.com/api/?name=FirstName+LastName=${item.friendName.replace(
              "",
              "+"
            )}&background=random`,
        })
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
              uri: `https://ui-avatars.com/api/?name=${item.friendName.replace(" ", "+")}&background=random`
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
            <View className='px-2 py-2 bg-green-500 rounded-full ms-2'>
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
      <View className='absolute bg-green-500 bottom-10 right-6 rounded-3xl'>
        <TouchableOpacity className='items-center justify-center w-20 h-20 rounded-3xl'
          onPress={() => navigation.navigate("NewChatScreen")}>
          <Ionicons name='chatbox-ellipses' size={24} color='black' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};
