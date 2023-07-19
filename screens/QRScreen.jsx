import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

import Logo from "../assets/Loading Screen Icon.svg";
import useScreenDimensions from "../hooks/useScreenDimensions";
import Title from "../components/Title";
import NavBottom from "../components/NavBottom";
import NavButton from "../components/NavButton";

import CTAButton from "../components/CTAButton";

const QRScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-purple">
      <View className="flex-1 items-center ">
        <View className="w-full h-fit">
          <Title content={"SCAN QR"} />
        </View>

        <View className="w-full items-center absolute top-1/2 -translate-y-[100%]">
          <CTAButton text={"Join Party"} onPress={() => {}} />
        </View>
        {/* TODO: Add text that would expplain that user needs to scan QR */}
      </View>
    </SafeAreaView>
  );
};

export default QRScreen;
