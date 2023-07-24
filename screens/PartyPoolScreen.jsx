import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";

import Title from "../components/Title";
import PoolGallery from "../components/photo/PoolGallery";
import AuthNavHeader from "../components/auth/AuthNavHeader";
import { useDispatch, useSelector } from "react-redux";

import { doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import {
  getAllPeopleUserWantsToSee,
  getUserData,
  userWantsToSeeOtherUser,
} from "../utils/userActions";

const PartyPoolScreen = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.user).user;
  const dispatch = useDispatch();
  const [people, setPeople] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // TODO: Uncomment this when done testing
  useEffect(() => {
    // Here is where we subscribe to the changes in the list of people that are at the party.
    const setPool = async () => {
      const poolUID = userData.poolUID;
      const peopleToShow = await getAllPeopleUserWantsToSee(poolUID, userData);

      setPeople(peopleToShow);

      let firstTime = true;
      let peopleAtParty = 0;
      let peopleAtPartyCurrently = [];

      const poolRef = doc(FIREBASE_DB, "pools", poolUID);
      const unsubscribe = onSnapshot(poolRef, async (doc) => {
        const data = doc.data();
        const currentlyPresent = data.currentlyPresent || [];

        if (firstTime) {
          peopleAtParty = currentlyPresent.length;
          // Setting peopleAtPartyCurrently to be a list of uids of users at the party
          for (let i = 0; i < peopleAtParty; i++) {
            const userAtParty = currentlyPresent[i];
            peopleAtPartyCurrently.push(userAtParty.id);
          }

          firstTime = false;
          return;
        }

        if (peopleAtParty < currentlyPresent.length) {
          peopleAtParty = currentlyPresent.length;
          // peopleAtPartyCurrently = currentlyPresent;
          // New user was added
          const newUser = currentlyPresent[currentlyPresent.length - 1];
          peopleAtPartyCurrently.push(newUser.id);
          const newUserData = await getUserData(newUser.id);
          // Check if the two users want to see one another
          if (
            userWantsToSeeOtherUser(userData, newUserData) &&
            userWantsToSeeOtherUser(newUserData, userData)
          ) {
            // Add user to the list of people
            // TODO: Need a method that will sort the list of people in the order that we want
            setPeople((prevPeople) => [...prevPeople, newUserData]);
          }
        } else if (peopleAtParty > currentlyPresent.length) {
          const usersUIDs = [];
          for (let i = 0; i < currentlyPresent.length; i++) {
            const element = currentlyPresent[i];
            usersUIDs.push(element.id);
          }

          // Someone left the party pool.
          for (let i = 0; i < peopleAtPartyCurrently.length; i++) {
            const oldPartyMemberUID = peopleAtPartyCurrently[i];
            if (!usersUIDs.includes(oldPartyMemberUID)) {
              setPeople((prev) =>
                prev.filter((person) => {
                  return person.uid !== oldPartyMemberUID;
                })
              );
              break;
            }
          }

          peopleAtParty = currentlyPresent.length;
          peopleAtPartyCurrently = usersUIDs;
        }
      });

      return unsubscribe;
    };

    setPool();
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-purple">
      <AuthNavHeader />
      <View className="flex-1 items-center ">
        <View className="w-full h-fit">
          <Title content={"HERE  RN"} />
        </View>
        <View className="w-full items-center justify-center flex-1 pb-[45px]">
          <PoolGallery photos={people} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PartyPoolScreen;
