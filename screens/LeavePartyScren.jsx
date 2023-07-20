import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";

import Logo from "../assets/Loading Screen Icon.svg";
import useScreenDimensions from "../hooks/useScreenDimensions";
import Title from "../components/Title";
import NavBottom from "../components/NavBottom";
import NavButton from "../components/NavButton";
import CTAButton from "../components/CTAButton";
import AuthNavHeader from "../components/auth/AuthNavHeader";

const LeavePartyScren = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-purple">
        <AuthNavHeader />
      <View className="flex-1 items-center w-full">
        <View className="w-full h-fit bg-purple">
          <Title content={"LEAVE"} />
        </View>

        <View className="w-full items-center absolute top-1/2 -translate-y-[100%]">
          <CTAButton
            text={"Leave the party"}
            onPress={() => {
              Alert.alert(
                "Is it time?", // Title
                "We hope that you had a fun time at the party. If you want to register back at this party you will need to scan the QR code again", // Body
                [
                  {
                    text: "Exit",
                    onPress: () => navigation.navigate("NotJoinPartyStack"),
                    style: "destructive",
                  },
                  {
                    text: "Stay",
                    onPress: () => console.log("Stay pressed"),
                    style: "default",
                  },
                ]
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LeavePartyScren;
