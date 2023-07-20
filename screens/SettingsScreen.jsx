import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import NavHeader from "../components/NavHeader";
import Title from "../components/Title";
import SettingsButton from "../components/settings/SettingsButton";
import ButtonBlock from "../components/settings/ButtonBlock";

import { signOut } from "firebase/auth";
import LoadingCover from "../components/LoadingCover";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/actions";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View>
      {loading && <LoadingCover />}
      <SafeAreaView className="w-full h-full bg-purple">
        <NavHeader
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View className="flex-1 items-center ">
          <View className="w-full h-fit">
            <Title content={"SETTINGS"} />
          </View>
          <View className="w-full items-center justify-center">
            <ScrollView className="w-[90vw] h-[60vh]">
              <ButtonBlock title={"Profile settings"}>
                <SettingsButton
                  onPress={() => {}}
                  text={"Change profile pic"}
                />
                <SettingsButton onPress={() => {}} text={"Change my gender"} />
                <SettingsButton onPress={() => {}} text={"Change who I see"} />
              </ButtonBlock>
              {/* Block two */}
              <ButtonBlock title={"General"}>
                <SettingsButton onPress={() => {}} text={"Change password"} />
                <SettingsButton
                  onPress={async () => {
                    setLoading(true);
                    try {
                      await signOut(FIREBASE_AUTH);
                      dispatch(clearUser());
                      Alert.alert(
                        "Signed out",
                        "You were successfully signed out"
                      );
                      navigation.navigate("Welcome");
                    } catch (error) {
                      console.log(error.message);
                      Alert.alert(
                        "Error signing out",
                        "There was an error signing out. Try again later"
                      );
                    } finally {
                      setLoading(false);
                    }
                  }}
                  text={"Logout from account"}
                />
                <SettingsButton
                  onPress={() => {}}
                  text={"Delete account"}
                  contrast
                />
              </ButtonBlock>
              {/* Block Three */}
              <ButtonBlock title={"Contacts"}>
                <SettingsButton onPress={() => {}} text={"Send email"} />
                <SettingsButton onPress={() => {}} text={"View Instagram"} />
              </ButtonBlock>

              {/* Terms and conditions text */}
              <View className="w-full flex-row justify-between h-fit">
                <TouchableOpacity>
                  <Text
                    className="text-center text-lg text-bone"
                    style={{ fontFamily: "lalezar" }}
                  >
                    Terms and conditions
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    className="text-center text-lg text-orange"
                    style={{ fontFamily: "lalezar" }}
                  >
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SettingsScreen;
