import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
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
import { validateEmail } from "../../utils/regex";

// Fixed

const EmailRegisterScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const [email, setEmail] = useState("");

  const handleEmailValidation = () => {
    if (validateEmail(email)) {
      navigation.navigate("Password_register", { email: email });
    } else {
      Alert.alert("Invalid Email", "Please, enter a valid email");
    }
  };

  return (
    <SafeAreaView
      style={{ width: "100%", height: "100%", backgroundColor: "#5F29C7" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, alignContent: "center" }}>
          <View style={{ width: "100%" }}>
            <Title content={"EMAIL"} />
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View id="login_form" style={{ width: "90%" }}>
              <View style={{ width: "100%" }}>
                <FormLabel label="What’s your email?" />
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
                  placeholder="EMAIL"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  spellCheck={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 96,
              }}
            >
              <CTAButton
                text={"Next"}
                onPress={handleEmailValidation}
                disabled={email === ""}
              />
            </View>
          </View>
          <View style={{ position: "absolute", bottom: 3, width: "100%" }}>
            <Text
              style={{
                fontFamily: "lalezar",
                fontSize: 20,
                color: "#FCFBFC",
                width: "100%",
                textAlign: "center",
              }}
            >
              Already have an account?{" "}
              <Text
                style={{ color: "#FE6244", textDecorationLine: "underline" }}
                onPress={() => {
                  navigation.navigate("Email_login");
                }}
              >
                Login!
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default EmailRegisterScreen;
