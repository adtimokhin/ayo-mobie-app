import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";

import Logo from "../assets/Loading Screen Icon.svg";
import useScreenDimensions from "../hooks/useScreenDimensions";
import CTAButton from "../components/CTAButton";
import Title from "../components/Title";
import { Linking } from "react-native";

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
            <CTAButton
              text={"Register"}
              onPress={() => {
                navigation.navigate("Email_register");
              }}
            />
            <Text
              style={{ fontFamily: "lalezar" }}
              className="text-[20px] text-bone "
            >
              OR
            </Text>
            <CTAButton
              text={"Login"}
              onPress={() => {
                navigation.navigate("Email_login");
              }}
            />
          </View>
        </View>
        <View className="absolute bottom-1">
          <Text
            style={{ fontFamily: "lalezar" }}
            className="text-[14px] text-bone/70 text-center "
          >
            By continuing you agree to{" "}
            <Text
              className="text-orange/70 underline"
              onPress={() => {
                Linking.openURL(
                  "https://github.com/adtimokhin/ayo-web/blob/main/terms.txt"
                );
              }}
            >
              terms and conditions
            </Text>{" "}
            and{" "}
            <Text
              className="text-orange/70 underline"
              onPress={() => {
                Linking.openURL(
                  "https://github.com/adtimokhin/ayo-web/blob/main/privacy.txt"
                );
              }}
            >
              {" "}
              privacy policy
            </Text>{" "}
            of the app
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
