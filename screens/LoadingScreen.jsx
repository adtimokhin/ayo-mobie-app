import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

import Logo from "../assets/Loading Screen Icon.svg";
import useScreenDimensions from "../hooks/useScreenDimensions";

const LoadingScreen = () => {
  const navigation = useNavigation();
  const { windowWidth, windowHeight } = useScreenDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-purple">
      <Logo width={windowWidth * 0.8} />
    </View>
  );
};

export default LoadingScreen;