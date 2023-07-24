import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";

import Title from "../components/Title";
import MatchGallery from "../components/photo/MatchGallery";
import AuthNavHeader from "../components/auth/AuthNavHeader";
import { useSelector } from "react-redux";
import { getUserMatches } from "../utils/poolActions";
import { getUserData } from "../utils/userActions";
import { FIREBASE_DB } from "../firebaseConfig";
import { onSnapshot, doc } from "@firebase/firestore";

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
      let firstTime = true;

      // Start listening to changes made to the matches section of the pool:
      const poolRef = doc(FIREBASE_DB, "pools", poolUID);
      const unsubscribe = onSnapshot(poolRef, (doc) => {
        if (firstTime) {
          firstTime = false;
          return;
        }
        const newData = doc.data();
        const newMatch = newData.matches[newData.matches.length - 1];

        // Check if the new match involves the current user
        if (
          newMatch.userOne.id === userUID ||
          newMatch.userTwo.id === userUID
        ) {
          const otherUserUID =
            newMatch.userOne.id === userUID
              ? newMatch.userTwo.id
              : newMatch.userOne.id;
          getUserData(otherUserUID).then((otherUserData) => {
            // Ensure the new match hasn't already been added to the people array
            if (!people.find((person) => person.uid === otherUserData.uid)) {
              console.log("New match added");
              setPeople((prevPeople) => [...prevPeople, otherUserData]);
            }
          });
        }
      });

      // Return the unsubscribe function to clean up the listener when the component is unmounted
      return unsubscribe;
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
