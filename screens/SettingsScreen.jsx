import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Logo from "../assets/Loading Screen Icon.svg";
import useScreenDimensions from "../hooks/useScreenDimensions";
import NavHeader from "../components/NavHeader";
import Title from "../components/Title";
import FormLabel from "../components/forms/FormLabel";
import RadioButtonCollection from "../components/forms/RadioButtonCollection";
import CTAButton from "../components/CTAButton";
import SettingsButton from "../components/settings/SettingsButton";
import ButtonBlock from "../components/settings/ButtonBlock";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { windowWidth, windowHeight } = useScreenDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="w-full h-full bg-purple">
      <NavHeader
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View className="flex-1 items-center ">
        <View className="w-full h-fit">
          <Title content={"SETTINGS"} />
        </View>
        <View className="w-full items-center justify-center">
          <ScrollView className="w-[90vw] h-[60vh]">
            <ButtonBlock title={"Profile settings"}>
              <SettingsButton onPress={() => {}} text={"Change profile pic"} />
              <SettingsButton onPress={() => {}} text={"Change my gender"} />
              <SettingsButton onPress={() => {}} text={"Change who I see"} />
            </ButtonBlock>
            {/* Block two */}
            <ButtonBlock title={"General"}>
              <SettingsButton onPress={() => {}} text={"Change password"} />
              <SettingsButton onPress={() => {}} text={"Logout from account"} />
              <SettingsButton
                onPress={() => {}}
                text={"Delete account"}
                contrast
              />
            </ButtonBlock>
            {/* Block Three */}
            <ButtonBlock title={"Contacts"}>
              <SettingsButton onPress={() => {}} text={"Send email"} />
              <SettingsButton onPress={() => {}} text={"View Instagram"} />
            </ButtonBlock>

            {/* Terms and conditions text */}
            <View className="w-full flex-row justify-between h-fit">
              <TouchableOpacity>
                <Text
                  className="text-center text-lg text-bone"
                  style={{ fontFamily: "lalezar" }}
                >
                  Terms and conditions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  className="text-center text-lg text-orange"
                  style={{ fontFamily: "lalezar" }}
                >
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          {/* <View className="w-[90vw] h-fit items-center pt-24">
              <ButtonBlock title={"Profile settings"}>
                <SettingsButton
                  onPress={() => {}}
                  text={"Change profile pic"}
                />
                <SettingsButton onPress={() => {}} text={"Change my gender"} />
                <SettingsButton onPress={() => {}} text={"Change who I see"} />
              </ButtonBlock>
              <ButtonBlock title={"General"}>
                <SettingsButton onPress={() => {}} text={"Change password"} />
                <SettingsButton
                  onPress={() => {}}
                  text={"Logout from account"}
                />
                <SettingsButton
                  onPress={() => {}}
                  text={"Delete account"}
                  contrast
                />
              </ButtonBlock>
            </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
