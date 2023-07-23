import { useLayoutEffect, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import Title from "../../components/Title";
import CTAButton from "../../components/CTAButton";
import FormLabel from "../../components/forms/FormLabel";
import NavHeader from "../../components/NavHeader";
import RadioButtonCollection from "../../components/forms/RadioButtonCollection";

const GenderRegisterScreen = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const [gender, setGender] = useState("");

  const handleLogin = () => {
    navigation.navigate("Sex_register", { ...route.params, gender: gender });
  };

  return (
    <SafeAreaView className="w-full h-full bg-purple">
      <NavHeader
        onPress={() => {
          navigation.navigate("Password_again_register");
        }}
      />
      <View className=" bg-transparent w-full h-[50] justify-center pl-1"></View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center ">
          <View className="w-full h-fit">
            <Title content={"GENDER"} />
          </View>
          <View className="w-full items-center justify-center">
            <View id="login_form" className="w-[90%]">
              <View className="w-full h-fit ">
                <FormLabel label="What’s your gender?" />
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
                      buttonText: "Non-binary",
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

export default GenderRegisterScreen;
