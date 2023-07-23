import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";

import Map from "../components/map/Map";

import AuthNavHeader from "../components/auth/AuthNavHeader";
import { useSelector } from "react-redux";

import * as Location from "expo-location";

const MapScreen = () => {
  const navigation = useNavigation();
  const [userPosition, setUserPosition] = useState(null);

  //   TODO: Remove after testing
  const user = useSelector((state) => state.user).user; // Here you're retrieving the user data from your Redux store
  console.log(user);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // Getting position of the user
  useEffect(() => {
    const gettingUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Could not find you on the map!",
          "Please go to settings and allow using your location so that you can see what parties are around you!"
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    gettingUserLocation()
      .then(() => {
        console.log("Got user location");
      })
      .catch((err) => {
        console.err(err.message);
      });
  }, []);

  return (
    <SafeAreaView className="flex-1 w-full h-full items-center justify-center bg-purple">
      <AuthNavHeader text="PARTIES AROUND YOU" />
      {/* TODO: Go around and remove the Title component */}
      <View className="flex-1 items-center ">
        <View className="w-[100vw] h-[100vh] bg-black">
          {userPosition && <Map userCoord={userPosition}></Map>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
