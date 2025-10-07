import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import Animated, { FadeInRight } from "react-native-reanimated";

type PrivacySettingsScreenProp = NativeStackNavigationProp<RootStack, "PrivacySettingsScreen">;

export default function PrivacySettingsScreen() {
  const { applied } = useTheme();
  const navigation = useNavigation<PrivacySettingsScreenProp>();
  
  // Privacy settings state
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(true);
  const [lastSeenEnabled, setLastSeenEnabled] = useState(true);
  const [profilePhotoVisibility, setProfilePhotoVisibility] = useState("everyone");
  const [statusVisibility, setStatusVisibility] = useState("contacts");
  const [onlineStatusEnabled, setOnlineStatusEnabled] = useState(true);
  const [messagePreviewEnabled, setMessagePreviewEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [blockUnknownEnabled, setBlockUnknownEnabled] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Privacy Settings",
      headerStyle: {
        backgroundColor: applied === "dark" ? "#0f172a" : "#f8fafc",
      },
      headerTintColor: applied === "dark" ? "#f8fafc" : "#0f172a",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mr-4"
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={applied === "dark" ? "#f8fafc" : "#0f172a"} 
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, applied]);

  const textColor = applied === "dark" ? "text-slate-100" : "text-gray-900";
  const bgColor = applied === "dark" ? "bg-[#0f172a]" : "bg-white";
  const sectionBgColor = applied === "dark" ? "bg-slate-800" : "bg-gray-50";
  const borderColor = applied === "dark" ? "border-slate-700" : "border-gray-200";

  const showVisibilityOptions = (currentValue: string, setter: (value: string) => void) => {
    Alert.alert(
      "Visibility Options",
      "Who can see this information?",
      [
        { text: "Everyone", onPress: () => setter("everyone") },
        { text: "Contacts Only", onPress: () => setter("contacts") },
        { text: "Nobody", onPress: () => setter("nobody") },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const showTwoFactorInfo = () => {
    Alert.alert(
      "Two-Factor Authentication",
      "Add an extra layer of security to your account by requiring a verification code in addition to your password.",
      [
        { text: "Enable Later", style: "cancel" },
        { text: "Enable Now", onPress: () => setTwoFactorEnabled(true) },
      ]
    );
  };

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`} edges={["right", "bottom", "left"]}>
      <StatusBar
        barStyle={applied === "dark" ? "light-content" : "dark-content"}
        backgroundColor={applied === "dark" ? "#0f172a" : "#f8fafc"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Message Privacy Section */}
        <Animated.View entering={FadeInRight.springify()} className="p-5">
          <Text className={`text-lg font-bold mb-4 ${textColor}`}>
            Message Privacy
          </Text>
          
          {/* Read Receipts */}
          <View className={`p-4 rounded-xl mb-3 ${sectionBgColor}`}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3 flex-1">
                <Ionicons name="checkmark-done" size={24} color="#22c55e" />
                <View className="flex-1">
                  <Text className={`text-base font-semibold ${textColor}`}>Read Receipts</Text>
                  <Text className={`text-sm ${applied === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    Show when you've read messages
                  </Text>
                </View>
              </View>
              <Switch
                value={readReceiptsEnabled}
                onValueChange={setReadReceiptsEnabled}
                thumbColor={readReceiptsEnabled ? "#22c55e" : "#9ca3af"}
                trackColor={{ false: "#e5e7eb", true: "#bbf7d0" }}
              />
            </View>
          </View>

          {/* Message Preview */}
          <View className={`p-4 rounded-xl mb-3 ${sectionBgColor}`}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3 flex-1">
                <Ionicons name="eye-outline" size={24} color="#3b82f6" />
                <View className="flex-1">
                  <Text className={`text-base font-semibold ${textColor}`}>Message Preview</Text>
                  <Text className={`text-sm ${applied === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    Show message content in notifications
                  </Text>
                </View>
              </View>
              <Switch
                value={messagePreviewEnabled}
                onValueChange={setMessagePreviewEnabled}
                thumbColor={messagePreviewEnabled ? "#3b82f6" : "#9ca3af"}
                trackColor={{ false: "#e5e7eb", true: "#dbeafe" }}
              />
            </View>
          </View>
        </Animated.View>

        {/* Online Status Section */}
        <Animated.View entering={FadeInRight.delay(100)} className="px-5">
          <Text className={`text-lg font-bold mb-4 ${textColor}`}>
            Online Status
          </Text>

          {/* Last Seen */}
          <View className={`p-4 rounded-xl mb-3 ${sectionBgColor}`}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3 flex-1">
                <Ionicons name="time-outline" size={24} color="#f59e0b" />
                <View className="flex-1">
                  <Text className={`text-base font-semibold ${textColor}`}>Last Seen</Text>
                  <Text className={`text-sm ${applied === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    Show when you were last online
                  </Text>
                </View>
              </View>
              <Switch
                value={lastSeenEnabled}
                onValueChange={setLastSeenEnabled}
                thumbColor={lastSeenEnabled ? "#f59e0b" : "#9ca3af"}
                trackColor={{ false: "#e5e7eb", true: "#fed7aa" }}
              />
            </View>
          </View>

          {/* Online Status */}
          <View className={`p-4 rounded-xl mb-3 ${sectionBgColor}`}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3 flex-1">
                <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center">
                  <View className="w-3 h-3 bg-white rounded-full" />
                </View>
                <View className="flex-1">
                  <Text className={`text-base font-semibold ${textColor}`}>Online Status</Text>
                  <Text className={`text-sm ${applied === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    Show when you're online
                  </Text>
                </View>
              </View>
              <Switch
                value={onlineStatusEnabled}
                onValueChange={setOnlineStatusEnabled}
                thumbColor={onlineStatusEnabled ? "#22c55e" : "#9ca3af"}
                trackColor={{ false: "#e5e7eb", true: "#bbf7d0" }}
              />
            </View>
          </View>
        </Animated.View>

        {/* Profile Privacy Section */}
        <Animated.View entering={FadeInRight.delay(200)} className="px-5">
          <Text className={`text-lg font-bold mb-4 ${textColor}`}>
            Profile Privacy
          </Text>

          {/* Profile Photo */}
          <TouchableOpacity 
            className={`p-4 rounded-xl mb-3 ${sectionBgColor}`}
            onPress={() => showVisibilityOptions(profilePhotoVisibility, setProfilePhotoVisibility)}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3 flex-1">
                <Ionicons name="person-circle-outline" size={24} color="#8b5cf6" />
                <View className="flex-1">
                  <Text className={`text-base font-semibold ${textColor}`}>Profile Photo</Text>
                  <Text className={`text-sm ${applied === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    Currently: {profilePhotoVisibility.charAt(0).toUpperCase() + profilePhotoVisibility.slice(1)}
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          {/* Status */}
          <TouchableOpacity 
            className={`p-4 rounded-xl mb-3 ${sectionBgColor}`}
            onPress={() => showVisibilityOptions(statusVisibility, setStatusVisibility)}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3 flex-1">
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#06b6d4" />
                <View className="flex-1">
                  <Text className={`text-base font-semibold ${textColor}`}>Status Updates</Text>
                  <Text className={`text-sm ${applied === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    Currently: {statusVisibility.charAt(0).toUpperCase() + statusVisibility.slice(1)}
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Security Section */}
        <Animated.View entering={FadeInRight.delay(300)} className="px-5">
          <Text className={`text-lg font-bold mb-4 ${textColor}`}>
            Security
          </Text>

          {/* Two-Factor Authentication */}
          <TouchableOpacity 
            className={`p-4 rounded-xl mb-3 ${sectionBgColor}`}
            onPress={showTwoFactorInfo}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3 flex-1">
                <Ionicons name="shield-checkmark-outline" size={24} color="#ef4444" />
                <View className="flex-1">
                  <Text className={`text-base font-semibold ${textColor}`}>Two-Factor Authentication</Text>
                  <Text className={`text-sm ${applied === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    {twoFactorEnabled ? "Enabled" : "Add extra security"}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center space-x-2">
                {twoFactorEnabled && (
                  <View className="w-2 h-2 bg-green-500 rounded-full" />
                )}
                <Feather name="chevron-right" size={20} color="#9ca3af" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Block Unknown Contacts */}
          <View className={`p-4 rounded-xl mb-3 ${sectionBgColor}`}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3 flex-1">
                <Ionicons name="ban-outline" size={24} color="#f97316" />
                <View className="flex-1">
                  <Text className={`text-base font-semibold ${textColor}`}>Block Unknown Contacts</Text>
                  <Text className={`text-sm ${applied === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    Block messages from unknown numbers
                  </Text>
                </View>
              </View>
              <Switch
                value={blockUnknownEnabled}
                onValueChange={setBlockUnknownEnabled}
                thumbColor={blockUnknownEnabled ? "#f97316" : "#9ca3af"}
                trackColor={{ false: "#e5e7eb", true: "#fed7aa" }}
              />
            </View>
          </View>
        </Animated.View>

        {/* Additional Options */}
        <Animated.View entering={FadeInRight.delay(400)} className="px-5 pt-3">
          <Text className={`text-lg font-bold mb-4 ${textColor}`}>
            Additional Options
          </Text>

          {/* Blocked Contacts */}
          <TouchableOpacity className={`p-4 rounded-xl mb-3 ${sectionBgColor}`}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3 flex-1">
                <Ionicons name="person-remove-outline" size={24} color="#dc2626" />
                <View className="flex-1">
                  <Text className={`text-base font-semibold ${textColor}`}>Blocked Contacts</Text>
                  <Text className={`text-sm ${applied === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    Manage blocked users
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity className={`p-4 rounded-xl mb-3 ${sectionBgColor}`}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3 flex-1">
                <Ionicons name="document-text-outline" size={24} color="#6366f1" />
                <View className="flex-1">
                  <Text className={`text-base font-semibold ${textColor}`}>Privacy Policy</Text>
                  <Text className={`text-sm ${applied === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                    Read our privacy policy
                  </Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Help Text */}
        <View className="px-5 pt-6 pb-4">
          <Text className={`text-center text-sm ${applied === "dark" ? "text-slate-500" : "text-gray-500"}`}>
            Your privacy settings help control how others can interact with you and see your information.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}