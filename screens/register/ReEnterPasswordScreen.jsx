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

// Fixed

const ReEnterPasswordRegisterScreen = ({ route, navigation }) => {
  const passwordOne = route.params?.passwordOne;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (password !== passwordOne) {
      Alert.alert("Passwords do not match");
    } else {
      navigation.navigate("Gender_register", {
        email: route.params.email,
        password: passwordOne,
      });
    }
  };

  return (
    <SafeAreaView
      style={{ width: "100%", height: "100%", backgroundColor: "#5F29C7" }}
    >
      <NavHeader
        onPress={() => {
          navigation.navigate("Password_register");
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ width: "100%" }}>
            <Title content={"AGAIN"} />
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
                <FormLabel label="Re-enter your password:" />
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
                text={"Next"}
                onPress={handleLogin}
                disabled={password === ""}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ReEnterPasswordRegisterScreen;
