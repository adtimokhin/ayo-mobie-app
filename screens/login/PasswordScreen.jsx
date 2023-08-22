import { useLayoutEffect, useState } from "react";
import {
  View,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import Title from "../../components/Title";
import CTAButton from "../../components/CTAButton";
import FormLabel from "../../components/forms/FormLabel";
import NavHeader from "../../components/NavHeader";
import { FIREBASE_AUTH } from "../../firebaseConfig";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import LoadingCover from "../../components/LoadingCover";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";
import { getUserData } from "../../utils/userActions";

//Fixed

const PasswordScreen = ({ route, navigation }) => {
  const auth = FIREBASE_AUTH;

  // Navigation parameters
  const { email } = route.params;

  // Hooks
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleLogin = async () => {
    if (password === "") {
      Alert.alert("Error", "You did not enter your password");
    } else {
      try {
        setLoading(true);
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        // Only letting the user to use the app if they verified their email address.
        if (!user.emailVerified) {
          // Deny access if email is not verified
          await signOut(FIREBASE_AUTH);
          Alert.alert(
            "The email address has not been verified. Check your email for the verification link"
          );
          setLoading(false);
          return;
          // throw new Error("Email is not verified");
        } else {
          // Fetch data from the database about a user.
          const userData = await getUserData(user.uid);
          dispatch(setUser({ email: user.email, uid: user.uid, ...userData }));

          if (userData.partyUID !== undefined && userData.partyUID !== null) {
            // If they are registered at some party pool then we need to navigate them to the correct screen
            navigation.navigate("JoinPartyStack");
          } else {
            navigation.navigate("NotJoinPartyStack");
          }
        }
      } catch (error) {
        setPassword("");
        let errorMessage = "";
        // Setting an error message that we can display in the Alert
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage =
              "Please ensure your email address is correctly formatted.";
            break;
          case "auth/user-disabled":
            errorMessage =
              "This account has been disabled. Please contact support for help.";
            break;
          case "auth/user-not-found":
            errorMessage =
              "There is no account associated with this email address.";
            break;
          case "auth/wrong-password":
            errorMessage =
              "The password you entered is incorrect. Please try again.";
            break;
          case "auth/too-many-requests":
            errorMessage =
              "Too many failed attempts have been made from this device. Please try again later.";
            break;
          case "auth/network-request-failed":
            errorMessage =
              "A network error occurred. Please check your connection and try again.";
            break;
          case "Email is not verified":
            errorMessage =
              "The email address has not been verified. Check your email for the verification link";
            break;
          default:
            errorMessage = "An unknown error occurred. Please try again.";
            console.log(error.message); // TODO: Maybe even send the error message to the backend
            break;
        }

        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }

      // navigation.navigate("Home");
    }
  };

  return (
    <View>
      {loading && <LoadingCover />}
      <SafeAreaView
        style={{ width: "100%", height: "100%", backgroundColor: "#5F29C7" }}
      >
        <NavHeader
          onPress={() => {
            navigation.navigate("Email_login");
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ width: "100%" }}>
              <Title content={"PASSWORD"} />
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View id="login_form" style={{ width: "90%" }}>
                <View style={{ width: "100%" }}>
                  <FormLabel label="Enter your password:" />
                  <TextInput
                    style={{
                      fontFamily: "lalezar",
                      width: "100%",
                      backgroundColor: "#C1ACE9",
                      height: 40,
                      borderRadius: 14,
                      color: "#4E22A1",
                      paddingHorizontal: 12,
                    }}
                    placeholder="********"
                    secureTextEntry
                    autoCorrect={false}
                    spellCheck={false}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 96,
                }}
              >
                <CTAButton
                  text={"Login"}
                  onPress={handleLogin}
                  disabled={!loading && password === ""}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};

export default PasswordScreen;
