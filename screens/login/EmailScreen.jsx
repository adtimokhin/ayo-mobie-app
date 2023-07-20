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
import NavHeader from "../../components/NavHeader";
import { validateEmail } from "../../utils/regex";

const EmailScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const [email, setEmail] = useState("");

  const checkEmail = () => {
    if (validateEmail(email)) {
      navigation.navigate("Password_login", { email: email });
    } else {
      Alert.alert("Error", "Please enter a valid email");
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-purple">
      <View className=" bg-transparent w-full h-[50] justify-center pl-1"></View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center ">
          <View className="w-full h-fit">
            <Title content={"EMAIL"} />
          </View>
          <View className="w-full items-center justify-center">
            <View id="login_form" className="w-[90%]">
              <View className="w-full h-fit ">
                <FormLabel label="What’s your email?" />
                <TextInput
                  className="w-full bg-[#C1ACE9] h-[40px] rounded-[14px] text-[#4E22A1] px-3"
                  style={{ fontFamily: "lalezar" }}
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
            <View className="w-full h-fit items-center justify-center pt-24">
              <CTAButton
                text={"Next"}
                onPress={checkEmail}
                disabled={email === ""}
              />
            </View>
          </View>
          <View className="absolute bottom-1">
            <Text
              style={{ fontFamily: "lalezar" }}
              className="text-[20px] text-bone "
            >
              Don’t have an account?{" "}
              <Text
                className="text-orange underline"
                onPress={() => {
                  // TODO: Handle navigation to the register section
                  navigation.navigate("Email_register");
                }}
              >
                Register first!
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default EmailScreen;
