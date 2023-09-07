import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  Button,
} from "react-native";
import { Marker, Callout } from "react-native-maps";
import GeoMarkerImage from "../../assets/geoPointer.png";
import { useEffect } from "react";
import { usePopUp } from "../screen-popup/PopUpProvider";

// Fixed

const MapMarker = ({ latitude, longitude, name, startTime, endTime }) => {
  const showPopup = usePopUp();

  return (
    <Marker
      coordinate={{ latitude: latitude, longitude: longitude }}
      pinColor="#5F29C7"
      onPress={() => {
        const popupContent = (
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 5,
                color: "white",
              }}
            >
              {name}
            </Text>
            <Text style={{ fontSize: 14, color: "white" }}>
              <Text style={{ fontWeight: "bold" }}> Begins: </Text> {startTime}
            </Text>
            <Text style={{ fontSize: 14, color: "white" }}>
              <Text style={{ fontWeight: "bold" }}> Finishes:</Text> {endTime}
            </Text>
          </View>
        );
        showPopup(popupContent);
      }}
    >
      <View
        style={{
          borderRadius: 15,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={GeoMarkerImage} style={{ height: 82, width: 50 }} />
      </View>
    </Marker>
  );
};

export default MapMarker;
