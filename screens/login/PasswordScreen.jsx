import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
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
          dispatch(
            setUser({ email: user.email, uid: user.uid, ...userData })
          );
          navigation.navigate("NotJoinPartyStack");
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
      {loading && <LoadingCover text="Trying to log you in..." />}
      <SafeAreaView className="w-full h-full bg-purple">
        <NavHeader
          onPress={() => {
            navigation.navigate("Email_login");
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 items-center ">
            <View className="w-full h-fit">
              <Title content={"PASSWORD"} />
            </View>
            <View className="w-full items-center justify-center">
              <View id="login_form" className="w-[90%]">
                <View className="w-full h-fit ">
                  <FormLabel label="Enter your password:" />
                  <TextInput
                    className="w-full bg-[#C1ACE9] h-[40px] rounded-[14px] text-[#4E22A1] px-3"
                    style={{ fontFamily: "lalezar" }}
                    placeholder="********"
                    secureTextEntry
                    autoCorrect={false}
                    spellCheck={false}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>
              <View className="w-full h-fit items-center justify-center pt-24">
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
