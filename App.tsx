import "./global.css";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/screens/SplashScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import AboutScreen from "./src/screens/AboutScreen";
import SettingScreen from "./src/screens/SettingScreen";
import PrivacySettingsScreen from "./src/screens/PrivacySettingsScreen";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import ContactScreen from "./src/screens/ContactScreen";
import AvatarScreen from "./src/screens/AvatarScreen";
import { UserRegistrationProvider } from "./src/components/UserContext";
import { AlertNotificationRoot } from "react-native-alert-notification";
import HomeTabs from "./src/screens/HomeTabs";
import SingleChatScreen from "./src/screens/SingleChatScreen";
import { WebSocketProvider } from "./src/socket/WebSocketProvider";
import NewChatScreen from "./src/screens/NewChatScreen";
import NewContactScreen from "./src/screens/NewContactScreen";
import { useWebSocketPing } from "./src/socket/UseWebSocketPing";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./src/components/AuthProvider";
import SignOutScreen from "./src/screens/SignOut";

export type RootStack = {
  SplashScreen: undefined;
  SignUpScreen: undefined;
  ContactScreen: undefined;
  AvatarScreen: undefined;
  SignInScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  AboutScreen: undefined;
  SettingScreen: undefined;
  PrivacySettingsScreen: undefined;
  SingleChatScreen: {
    chatId: number;
    friendName: string;
    lastSeenTime: string;
    profileImage: string;
  };
  NewChatScreen: undefined;
  NewContactScreen: undefined;
  SignOutScreen: undefined;
};


const Stack = createNativeStackNavigator<RootStack>();

function ChatApp() {
  const auth = useContext(AuthContext);

  return (
    <WebSocketProvider userId={auth ? Number(auth.userId) : 0}>
      <ThemeProvider>
        <UserRegistrationProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="SplashScreen"
              screenOptions={{
                animation: "fade",
              }}
            >
              {auth?.isLoading ? (
                <Stack.Screen
                  name="SplashScreen"
                  component={SplashScreen}
                  options={{ headerShown: false }}
                />
              ) : auth?.userId === null ? (
                // User not sign up
                <Stack.Group>
                  <Stack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ContactScreen"
                    component={ContactScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="AvatarScreen"
                    component={AvatarScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                    options={{ headerShown: false }}
                  />
                </Stack.Group>
              ) : (
                // When user sign up completed
                <Stack.Group>
                  <Stack.Screen
                    name="HomeScreen"
                    component={HomeTabs}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SingleChatScreen"
                    component={SingleChatScreen}
                  />
                  <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                  />
                  <Stack.Screen
                    name="AboutScreen"
                    component={AboutScreen}
                  />
                  <Stack.Screen
                    name="SettingScreen"
                    component={SettingScreen}
                  />
                  <Stack.Screen
                    name="PrivacySettingsScreen"
                    component={PrivacySettingsScreen}
                  />
                  <Stack.Screen
                    name="NewChatScreen"
                    component={NewChatScreen}
                  />
                  <Stack.Screen
                    name="NewContactScreen"
                    component={NewContactScreen}
                  />
                  <Stack.Screen
                    name="SignOutScreen"
                    component={SignOutScreen}
                  />
                </Stack.Group>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </UserRegistrationProvider>
      </ThemeProvider>
    </WebSocketProvider>
  );
}

export default function App() {
  return (
    <AlertNotificationRoot>
      <AuthProvider>
        <ChatApp />
      </AuthProvider>
    </AlertNotificationRoot>
  );
}
