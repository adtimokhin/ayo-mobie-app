import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import {
  View,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import Title from "../components/Title";
import CTAButton from "../components/CTAButton";
import FormLabel from "../components/forms/FormLabel";

const LoginScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Both fields are required");
    } else {
      Alert.alert("Success", `Email: ${email}, Password: ${password}`);
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-purple">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center ">
          <View className="w-full h-fit">
            <Title content={"LOGIN"} />
          </View>
          <View className="w-full items-center justify-center">
            <View
              id="login_form"
              className="w-[90%] border-[6px] border-[#4E22A1] p-2"
            >
              <View className="w-full h-fit items-center justify-center">
                <FormLabel label="Email:" />
                <TextInput
                  className="w-[90%] bg-[#C1ACE9] h-[38px] rounded-[14px] text-[#4E22A1] px-3"
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
              <View className="w-full h-fit items-center justify-center pt-4">
                <FormLabel label="Password:" />
                <TextInput
                  className="w-[90%] bg-[#C1ACE9] h-[38px] rounded-[14px] text-[#4E22A1] px-3"
                  style={{ fontFamily: "lalezar" }}
                  placeholder="********"
                  secureTextEntry
                  autoCorrect={false}
                  spellCheck={false}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View className="w-full h-fit items-center justify-center pt-12">
                <CTAButton text={"LET'S GO!"} onPress={handleLogin} />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;
