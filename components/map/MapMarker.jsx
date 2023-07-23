import { View, Text, Image } from "react-native";
import { Marker, Callout } from "react-native-maps";
import GeoMarkerImage from "../../assets/geoPointer.png";

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
      pinColor="green"
    >
      <View className="rounded-[15px] p-5 justify-center items-center">
        <Text className="bg-purple text-bone p-2 rounded-sm mb-3">{name}</Text>
        <Image source={GeoMarkerImage} style={{ height: 50, width: 50 }} />
      </View>
      <Callout>
        <View>
          <Text className="pb-2">{name}</Text>
          <Text>Starts: {startTime}</Text>
          <Text>Finishes: {endTime}</Text>
        </View>
      </Callout>
    </Marker>
  );
};

export default MapMarker;
