import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { use, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, StatusBar, Text, TextInput, TouchableOpacity, View, Platform } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { User } from "../socket/chat";
import { useUserList } from "../socket/UseUserList";

type NewChatsScreenProp = NativeStackNavigationProp<RootStack, "NewChatScreen">

export default function NewChatsScreen() {
    const navigation = useNavigation<NewChatsScreenProp>();
    const [search, setSearch] = useState("");
    const users = useUserList();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: () => (
                <View className="flex-row items-center space-x-3">
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="p-2 bg-gray-100 rounded-full"
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back-sharp" size={24} color="#111827" />
                    </TouchableOpacity>
                    <View className="flex-col">
                        <Text className="text-sm font-extrabold text-gray-900">
                            Select Contact
                        </Text>
                        <Text className="ml-2 text-sm text-gray-500">{users.length} Contacts</Text>
                    </View>
                </View>
            ),
            headerStyle: {
                backgroundColor: "#fff",
            },
        });
    }, [navigation, users]);

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center px-4 py-3 mx-2 mt-2 bg-white shadow-sm rounded-2xl"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 3,
            }}
            onPress={() => {
                navigation.replace("SingleChatScreen", {
                    chatId: item.id,
                    friendName: `${item.firstName} ${item.lastName}`,
                    lastSeenTime: item.updateAt,
                    profileImage: item.profileImage
                        ? item.profileImage
                        : `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
                });
            }}
        >
            {/* Profile Image */}
            <View className="items-center justify-center">
                {item.profileImage ? (
                    <Image
                        source={{ uri: item.profileImage }}
                        className="rounded-full w-14 h-14"
                    />
                ) : (
                    <View className="items-center justify-center rounded-full w-14 h-14 bg-gradient-to-r from-green-400 to-blue-400">
                        <Text className="text-lg font-bold text-white">
                            {item.firstName.trim().charAt(0).toUpperCase()}
                            {item.lastName.trim().charAt(0).toUpperCase()}
                        </Text>
                    </View>
                )}
            </View>

            {/* User Info */}
            <View className="flex-col flex-1 ml-4">
                <Text className="text-lg font-bold text-gray-900">
                    {item.firstName} {item.lastName}
                </Text>
                <Text
                    className={`text-sm ${item.status === "ACTIVE" ? "text-green-600" : "text-gray-500 italic"
                        }`}
                >
                    {item.status === "ACTIVE"
                        ? "Already in Contact List - Message Now!"
                        : "Hey there! Let's connect."}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const filterdUsers = [...users]
        .filter((u) => {
            return (
                u.firstName.toLowerCase().includes(search.toLowerCase()) ||
                u.lastName.toLowerCase().includes(search.toLowerCase()) ||
                u.contactNo.toLowerCase().includes(search.toLowerCase())
            );
        })
        .sort((a, b) => a.firstName.localeCompare(b.lastName));

    return (
        <SafeAreaView className="flex-1 bg-gray-50" edges={["right", "bottom", "left"]}>
            <StatusBar
                barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
                backgroundColor="#fff"
            />
            <View className="flex-1">
                {/* Search Bar */}
                <View className="flex-row items-center h-12 px-4 mx-4 mt-4 bg-white border border-gray-200 rounded-full shadow-sm">
                    <Ionicons name="search" size={20} color="gray" />
                    <TextInput
                        className="flex-1 text-base font-medium text-gray-700 ps-2"
                        placeholder="Search contact..."
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* New Contact Button */}
                <View className="px-4 py-3 mt-4">
                    <TouchableOpacity
                        className="flex-row items-center justify-center w-full bg-purple-600 rounded-full shadow-md h-14"
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("NewContactScreen")}
                    >
                        <Feather name="user-plus" size={22} color="white" />
                        <Text className="ml-2 text-base font-semibold text-white">
                            Add New Contact
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Contact List */}
                <View className="flex-1 px-2 mt-2">
                    <FlatList
                        data={filterdUsers}
                        renderItem={renderItem}
                        keyExtractor={(_, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

