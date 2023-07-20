import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
const Map = () => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default Map;
