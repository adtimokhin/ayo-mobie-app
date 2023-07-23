import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import {
  Alert,
  Linking,
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
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/actions";
import { deleteUserAccount } from "../utils/userActions";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.user).user;
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
                  onPress={() => {
                    navigation.navigate("ChangePhoto", {
                      photoUrl: userData.imageName,
                      userUID: userData.uid,
                    });
                  }}
                  text={"Change profile pic"}
                />
                <SettingsButton
                  onPress={() => {
                    navigation.navigate("ChangeGender", {
                      currentSex: userData.sex,
                    });
                  }}
                  text={"Change my gender"}
                />
                <SettingsButton
                  onPress={() => {
                    navigation.navigate("ChangeSexOfInterest", {
                      currentSex: userData.sexOfInterest,
                    });
                  }}
                  text={"Change who I see"}
                />
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
                  onPress={() => {
                    Alert.alert(
                      "Are you sure you want to delete this account?",
                      "If you delete this account, you will not be able to restore any of the data.",
                      [
                        {
                          text: "Delete",
                          onPress: async () => {
                            try {
                              setLoading(true);
                              await deleteUserAccount();
                            } catch (error) {
                              Alert.alert(
                                "An error has occurred while deleting this account. Try again!"
                              );
                            } finally {
                              setLoading(false);
                            }
                          },
                          style: "destructive",
                        },
                        {
                          text: "Cancel",
                          onPress: () => console.log("Stay pressed"),
                          style: "default",
                        },
                      ]
                    );
                  }}
                  text={"Delete account"}
                  contrast
                />
              </ButtonBlock>
              {/* Block Three */}
              <ButtonBlock title={"Contacts"}>
                <SettingsButton
                  onPress={async () => {
                    const emailReceiver = "ayo.notifications@gmail.com";
                    const subject = "App Help";

                    const url = `mailto:${emailReceiver}?subject=${encodeURIComponent(
                      subject
                    )}`;

                    const canOpenURL = await Linking.canOpenURL(url);
                    if (canOpenURL) {
                      Linking.openURL(url);
                    } else {
                      Alert.alert("Could not open your mail application.");
                    }
                  }}
                  text={"Send us email"}
                />
                <SettingsButton
                  onPress={async () => {
                    const url = "instagram://user?username=ayo_theone";

                    // Check if the Instagram app can be opened
                    const canOpenURL = await Linking.canOpenURL(url);

                    if (canOpenURL) {
                      Linking.openURL(url);
                    } else {
                      // If the Instagram app isn't installed, open in the browser
                      Linking.openURL(`https://www.instagram.com/ayo_theone`);
                    }
                  }}
                  text={"View Instagram"}
                />
              </ButtonBlock>

              {/* Terms and conditions text */}
              <View className="w-full flex-row justify-between h-fit">
                <TouchableOpacity
                  onPress={async () => {
                    // TODO: Change this link to the real terms and conditions file
                    Linking.openURL(
                      "https://github.com/adtimokhin/ayo-web/blob/main/terms.txt"
                    );
                  }}
                >
                  <Text
                    className="text-center text-lg text-bone"
                    style={{ fontFamily: "lalezar" }}
                  >
                    Terms and conditions
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    // TODO: Change this link to the real Privacy Policy file
                    Linking.openURL(
                      "https://github.com/adtimokhin/ayo-web/blob/main/terms.txt"
                    );
                  }}
                >
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
