import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    Animated,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";
import 'react-native-reanimated';


interface CallRecord {
    id: string;
    name: string;
    avatar: any;
    phoneNumber: string;
    callType: "incoming" | "outgoing" | "missed";
    timestamp: string;
    duration?: string;
}

const mockCallHistory: CallRecord[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        avatar: require("../../assets/avatar/avatar_1.png"),
        phoneNumber: "+1 234 567 8901",
        callType: "incoming",
        timestamp: "2 min ago",
        duration: "5:32",
    },
    {
        id: "2",
        name: "Mike Chen",
        avatar: require("../../assets/avatar/avatar_2.png"),
        phoneNumber: "+1 234 567 8902",
        callType: "outgoing",
        timestamp: "1 hour ago",
        duration: "12:45",
    },
    {
        id: "3",
        name: "Emma Wilson",
        avatar: require("../../assets/avatar/avatar_3.png"),
        phoneNumber: "+1 234 567 8903",
        callType: "missed",
        timestamp: "3 hours ago",
    },
    {
        id: "4",
        name: "David Brown",
        avatar: require("../../assets/avatar/avatar_4.png"),
        phoneNumber: "+1 234 567 8904",
        callType: "incoming",
        timestamp: "Yesterday",
        duration: "8:21",
    },
    {
        id: "5",
        name: "Lisa Garcia",
        avatar: require("../../assets/avatar/avatar_5.png"),
        phoneNumber: "+1 234 567 8905",
        callType: "outgoing",
        timestamp: "Yesterday",
        duration: "3:15",
    },
    {
        id: "6",
        name: "James Miller",
        avatar: require("../../assets/avatar/avatar_6.png"),
        phoneNumber: "+1 234 567 8906",
        callType: "missed",
        timestamp: "2 days ago",
    },
];

export default function CallsScreen() {
    const { applied } = useTheme();
    const [selectedTab, setSelectedTab] = useState<"all" | "missed">("all");
    const isDark = applied === "dark";

    const filteredCalls =
        selectedTab === "missed"
            ? mockCallHistory.filter((c) => c.callType === "missed")
            : mockCallHistory;

    const underlineAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(underlineAnim, {
            toValue: selectedTab === "all" ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [selectedTab]);

    const translateX = underlineAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 160], // Adjust width for underline movement
    });

    const getCallIcon = (type: string) => {
        switch (type) {
            case "incoming":
                return { icon: "arrow-down-left", color: "#22C55E" };
            case "outgoing":
                return { icon: "arrow-up-right", color: "#3B82F6" };
            case "missed":
                return { icon: "arrow-down-left", color: "#EF4444" };
            default:
                return { icon: "call-outline", color: "#6B7280" };
        }
    };

    const renderCallItem = ({ item }: { item: CallRecord }) => {
        const { icon, color } = getCallIcon(item.callType);
        return (
            <View
                className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800"
            >

                <Image source={item.avatar} className="w-12 h-12 rounded-full" />
                <View className="flex-1 ml-3">
                    <View className="flex-row items-center justify-between">
                        <Text
                            className="text-base font-semibold text-gray-900 dark:text-white"
                            numberOfLines={1}
                        >
                            {item.name}
                        </Text>
                        <Text className="text-xs text-gray-500 dark:text-gray-400">
                            {item.timestamp}
                        </Text>
                    </View>

                    <View className="flex-row items-center mt-1">
                        <Ionicons name={icon as any} size={16} color={color} />
                        <Text className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                            {item.phoneNumber}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity className="p-2 ml-2 rounded-full bg-blue-50 dark:bg-blue-900/40">
                    <Ionicons name="call" size={20} color={isDark ? "#60A5FA" : "#2563EB"} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <StatusBar
                barStyle={isDark ? "light-content" : "dark-content"}
                backgroundColor={isDark ? "#111827" : "#ffffff"}
            />

            {/* Tabs */}
            <View className="relative flex-row justify-around mt-3">
                <TouchableOpacity onPress={() => setSelectedTab("all")}>
                    <Text
                        className={`font-semibold ${selectedTab === "all"
                            ? "text-purple-600"
                            : "text-gray-500 dark:text-gray-300"
                            }`}
                    >
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedTab("missed")}>
                    <Text
                        className={`font-semibold ${selectedTab === "missed"
                            ? "text-purple-600"
                            : "text-gray-500 dark:text-gray-300"
                            }`}
                    >
                        Missed
                    </Text>
                </TouchableOpacity>

                <Animated.View
                    style={{
                        position: "absolute",
                        bottom: -5,
                        left: 40,
                        width: 60,
                        height: 3,
                        backgroundColor: "#2563EB",
                        borderRadius: 5,
                        transform: [{ translateX }],
                    }}
                />
            </View>

            {/* List */}
            <FlatList
                data={filteredCalls}
                renderItem={renderCallItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            {/* FAB */}
            <TouchableOpacity
                className="absolute items-center justify-center bg-purple-600 rounded-full shadow-lg bottom-6 right-6 w-14 h-14"
                style={{
                    shadowColor: "#3B82F6",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                }}
            >
                <Ionicons name="call-outline" size={26} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
