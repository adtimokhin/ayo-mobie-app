import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

import Logo from "../assets/Loading Screen Icon.svg";
import useScreenDimensions from "../hooks/useScreenDimensions";
import Title from "../components/Title";
import NavBottom from "../components/NavBottom";
import NavButton from "../components/NavButton";
import MatchGallery from "../components/photo/MatchGallery";

const MatchScrollScreen = () => {
  const navigation = useNavigation();
  const { windowWidth, windowHeight } = useScreenDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-purple">
      <View className="flex-1 items-center  ">
        <View className="w-[100vw] h-fit">
          <Title content={"MACTHES"} />
        </View>
        <View className="w-full items-center justify-center flex-1 pb-[45px] h-fit">
          <MatchGallery
            photos={[
              {
                id: "1",
                uri: "https://adtimokhin.github.io/family_photos_json_server/images/jacob/jacob5.jpg",
              },
              {
                id: "2",
                uri: "https://adtimokhin.github.io/family_photos_json_server/images/jacob/jacob3.jpg",
              },
              {
                id: "3",
                uri: "https://adtimokhin.github.io/family_photos_json_server/images/jacob/jacob2.jpg",
              },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MatchScrollScreen;
