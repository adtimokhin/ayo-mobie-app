import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";

import Logo from "../assets/Loading Screen Icon.svg";
import useScreenDimensions from "../hooks/useScreenDimensions";
import Title from "../components/Title";
import NavBottom from "../components/NavBottom";
import NavButton from "../components/NavButton";
import Map from "../components/Map";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import AuthNavHeader from "../components/auth/AuthNavHeader";
import { useSelector } from "react-redux";

const MapScreen = () => {
  const navigation = useNavigation();

  //   TODO: Remove after testing
  const user = useSelector((state) => state.user).user; // Here you're retrieving the user data from your Redux store
  console.log(user);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 w-full h-full items-center justify-center bg-purple">
      <AuthNavHeader text="PARTIES AROUND YOU" />
      {/* TODO: Go around and remove the Title component */}
      <View className="flex-1 items-center ">
        {/* <View className="w-full h-fit">
          <Title content={"MAP"} />
        </View> */}

        <View className="w-[100vw] h-[100vh] bg-black">
          <Map />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
