import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View, } from "react-native";
import CountryPicker, { Country, CountryCode, } from "react-native-country-picker-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { ALERT_TYPE, AlertNotificationRoot, Toast, } from "react-native-alert-notification";
import { validateCountryCode, validatePhoneNo } from "../util/Validation";


type ContactProps = NativeStackNavigationProp<RootStack, "ContactScreen">;

export default function ContactScreen() {
  const navigation = useNavigation<ContactProps>();

  const [countryCode, setCountryCode] = useState<CountryCode>("LK"); // default country code
  const [country, setCountry] = useState<Country | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const { userData, setUserData } = useUserRegistration();
  const [callingCode, setCallingCode] = useState("+94");
  const [phoneNo, setPhoneNo] = useState("");

  return (
    <SafeAreaView className="items-center flex-1 bg-white">
      <StatusBar hidden={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
      >
        <View className="items-center flex-1 p-5">
          <View>
            <Image
              source={require("../../assets/logo11.png")}
              className="h-40 w-36"
            />
          </View>
          <View>
            <Text className="font-bold text-slate-600">
              We use your contacts to help you find friends who are already on
              the app. Your contacts stay private.
            </Text>
          </View>
          <View className="w-full mt-5">
            <View className="flex-row items-center justify-center mb-3 border-b-2 border-b-purple-600 h-14">
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCountryNameButton
                withCallingCode
                visible={show}
                onClose={() => {
                  setShow(false);
                }}
                onSelect={(c) => {
                  setCountryCode(c.cca2);
                  setCountry(c);
                  setShow(false);
                }}
              />

              <AntDesign
                name="caret-down"
                size={18}
                color="black"
                style={{ marginTop: 5 }}
              />
            </View>
            <View className="flex flex-row justify-center mt-2">
              <TextInput
                inputMode="tel"
                className="h-16 font-bold text-lg border-y-2 border-y-purple-600 w-[18%]"
                placeholder="+94"
                editable={false}
                value={country ? `+${country.callingCode}` : callingCode}
                onChangeText={(text) => {
                  setCallingCode(text);
                }}
              />
              <TextInput
                inputMode="tel"
                className="h-16 font-bold text-lg border-y-2 border-y-purple-600 w-[80%] ml-2"
                placeholder="77 #### ###"
                value={phoneNo}
                onChangeText={(text) => {
                  setPhoneNo(text);
                }}
              />
            </View>
          </View>
          <View className="w-full mt-16">
            <Pressable
              className="items-center justify-center w-full bg-purple-600 rounded-full h-14"
              onPress={() => {
                const validCountryCode = validateCountryCode(callingCode);
                const validPhoneNo = validatePhoneNo(phoneNo);

                if (validCountryCode) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validCountryCode,
                  });
                } else if (validPhoneNo) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validPhoneNo,
                  });
                } else {
                  setUserData((previous) => ({
                    ...previous,
                    countryCode: country
                      ? `+${country.callingCode}`
                      : callingCode,
                    contactNo: phoneNo,
                  }));
                  navigation.replace("AvatarScreen");
                }
              }}
            >
              <Text className="text-xl font-bold text-slate-50">Next</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
