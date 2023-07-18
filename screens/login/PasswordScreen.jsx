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

const PasswordScreen = ({ route, navigation }) => {
  //   const navigation = useNavigation();
  const { email } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    // TODO: Handle login event
    if (password === "") {
      Alert.alert("Error", "Both fields are required");
    } else {
      Alert.alert("Success", `Password: ${password}, Email: ${email}`);
    }
  };

  return (
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
              <CTAButton text={"Login"} onPress={handleLogin} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PasswordScreen;
