import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { View } from "react-native";

import Logo from "../assets/Loading Screen Icon.svg";
import useScreenDimensions from "../hooks/useScreenDimensions";

import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../redux/actions";
import { getUserData } from "../utils/userActions";

const LoadingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { windowWidth, windowHeight } = useScreenDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        console.log(user);
        const userData = await getUserData(user.uid);
        dispatch(setUser({ email: user.email, uid: user.uid, ...userData }));

        if (userData.partyUID !== undefined && userData.partyUID !== null) {
          // If they are registered at some party pool then we need to navigate them to the correct screen
          navigation.navigate("JoinPartyStack");
        } else {
          navigation.navigate("NotJoinPartyStack");
        }
      } else {
        console.log("No User :(");
        dispatch(clearUser()); // dispatch your logout action
        navigation.navigate("Welcome");
      }
    });

    // cleanup method
    return unsubscribe;
  }, [dispatch]);

  return (
    <View className="flex-1 items-center justify-center bg-purple">
      <Logo width={windowWidth * 0.8} />
    </View>
  );
};

export default LoadingScreen;
