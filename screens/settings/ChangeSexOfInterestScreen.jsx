import { useLayoutEffect, useState } from "react";
import { View, Alert, SafeAreaView } from "react-native";
import Title from "../../components/Title";
import CTAButton from "../../components/CTAButton";
import FormLabel from "../../components/forms/FormLabel";
import NavHeader from "../../components/NavHeader";
import RadioButtonCollection from "../../components/forms/RadioButtonCollection";
import { useDispatch, useSelector } from "react-redux";
import { changeUserSexOfInterest } from "../../utils/userActions";
import LoadingCover from "../../components/LoadingCover";
import { setUser } from "../../redux/actions";

// Fixed

const ChangeSexOfInterestScreen = ({ route, navigation }) => {
  // Hooks
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
    // TODO: Update the method to handle sexOfInterest
    try {
      setLoading(true);
      // Step 1: Update the gender in the database
      changeUserSexOfInterest(userData.uid, gender);
      // Step 1.1: Update the redux state for the user
      const newUserData = { ...userData };
      newUserData.sexOfInterest = gender;
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
      <SafeAreaView
        style={{ width: "100%", height: "100%", backgroundColor: "#5F29C7" }}
      >
        <NavHeader
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            width: "100%",
            height: 50,
            justifyContent: "center",
            paddingLeft: 4,
          }}
        ></View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row", // Flex direction to ensure content fits horizontally
            }}
          >
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
                <FormLabel label="Select Whose profiles do you want to see" />
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
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 96,
              }}
            >
              <CTAButton
                text={"Change Interest"}
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

export default ChangeSexOfInterestScreen;
