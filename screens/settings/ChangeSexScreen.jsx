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
import { useDispatch, useSelector } from "react-redux";
import { changeUserSex } from "../../utils/userActions";
import LoadingCover from "../../components/LoadingCover";
import { setUser } from "../../redux/actions";

const ChangeSexScreen = ({ route, navigation }) => {
  // Hooks
  // const navigation = useNavigation();
  const userData = useSelector((state) => state.user).user;
  const dispatch = useDispatch();
  const { currentSex } = route.params;
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const [gender, setGender] = useState(currentSex);

  const handleChangeGender = () => {
    try {
      setLoading(true);
      // Step 1: Update the gender in the database
      changeUserSex(userData.uid, gender);
      // Step 1.1: Update the redux state for the user
      const newUserData = { ...userData };
      newUserData.sex = gender;
      dispatch(setUser(newUserData));
      // Step 2: Alert the user that their gender has been changed successfully
      Alert.alert("All set!", "", [
        {
          text: "Nice",
          // Step 3: Return user back to the settings page after a button on the alert has been pressed
          onPress: () => navigation.goBack(),
          style: "default",
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Error!",
        "Something went wrong and we can't change you gender now. Try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {loading && <LoadingCover />}
      <SafeAreaView className="w-full h-full bg-purple">
        <NavHeader
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View className=" bg-transparent w-full h-[50] justify-center pl-1"></View>
        <View className="flex-1 items-center ">
          <View className="w-full h-fit">
            <Title content={"GENDER"} />
          </View>
          <View className="w-full items-center justify-center">
            <View id="login_form" className="w-[90%]">
              <View className="w-full h-fit ">
                <FormLabel label="Select New Gender" />

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
                text={"Change Gender"}
                onPress={handleChangeGender}
                disabled={gender === currentSex}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ChangeSexScreen;
