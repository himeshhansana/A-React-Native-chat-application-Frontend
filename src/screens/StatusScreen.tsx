import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, StatusBar, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";

const { width } = Dimensions.get('window');

interface Status {
  id: string;
  name: string;
  avatar: any;
  time: string;
  viewed: boolean;
  isOnline?: boolean;
  statusText?: string;
  statusType?: 'text' | 'photo' | 'video';
}

const mockStatuses: Status[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: require("../../assets/avatar/avatar_1.png"),
    time: "Just now",
    viewed: false,
    isOnline: true,
    statusText: "Having a great day! ☀️",
    statusType: 'photo'
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: require("../../assets/avatar/avatar_2.png"),
    time: "2 minutes ago",
    viewed: false,
    isOnline: true,
    statusText: "Working from the beach 🏖️",
    statusType: 'video'
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: require("../../assets/avatar/avatar_3.png"),
    time: "1 hour ago",
    viewed: false,
    isOnline: false,
    statusText: "Coffee time ☕",
    statusType: 'text'
  },
  {
    id: "4",
    name: "David Brown",
    avatar: require("../../assets/avatar/avatar_4.png"),
    time: "Yesterday, 8:30 PM",
    viewed: true,
    isOnline: false,
    statusText: "Good night everyone 🌙",
    statusType: 'photo'
  },
  {
    id: "5",
    name: "Lisa Garcia",
    avatar: require("../../assets/avatar/avatar_5.png"),
    time: "Yesterday, 6:15 PM",
    viewed: true,
    isOnline: false,
    statusText: "Dinner with friends 🍽️",
    statusType: 'photo'
  },
  {
    id: "6",
    name: "James Miller",
    avatar: require("../../assets/avatar/avatar_6.png"),
    time: "Yesterday, 11:45 AM",
    viewed: true,
    isOnline: false,
    statusText: "Morning workout done! 💪",
    statusType: 'video'
  },
];

