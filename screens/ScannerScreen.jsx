// This is a component that takes the whole screen with a camera view. The view is dimmed. In the center there is a lighter area in which the scanning of a QR code will happen if it is in that area.

import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useLayoutEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import AuthNavHeader from "../components/auth/AuthNavHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import CTAButton from "../components/CTAButton";
import QRReader from "../components/qr/QRReader";
import LoadingCover from "../components/LoadingCover";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserToActivePoolByUserUID,
  getPoolDataById,
  updateUserAttendedPoolByUserUID,
} from "../utils/poolActions";
import { doc } from "firebase/firestore";
import { checkPartyActiveByPartyId } from "../utils/partyActions";
import { FIREBASE_DB } from "../firebaseConfig";
import { changeUserCurrentParty } from "../utils/userActions";
import { useToast } from "../components/hot-toast/ToastProvider";
import { setUser } from "../redux/actions";

const ScannerScreen = ({}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const showToast = useToast();
  const handleShowToast = () => {
    showToast("Image changed successfully.");
  };

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
      await changeUserCurrentParty(userData.uid, partyUID, poolUID);

      // Step 5: Update user object stored in redux storage
      const newUserData = { ...userData };
      newUserData.partyUID = partyUID;
      newUserData.poolUID = poolUID;
      dispatch(setUser(newUserData));

      //  Step 6: Show a toast that says welcome message
      showToast("Welcome to the party! Have fun");

      //  Step 7: Direct user to the pool screen
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

  const [startScan, setStartScan] = useState(true);

  return (
    <View style={{ height: "100%", width: "100%", flex: 1 }}>
      {loading && <LoadingCover />}
      <SafeAreaView
        style={{ width: "100%", height: "100%", backgroundColor: "#5F29C7" }}
      >
        <AuthNavHeader text={"Join Party"} />
        <View
          style={{ width: "100%", height: "100%", backgroundColor: "#4E22A1" }}
        >
          {startScan && (
            <QRReader
              onFail={() => {
                setStartScan(false);
              }}
              onQRScanned={(poolUID) => {
                handleAddUserToPool(poolUID);
              }}
            />
          )}
        </View>

        <View
          style={{
            width: "100%",
            position: "absolute",
            height: 100,
            bottom: 0,
            backgroundColor: "#5F29C7",
            borderTopLeftRadius: 17,
            borderTopRightRadius: 17,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CTAButton
            text={`${startScan?"Cancel Scanning":"Restart Scanning"}`}
            onPress={() => {
              setStartScan((prev)=>!prev);
              navigation.goBack();
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ScannerScreen;
