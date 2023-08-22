import { useLayoutEffect, useState } from "react";
import {
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import Title from "../../components/Title";
import CTAButton from "../../components/CTAButton";
import FormLabel from "../../components/forms/FormLabel";

import { FIREBASE_AUTH } from "../../firebaseConfig";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import LoadingCover from "../../components/LoadingCover";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";

const ConfimEmailRegisterScreen = ({ route, navigation }) => {
  const auth = FIREBASE_AUTH;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { email, password } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const handleLogin = async () => {
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
        console.log(result);
        // TODO: Set the context for the signed in user data
        dispatch(setUser({ email: result.email, uid: result.uid }));
        navigation.navigate("NotJoinPartyStack");
      }
    } catch (error) {
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
  };

  return (
    <View>
      {loading && <LoadingCover />}
      <SafeAreaView
        style={{ width: "100%", height: "100%", backgroundColor: "#5F29C7" }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ width: "100%" }}>
              <Title content={"CONFIRM"} />
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
                  <FormLabel label="We sent you an email. Follow the link to verify your email" />
                </View>
              </View>
              <View
                style={{
                  width: "60%",
                  height: 300,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></View>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 96,
                }}
              >
                <CTAButton text={"Press to Login"} onPress={handleLogin} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};

export default ConfimEmailRegisterScreen;
