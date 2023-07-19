import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";

import Logo from "../assets/Loading Screen Icon.svg";
import useScreenDimensions from "../hooks/useScreenDimensions";
import CTAButton from "../components/CTAButton";
import Title from "../components/Title";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { windowWidth, windowHeight } = useScreenDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="w-full h-full bg-purple">
      <View className="flex-1 items-center ">
        <View className="w-full h-fit items-center">
          <Logo width={windowWidth * 0.7} />
          <Text
            style={{ fontFamily: "lalezar" }}
            className="text-[20px] text-bone "
          >
            Make meeting people on events{" "}
            <Text className="text-orange">fun</Text>
          </Text>
        </View>
        <View className="w-full items-center justify-center">
          <View className="w-full h-fit items-center justify-center pt-24">
            <CTAButton text={"Register"} onPress={() => {navigation.navigate("Email_register")}} />
          </View>
        </View>
        <View className="absolute bottom-1">
          <Text
            style={{ fontFamily: "lalezar" }}
            className="text-[20px] text-bone "
          >
            Have an account?{" "}
            <Text
              className="text-orange underline"
              onPress={() => {
                navigation.navigate("Email_login");
              }}
            >
              Login!
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>

    // <View className="flex-1 items-center justify-center bg-purple">
    //   <Logo width={windowWidth * 0.8} />
    // </View>
  );
};

export default WelcomeScreen;
