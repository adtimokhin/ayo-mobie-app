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
import RadioButtonCollection from "../../components/forms/RadioButtonCollection";

const SexOfInterestRegisterScreen = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const [gender, setGender] = useState("");

  const handleLogin = () => {
    // TODO: Handle login event

    navigation.navigate("Photo_register", {
      ...route.params,
      sexOfInterest: gender,
    });
  };

  return (
    <SafeAreaView className="w-full h-full bg-purple">
      <NavHeader
        onPress={() => {
          navigation.navigate("Gender_register");
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center ">
          <View className="w-full h-fit">
            <Title content={"INTERESTS"} />
          </View>
          <View className="w-full items-center justify-center">
            <View id="login_form" className="w-[90%]">
              <View className="w-full h-fit ">
                <FormLabel label="Whose profiles do you want to see:" />
                {/* <TextInput
                  className="w-full bg-[#C1ACE9] h-[40px] rounded-[14px] text-[#4E22A1] px-3"
                  style={{ fontFamily: "lalezar" }}
                  placeholder="EMAIL"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  spellCheck={false}
                  value={email}
                  onChangeText={setEmail}
                /> */}
                <RadioButtonCollection
                  array={[
                    {
                      buttonText: "Female",
                      buttonValue: "female",
                      active: false,
                    },
                    {
                      buttonText: "Male",
                      buttonValue: "male",
                      active: false,
                    },
                    {
                      buttonText: "Everyone",
                      buttonValue: "other",
                      active: false,
                    },
                  ]}
                  onPress={setGender}
                  activeItem={gender}
                />
              </View>
            </View>
            <View className="w-full h-fit items-center justify-center pt-24">
              <CTAButton
                text={"Next"}
                onPress={handleLogin}
                disabled={gender === ""}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SexOfInterestRegisterScreen;
