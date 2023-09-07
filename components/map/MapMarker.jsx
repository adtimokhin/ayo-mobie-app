import { View, Text, Image } from "react-native";
import { Marker, Callout } from "react-native-maps";
import GeoMarkerImage from "../../assets/geoPointer.png";

// Fixed

const MapMarker = ({
  latitude,
  longitude,
  name,
  startTime,
  endTime,
  zoomLevel,
}) => {
  if (zoomLevel > 0.4) {
    return <></>;
  }
  return (
    <Marker
      coordinate={{ latitude: latitude, longitude: longitude }}
      pinColor="#5F29C7"
    >
      <View
        style={{
          borderRadius: 15,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            backgroundColor: "#5F29C7",
            color: "#FCFBFC",
            padding: 4,
            borderRadius: 5,
            marginBottom: 12,
          }}
        >
          {name}
        </Text>
        <Image source={GeoMarkerImage} style={{ height: 82, width: 50 }} />
      </View>
      <Callout>
        <View>
          <Text style={{ paddingBottom: 3 }}>{name}</Text>
          <Text>Starts: {startTime}</Text>
          <Text>Finishes: {endTime}</Text>
        </View>
      </Callout>
    </Marker>
  );
};

export default MapMarker;
