import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, View } from "react-native";

import Map from "../components/map/Map";
import AuthNavHeader from "../components/auth/AuthNavHeader";

import { useSelector } from "react-redux";
import * as Location from "expo-location";

// Fixed

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
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5F29C7",
      }}
    >
      <AuthNavHeader text="Parties Around" />
      {/* TODO: Go around and remove the Title component */}

      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "#4E22A1",
          }}
        >
          {userPosition ? (
            <Map userCoord={userPosition}></Map>
          ) : (
            <ActivityIndicator
            color="#C1ACE9"
            size="large"
            style={{
              position: "absolute",
              top: "42%", // Vertically centering
              left: "48%", // Horizontally centering
            }}
          />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
