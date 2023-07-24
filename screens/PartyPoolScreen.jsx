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
  useEffect(async () => {
    // Here is where we subscribe to the changes in the list of people that are at the party.
    // const poolUID = userData.poolUID;
    // const poolRef = doc(FIREBASE_DB, "pools", poolUID);

    const poolUID = userData.poolUID;
    const peopleToShow = await getAllPeopleUserWantsToSee(poolUID, userData);

    for (let i = 0; i < peopleToShow.length; i++) {
      const element = peopleToShow[i];
      console.log(element.imageName);
    }

    setPeople(peopleToShow);

    // const unsubscribe = onSnapshot(poolRef, async (doc) => {
    //   if (loadedPeople) {
    //     const data = doc.data();
    //     const currentlyPresent = data.currentlyPresent || [];
    //     console.log("Old people:", people);

    //     if (people.length < currentlyPresent.length) {
    //       // New user was added
    //       const newUser = currentlyPresent[currentlyPresent.length - 1];
    //       const newUserData = await getUserData(newUser.id);
    //       // console.log("New user data:", newUserData);

    //       // Check if the two users want to see one another
    //       if (
    //         userWantsToSeeOtherUser(userData, newUserData) &&
    //         userWantsToSeeOtherUser(newUserData, userData)
    //       ) {
    //         // Add user to the list of people
    //         const newPerson = {
    //           id: newUserData.uid,
    //           // picName: newUserData.imageName, // TODO: Switch back to using this image after done with testing
    //           uri: "https://adtimokhin.github.io/family_photos_json_server/images/jacob/jacob5.jpg",
    //           liked: false,
    //         };

    //         console.log(
    //           "Adding a new person to the list of people:",
    //           newPerson
    //         );

    //         // TODO: Need a method that will sort the list of people in the order that we want
    //         const newList = [newPerson, ...people];

    //         setPeople(newList);
    //       }
    //     }

    //     console.log("Updated pool");
    //     console.log(
    //       "There are " + currentlyPresent.length + " people currently"
    //     );
    //   } else {
    //     // const poolUID = userData.poolUID;
    //     // const peopleToShow = await getAllPeopleUserWantsToSee(
    //     //   poolUID,
    //     //   userData
    //     // );

    //     // setPeople([
    //     //   {
    //     //     id: "1",
    //     //     uri: "https://adtimokhin.github.io/family_photos_json_server/images/jacob/jacob5.jpg",
    //     //     liked: false,
    //     //   },
    //     //   {
    //     //     id: "2",
    //     //     uri: "https://adtimokhin.github.io/family_photos_json_server/images/jacob/jacob3.jpg",
    //     //     liked: false,
    //     //   },
    //     // ]);
    //     // setLoadedPeople(true);
    //   }
    // });
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
