import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";

import Title from "../components/Title";

import {
  addUserToActivePoolByUserUID,
  getPoolDataById,
  updateUserAttendedPoolByUserUID,
} from "../utils/poolActions";

import CTAButton from "../components/CTAButton";
import QRReader from "../components/qr/QRReader";
import AuthNavHeader from "../components/auth/AuthNavHeader";
import LoadingCover from "../components/LoadingCover";

// Firebase
import { FIREBASE_DB } from "../firebaseConfig";
import { doc } from "firebase/firestore";
import { checkPartyActiveByPartyId } from "../utils/partyActions";
import { useDispatch, useSelector } from "react-redux";
import { changeUserCurrentParty } from "../utils/userActions";
import { setUser } from "../redux/actions";

const QRScreen = () => {
  // Hooks
  const [startScan, setStartScan] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  //   Redux hooks
  const userData = useSelector((state) => state.user).user;
  const dispatch = useDispatch();

  const handleAddUserToPool = async function (poolUID) {
    try {
      setLoading(true);
      // Step 1: Gettig pool data from its uid
      const poolData = await getPoolDataById(poolUID);
      if (poolData === {}) {
        // No such pool exists.
        // TODO: Show an alert to the user
        Alert.alert(
          "This is not a party QR",
          "Please double check that you are scanning a QR code on AYO poster"
        );
        setLoading(false);
        return;
      }
      console.log(poolData);

      // Step 2: Check that the party is still active
      const partyUID = doc(FIREBASE_DB, poolData.partyRef.path).id;
      const isActive = await checkPartyActiveByPartyId(partyUID, userData);
      if (!isActive) {
        // User cannot join this party
        Alert.alert(
          "Party is not on",
          "This party has already finished or haven't yet started"
        );
        setLoading(false);
        return;
      }

      // Step 3: Add user to this pool
      await addUserToActivePoolByUserUID(poolUID, userData.uid);
      await updateUserAttendedPoolByUserUID(poolUID, userData.uid);

      //  Step 4: Update user object to store data about what party they are at
      await changeUserCurrentParty(userData.uid, partyUID);

      // Step 5: Update user object stored in redux storage
      const newUserData = { ...userData };
      newUserData.partyUID = partyUID;
      dispatch(setUser(newUserData));
      //  Step 6: Direct user to the pool screen
      navigation.navigate("JoinPartyStack");
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        "Error !",
        "Something went wrong while signing you in... This was not supposed to happen. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View>
      {loading && <LoadingCover />}
      <SafeAreaView className="items-center justify-center bg-purple w-full h-full">
        <AuthNavHeader />
        <View className="flex-1 items-center ">
          <View className="w-full h-fit">
            <Title content={"SCAN QR"} />
          </View>

          {startScan ? (
            <View className="w-[100vw] items-center flex-1">
              <QRReader
                onFail={() => {
                  setStartScan(false);
                }}
                onQRScanned={(poolUID) => {
                  handleAddUserToPool(poolUID);
                }}
              />
              <View className="h-[30px]"></View>
              <CTAButton
                text={"Stop Scanning"}
                onPress={() => {
                  setStartScan(false);
                }}
              />
            </View>
          ) : (
            <View className="w-full items-center absolute top-1/2 -translate-y-[100%]">
              <CTAButton
                text={"Join Party"}
                onPress={() => {
                  setStartScan(true);
                }}
              />
            </View>
          )}

          {/* TODO: Add text that would expplain that user needs to scan QR */}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default QRScreen;
