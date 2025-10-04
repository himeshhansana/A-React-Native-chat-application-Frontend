import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import CallsScreen from "./callsScreen";
import SettingsScreen from "./SettingScreen";
import NewChatScreen from "./NewChatScreen";
import StatusScreen from "./StatusScreen";

const Stack = createNativeStackNavigator();

export default function ChatsScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            {/* <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
            <Stack.Screen name="CallsScreen" component={CallsScreen} />
            <Stack.Screen name="StatusScreen" component={StatusScreen} /> */}
        </Stack.Navigator>
    );
}