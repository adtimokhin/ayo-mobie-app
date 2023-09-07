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

const SexOfInterestRegisterScreen = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const [gender, setGender] = useState("");

  const handleLogin = () => {
    navigation.navigate("Photo_register", {
      ...route.params,
      sexOfInterest: gender,
    });
  };

  return (
    <SafeAreaView
      style={{ width: "100%", height: "100%", backgroundColor: "#5F29C7" }}
    >
      <NavHeader
        onPress={() => {
          navigation.navigate("Password_register");
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ width: "100%" }}>
            <Title content={"INTERESTS"} />
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View id="login_form" style={{ width: "90%" }}>
              <View style={{ width: "100%" }}>
                <FormLabel label="Whose profiles do you want to see:" />
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
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 96,
              }}
            >
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
