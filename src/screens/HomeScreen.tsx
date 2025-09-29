import { View, Text, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "ChatApp",
      headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
      headerRight: () => (
        <View className='flex-row space-x-4'>
          <TouchableOpacity>
            <Ionicons name='camera' size={24} color='black' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='ellipsis-vertical' size={24} color='black' />
          </TouchableOpacity>
        </View>
      )
    });
  });

  const filteredChats = chatlist.filter((chat) => {
    return (
      chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
    );
  });

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      className='flex-row items-center px-2 py-2 bg-gray-50'
      onPress={() => {
        navigation.navigate("SingleChatScreen", {
          chatId: item.friendId,
          friendName: item.friendName,
          lastSeenTime: formatChatTime(item.lastTimeStamp),
          profileImage: item.profileImage
        })
      }}
    >
      <Image source={{ uri: item.profileImage }} className='w-12 h-12 rounded-full' />
      <View className='flex-1'>
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
        <TouchableOpacity className='items-center justify-center w-20 h-20 rounded-3xl'>
          <Ionicons name='chatbox-ellipses' size={24} color='black' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};
