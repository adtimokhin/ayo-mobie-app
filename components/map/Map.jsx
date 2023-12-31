import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapMarker from "./MapMarker";
import { useEffect, useState } from "react";
import { getAllActivePartiesData } from "../../utils/partyActions";
import { convertFirebaseTimeToString } from "../../utils/time";

// Fixed

const Map = ({ userCoord }) => {
  // userCoord is an object that has two values: latitude and longitude

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const retrievePartyData = async () => {
      const partyData = await getAllActivePartiesData();
      partyData.forEach((party) => console.log(party));
      return partyData;
    };

    const generateMarkers = async (partyData) => {
      const markers = [];
      partyData.forEach((party) => {
        // Making the marker
        markers.push(
          <MapMarker
            key={party.uid}
            latitude={party.location.latitude}
            longitude={party.location.longitude}
            name={party.partyName}
            startTime={convertFirebaseTimeToString(party.fromDT)}
            endTime={convertFirebaseTimeToString(party.untilDT)}
          ></MapMarker>
        );
      });

      console.log("markers are set");
      setMarkers(markers);
    };

    retrievePartyData().then((partyData) => {
      generateMarkers(partyData);
    });
  }, []);

  const handleRegionChange = (region) => {
    // TODO: handle the change of which markers are visible based on the zoom level
    console.log(region.latitudeDelta);
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ height: "100%", width: "100%" }}
      initialRegion={{
        latitude: userCoord.latitude,
        longitude: userCoord.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      }}
      onRegionChangeComplete={handleRegionChange}
      showsUserLocation={true}
      followsUserLocation={true}
    >
      {markers} 
    </MapView>
  );
};

export default Map;