export default function StatusScreen() {
  const { applied } = useTheme();
  const isDark = applied === "dark";
  const [activeTab, setActiveTab] = useState<'status' | 'channels'>('status');

  const recentStatuses = mockStatuses.filter((s) => !s.viewed);
  const viewedStatuses = mockStatuses.filter((s) => s.viewed);

  const getStatusTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return 'videocam';
      case 'photo':
        return 'camera';
      default:
        return 'text';
    }
  };

  const renderStatusItem = ({ item }: { item: Status }) => (
    <TouchableOpacity 
      className="flex-row items-center px-4 py-3 active:bg-gray-50 dark:active:bg-gray-800"
      activeOpacity={0.7}
    >
      <View className="relative">
        <View
          className={`p-0.5 rounded-full ${
            item.viewed 
              ? "border-gray-300 dark:border-gray-600" 
              : "border-green-500"
          } border-2`}
        >
          <Image source={item.avatar} className="rounded-full w-14 h-14" />
        </View>
        
        {/* Online indicator */}
        {item.isOnline && (
          <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full dark:border-gray-900" />
        )}
        
        {/* Status type indicator */}
        <View className="absolute items-center justify-center w-6 h-6 bg-blue-500 rounded-full -bottom-1 -right-1">
          <Ionicons 
            name={getStatusTypeIcon(item.statusType || 'text') as any} 
            size={12} 
            color="white" 
          />
        </View>
      </View>

      <View className="flex-1 ml-3">
        <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
          {item.name}
        </Text>
        {item.statusText && (
          <Text 
            className="mb-1 text-sm text-gray-600 dark:text-gray-300" 
            numberOfLines={1}
          >
            {item.statusText}
          </Text>
        )}
        <Text className="text-xs text-gray-500 dark:text-gray-400">
          {item.time}
        </Text>
      </View>

      <View className="items-center">
        <Ionicons 
          name="chevron-forward" 
          size={16} 
          color={isDark ? '#9CA3AF' : '#6B7280'} 
        />
      </View>
    </TouchableOpacity>
  );

  const renderMyStatus = () => (
    <TouchableOpacity 
      className="flex-row items-center px-4 py-4 mx-4 mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image
          source={require("../../assets/avatar/avatar_5.png")}
          className="w-16 h-16 rounded-full"
        />
        <TouchableOpacity 
          className="absolute bottom-0 right-0 items-center justify-center w-6 h-6 bg-blue-600 border-2 border-white rounded-full dark:border-gray-900"
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={14} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 ml-4">
        <Text className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
          My Status
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-300">
          Tap to add status update
        </Text>
      </View>

      <View className="p-2 rounded-full bg-white/50 dark:bg-gray-700/50">
        <Ionicons 
          name="add-circle" 
          size={24} 
          color={isDark ? '#60A5FA' : '#3B82F6'} 
        />
      </View>
    </TouchableOpacity>
  );

  const renderQuickActions = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="px-4 mb-6"
      contentContainerStyle={{ paddingRight: 20 }}
    >
      <TouchableOpacity 
        className="bg-green-500 rounded-2xl p-4 mr-3 items-center justify-center min-w-[80px]"
        activeOpacity={0.8}
      >
        <Ionicons name="camera" size={24} color="white" />
        <Text className="mt-2 text-xs font-medium text-white">Camera</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="bg-purple-500 rounded-2xl p-4 mr-3 items-center justify-center min-w-[80px]"
        activeOpacity={0.8}
      >
        <Ionicons name="videocam" size={24} color="white" />
        <Text className="mt-2 text-xs font-medium text-white">Video</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="bg-orange-500 rounded-2xl p-4 mr-3 items-center justify-center min-w-[80px]"
        activeOpacity={0.8}
      >
        <Ionicons name="text" size={24} color="white" />
        <Text className="mt-2 text-xs font-medium text-white">Text</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="bg-pink-500 rounded-2xl p-4 mr-3 items-center justify-center min-w-[80px]"
        activeOpacity={0.8}
      >
        <Ionicons name="musical-notes" size={24} color="white" />
        <Text className="mt-2 text-xs font-medium text-white">Music</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderSectionHeader = (title: string, count: number) => (
    <View className="flex-row items-center justify-between px-4 py-3 bg-gray-50/50 dark:bg-gray-800/50">
      <Text className="text-sm font-bold tracking-wide text-gray-700 uppercase dark:text-gray-200">
        {title}
      </Text>
      <View className="px-2 py-1 bg-gray-200 rounded-full dark:bg-gray-700">
        <Text className="text-xs font-medium text-gray-600 dark:text-gray-300">
          {count}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#111827" : "#ffffff"}
      />

      {activeTab === 'status' ? (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* My Status */}
          {renderMyStatus()}
          
          {/* Quick Actions */}
          {renderQuickActions()}

          {/* Recent Updates */}
          {recentStatuses.length > 0 && (
            <>
              {renderSectionHeader('Recent Updates', recentStatuses.length)}
              {recentStatuses.map((item) => (
                <View key={item.id}>
                  {renderStatusItem({ item })}
                </View>
              ))}
            </>
          )}

          {/* Viewed Updates */}
          {viewedStatuses.length > 0 && (
            <>
              {renderSectionHeader('Viewed Updates', viewedStatuses.length)}
              {viewedStatuses.map((item) => (
                <View key={item.id}>
                  {renderStatusItem({ item })}
                </View>
              ))}
            </>
          )}

          {/* Empty State */}
          {recentStatuses.length === 0 && viewedStatuses.length === 0 && (
            <View className="items-center justify-center flex-1 py-20">
              <Ionicons 
                name="radio-outline" 
                size={64} 
                color={isDark ? '#6B7280' : '#9CA3AF'} 
              />
              <Text className="mt-4 mb-2 text-lg font-medium text-gray-900 dark:text-white">
                No status updates
              </Text>
              <Text className="px-8 text-center text-gray-600 dark:text-gray-300">
                Status updates from your contacts will appear here
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="items-center justify-center flex-1 py-20">
            <Ionicons 
              name="radio" 
              size={64} 
              color={isDark ? '#6B7280' : '#9CA3AF'} 
            />
            <Text className="mt-4 mb-2 text-lg font-medium text-gray-900 dark:text-white">
              No channels yet
            </Text>
            <Text className="px-8 mb-6 text-center text-gray-600 dark:text-gray-300">
              Follow channels to see their latest updates here
            </Text>
            <TouchableOpacity 
              className="px-6 py-3 bg-blue-600 rounded-xl"
              activeOpacity={0.8}
            >
              <Text className="font-semibold text-white">Find Channels</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity 
        className="absolute items-center justify-center bg-green-600 rounded-full shadow-lg bottom-6 right-6 w-14 h-14"
        style={{ 
          shadowColor: '#16A34A',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="camera" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
