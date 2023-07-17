import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Title from "../components/Title";
import CTAButton from "../components/CTAButton";

const LoginScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 items-center justify-center bg-purple">
        <Title content={"LOGIN"} />
        <View id="login_form" className="w-[90%] border-[6px] border-[#4E22A1]">
          <View className="w-full h-fit items-center justify-center">
            <Text
              style={{ fontFamily: "lalezar", letterSpacing: "-1%" }}
              className="text-[32px] text-bone"
            >
              Email:
            </Text>

            <TextInput
              className="w-[90%] bg-[#C1ACE9] h-[38px] rounded-[14px] text-[#4E22A1] px-3"
              style={{ fontFamily: "lalezar" }}
              placeholder="EMAIL"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
            />
          </View>
          <View className="w-full h-fit items-center justify-center">
            <Text
              style={{ fontFamily: "lalezar", letterSpacing: "-1%" }}
              className="text-[32px] text-bone"
            >
              Password:
            </Text>

            <TextInput
              className="w-[90%] bg-[#C1ACE9] h-[38px] rounded-[14px] text-[#4E22A1] px-3"
              style={{ fontFamily: "lalezar" }}
              placeholder="****"
              secureTextEntry
              autoCorrect={false}
              spellCheck={false}
            />
          </View>

          <View className="w-full h-fit items-center justify-center">
            <CTAButton text={"LET'S GO!"} onPress={() => {}} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
