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

// Fixed

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

  // TODO: Remove the button logic from this component. It should be in other files.
  return (
    <View style={{ flex: 1, backgroundColor: "#5F29C7" }}>
      {/* Component appears only when the screen switches to the loading state */}
      {loading && <LoadingCover />}

      {/* Main Content of the Page */}
      <SafeAreaView style={{ flex: 1 }}>
        <NavHeader
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Title content={"SETTINGS"} />

        {/* Settings Options */}
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Notice: This top View component is necessary since we cannot 
          set position for the objects in the ScrollView component */}
          <ScrollView
            style={{
              flex: 1,
              width: "90%",
              height: "60%",
            }}
          >
            {/* Profile Settings */}
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
              {/* FIXME: For now these option will remain disabled. */}
              {/* <SettingsButton
                onPress={() => {
                  navigation.navigate("ChangeGender", {
                    currentSex: userData.sex,
                  });
                }}
                text={"Change my gender"}
              /> */}
              {/* <SettingsButton
                onPress={() => {
                  navigation.navigate("ChangeSexOfInterest", {
                    currentSex: userData.sexOfInterest,
                  });
                }}
                text={"Change who I see"}
              /> */}
            </ButtonBlock>

            {/* Account Settings */}
            <ButtonBlock title={"General"}>
              <SettingsButton
                onPress={() => {
                  Alert.alert(
                    "Sorry!",
                    "This feature is not available since our coders are too busy partying :)"
                  );
                }}
                text={"Change password"}
              />
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

            {/* Contact Information */}
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
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between", // This is similar to `justify-between`
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "https://github.com/adtimokhin/ayo-web/blob/main/terms.txt"
                  );
                }}
              >
                <Text
                  style={{
                    fontFamily: "lalezar",
                    textAlign: "center",
                    fontSize: 18,
                    color: "rgba(252, 251, 252, 0.5)",
                  }}
                >
                  Terms and conditions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "https://github.com/adtimokhin/ayo-web/blob/main/privacy.txt"
                  );
                }}
              >
                <Text
                  style={{
                    fontFamily: "lalezar",
                    textAlign: "center",
                    fontSize: 18,
                    color: "rgba(252, 251, 252, 0.5)",
                  }}
                >
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SettingsScreen;
