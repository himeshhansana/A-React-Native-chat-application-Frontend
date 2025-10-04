import { useContext } from "react";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../components/AuthProvider";

export default function SignOutScreen() {
    const auth = useContext(AuthContext);
    return (
        <SafeAreaView className="items-center justify-center flex-1">
            <Button
                title="Log Out"
                onPress={() => {
                    if (auth) auth.signOut();
                }}
            />
        </SafeAreaView>
    );
}
