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
import ImageChose from "../../components/forms/ImageChose";

const ConfimEmailRegisterScreen = ({ route, navigation }) => {
  //   const navigation = useNavigation();
//   const { email, password, gender, sexOfInterest } = route.params;
  const [imageUrl, setImageUrl] = useState(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const handleLogin = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView className="w-full h-full bg-purple">
      <View className=" bg-transparent w-full h-[50] justify-center pl-1"></View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center ">
          <View className="w-full h-fit">
            <Title content={"CONFIRM"} />
          </View>
          <View className="w-full items-center justify-center">
            <View id="login_form" className="w-[90%]">
              <View className="w-full h-fit ">
                <FormLabel label="We sent you an email. Follow the link to verify your email" />
              </View>
            </View>
            <View className="w-[60%] h-[300px] items-center justify-center "></View>
            <View className="w-full h-fit items-center justify-center pt-24">
              <CTAButton
                text={"Press to Login"}
                onPress={handleLogin}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ConfimEmailRegisterScreen;
