import { Marker } from "react-native-maps";

const MapMarker = ({ latitude, longitude }) => {
  return (
    <Marker
      coordinate={{ latitude: latitude, longitude: longitude }}
      pinColor="green"
    ></Marker>
  );
};

export default MapMarker;
