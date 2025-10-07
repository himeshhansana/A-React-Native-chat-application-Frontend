import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import CallsScreen from "./callsScreen";
import ChatsScreen from "./ChatsScreen";
import StatusScreen from "./StatusScreen";
import SettingsScreen from "./SettingScreen";


import { Platform } from "react-native";

const Tabs = createBottomTabNavigator();
export default function HomeTabs() {
    return (
        <Tabs.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap = 'chatbubble-ellipses';
                if (route.name === 'Chats') iconName = "chatbubble-ellipses";
                else if (route.name === 'Status') iconName = "time";
                else if (route.name === 'Calls') iconName = "call";
                else if (route.name === 'Settings') iconName = "settings";
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarLabelStyle: { fontSize: 13 },
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'black',
            headerShown: false,
            tabBarStyle: {
                height: 90,
                padding: 8
            }
        })}>
            <Tabs.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false }} />
            {/* <Tabs.Screen name="Chats" component={ChatsScreen} options={{ headerShown: Platform.OS === "ios" ? true : false, }} /> */}

            <Tabs.Screen name="Status" component={StatusScreen} options={{ headerShown: true }} />
            <Tabs.Screen name="Calls" component={CallsScreen} options={{ headerShown: true }} />
            <Tabs.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true }} />
        </Tabs.Navigator>
    );
}


