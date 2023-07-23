import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";

import Title from "../components/Title";
import CTAButton from "../components/CTAButton";
import AuthNavHeader from "../components/auth/AuthNavHeader";
import {
  getPoolByPartyUID,
  removeUserFromActivePoolByUserUID,
  updateTimeUserLeft,
} from "../utils/poolActions";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions";
import { changeUserCurrentParty } from "../utils/userActions";
import LoadingCover from "../components/LoadingCover";

const LeavePartyScren = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.user).user;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleLeavePool = async function () {
    try {
      setLoading(true);
      const poolData = await getPoolByPartyUID(userData.partyUID);

      console.log(poolData.uid);

      // Step 1: Remove the user from the list of people marked as active at a party
      await removeUserFromActivePoolByUserUID(poolData.uid, userData.uid);

      // Step 2: Remove data from the user doc that they are registered at a party
      await changeUserCurrentParty(userData.uid, null);

      // Step 3: Update the time user left the party in the pool
      await updateTimeUserLeft(poolData.uid, userData.uid);

      // Step 4: Update the Redux state
      const newUserData = { ...userData };
      newUserData.partyUID = null;
      dispatch(setUser(newUserData));

      navigation.navigate("NotJoinPartyStack");
    } catch (error) {
      console.log("error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full h-full">
      {loading && <LoadingCover />}
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
                      onPress: () => {
                        handleLeavePool();
                      },
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
    </View>
  );
};

export default LeavePartyScren;
