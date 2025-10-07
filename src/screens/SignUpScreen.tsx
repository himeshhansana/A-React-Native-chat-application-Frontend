import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { useTheme } from "../theme/ThemeProvider";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateFirstName, validateLastName } from "../util/Validation";

type SignUpProps = NativeStackNavigationProp<RootStack, "SignUpScreen">;

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpProps>();
  const { applied } = useTheme();
  const logo =
    applied === "light"
      ? require("../../assets/logo-dark.png")
      : require("../../assets/logo.png");

  const { userData, setUserData } = useUserRegistration();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
      className="items-center flex-1 "
    >
      <SafeAreaView className="items-center justify-center p-5">
        <StatusBar hidden={true} />
        <Image source={logo} className="h-40 w-36" />
        <View className="items-start justify-start w-full">
          <Text className="font-bold text-slate-500 ">
            Create your account and start the conversation TODAY
          </Text>
        </View>
        <View className="self-stretch">
          <View className="w-full my-3">
            <FloatingLabelInput
              label={"Enter Your First Name"}
              value={userData.firstName}
              onChangeText={(text) => {
                setUserData((previous) => ({
                  ...previous,
                  firstName: text,
                }));
              }}
            />
          </View>
          <View className="w-full my-3">
            <FloatingLabelInput
              label={"Enter Your Last Name"}
              value={userData.lastName}
              onChangeText={(text) => {
                setUserData((previous) => ({
                  ...previous,
                  lastName: text,
                }));
              }}
            />
          </View>
        </View>
      </SafeAreaView>
      <View className="w-full px-5 mt-1">
        <Pressable
          className="items-center justify-center bg-purple-600 rounded-full h-14"
          onPress={() => {
            let validFirstName = validateFirstName(userData.firstName);
            let validLastName = validateLastName(userData.lastName);
            if (validFirstName) {
              // skip null
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: validFirstName,
              });
            } else if (validLastName) {
              // skip null
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: validLastName,
              });
            } else {
              navigation.navigate("ContactScreen");
            }
          }}
        >
          <Text className="text-lg font-bold text-slate-100">Next</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
