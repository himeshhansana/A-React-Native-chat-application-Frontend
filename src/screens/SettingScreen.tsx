import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, ThemeOption } from "../theme/ThemeProvider";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import Animated, { FadeInRight } from "react-native-reanimated";

const options: ThemeOption[] = ["light", "dark", "system"];

type SettingScreenProp = NativeStackNavigationProp<RootStack, "SettingScreen">;

export default function SettingScreen() {
  const { preference, applied, setPreference } = useTheme();
  const navigation = useNavigation<SettingScreenProp>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [chatBackupEnabled, setChatBackupEnabled] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings",
      headerStyle: {
        backgroundColor: applied === "dark" ? "#0f172a" : "#f8fafc",
      },
      headerTintColor: applied === "dark" ? "#f8fafc" : "#0f172a",
    });
  }, [navigation, applied]);

  const textColor = applied === "dark" ? "text-slate-100" : "text-gray-900";
  const bgColor = applied === "dark" ? "bg-[#0f172a]" : "bg-white";

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`} edges={["right", "bottom", "left"]}>
      <StatusBar
        barStyle={applied === "dark" ? "light-content" : "dark-content"}
        backgroundColor={applied === "dark" ? "#0f172a" : "#f8fafc"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Theme Section */}
        <Animated.View entering={FadeInRight.springify()} className="p-5">
          <Text className={`text-lg font-bold mb-3 ${textColor}`}>
            Appearance
          </Text>
          <View className="flex-row flex-wrap gap-x-3">
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                className={`py-2 px-5 rounded-full mb-2 ${preference === option ? "bg-purple-600" : "bg-gray-200"
                  }`}
                onPress={() => setPreference(option)}
              >
                <Text
                  className={`font-bold ${preference === option ? "text-white" : "text-gray-800"
                    }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/*Notifications */}
        <Animated.View
          entering={FadeInRight.delay(100)}
          className={`px-5 py-4 border-t border-gray-200 ${bgColor}`}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-3">
              <Ionicons name="notifications-outline" size={26} color="#22c55e" />
              <Text className={`text-lg ${textColor}`}> Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              thumbColor={notificationsEnabled ? "#22c55e" : "#9ca3af"}
            />
          </View>
        </Animated.View>

        {/*Chat Backup */}
        <Animated.View
          entering={FadeInRight.delay(200)}
          className={`px-5 py-4 border-t border-gray-200 ${bgColor}`}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-3">
              <Ionicons name="cloud-upload-outline" size={26} color="#0ea5e9" />
              <Text className={`text-lg ${textColor}`}> Chat Backup</Text>
            </View>
            <Switch
              value={chatBackupEnabled}
              onValueChange={setChatBackupEnabled}
              thumbColor={chatBackupEnabled ? "#0ea5e9" : "#9ca3af"}
            />
          </View>
        </Animated.View>

        {/* Profile */}
        <Animated.View
          entering={FadeInRight.delay(300)}
          className={`px-5 py-4 border-t border-gray-200 ${bgColor}`}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center space-x-3">
              <Ionicons name="person-circle-outline" size={30} color="#4B5563" />
              <Text className={`text-lg ${textColor}`}> My Profile</Text>
            </View>
            <Feather name="chevron-right" size={22} color="#6b7280" />
          </TouchableOpacity>
        </Animated.View>

        {/* Privacy */}
        <Animated.View
          entering={FadeInRight.delay(400)}
          className={`px-5 py-4 border-t border-gray-200 ${bgColor}`}
        >
          <TouchableOpacity
            onPress={() => { }}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center space-x-3">
              <Ionicons name="lock-closed-outline" size={26} color="#f59e0b" />
              <Text className={`text-lg ${textColor}`}> Privacy Settings</Text>
            </View>
            <Feather name="chevron-right" size={22} color="#6b7280" />
          </TouchableOpacity>
        </Animated.View>

        {/* About */}
        <Animated.View
          entering={FadeInRight.delay(500)}
          className={`px-5 py-4 border-t border-gray-200 ${bgColor}`}
        >
          <TouchableOpacity
            onPress={() => { }}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center space-x-3">
              <MaterialIcons name="info-outline" size={26} color="#3b82f6" />
              <Text className={`text-lg ${textColor}`}> About ChatApp</Text>
            </View>
            <Feather name="chevron-right" size={22} color="#6b7280" />
          </TouchableOpacity>
        </Animated.View>

        {/* Log Out */}
        <Animated.View
          entering={FadeInRight.delay(600)}
          className="items-center px-5 py-6 border-t border-gray-200"
        >
          <TouchableOpacity
            className="flex-row items-center justify-center px-10 py-3 bg-red-600 rounded-full"
            onPress={() => { }}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={22} color="white" />
            <Text className="ml-2 text-base font-semibold text-white">
              Log Out
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
