import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";

import Title from "../components/Title";
import MatchGallery from "../components/photo/MatchGallery";
import AuthNavHeader from "../components/auth/AuthNavHeader";
import { useSelector } from "react-redux";
import { getUserMatches } from "../utils/poolActions";
import { getUserData } from "../utils/userActions";

const MatchScrollScreen = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.user).user;
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const getMatches = async () => {
      const poolUID = userData.poolUID;
      const userUID = userData.uid;

      const matches = (await getUserMatches(poolUID, userUID)) || [];
      const returnValue = [];
      for (let i = 0; i < matches.length; i++) {
        const matchRef = matches[i];
        let matchData;
        if (userUID === matchRef.userOne.id) {
          matchData = await getUserData(matchRef.userTwo.id);
        } else {
          matchData = await getUserData(matchRef.userOne.id);
        }
        returnValue.push(matchData);
      }

      setPeople(returnValue);
    };

    getMatches();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-purple">
      <AuthNavHeader />
      <View className="flex-1 items-center  ">
        <View className="w-[100vw] h-fit">
          <Title content={"MACTHES"} />
        </View>
        <View className="w-full items-center justify-center flex-1 pb-[45px] h-fit">
          <MatchGallery photos={people} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MatchScrollScreen;
