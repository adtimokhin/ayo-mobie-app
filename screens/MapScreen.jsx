import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";

import Logo from "../assets/Loading Screen Icon.svg";
import useScreenDimensions from "../hooks/useScreenDimensions";
import Title from "../components/Title";
import NavBottom from "../components/NavBottom";
import NavButton from "../components/NavButton";

const MapScreen = () => {
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
          <Title content={"MAP"} />
        </View>

      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
