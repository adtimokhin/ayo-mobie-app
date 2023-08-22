import React from "react";
import MatchPhoto from "./MatchPhoto";
import { FlatList } from "react-native";

// Fixed

const MatchGallery = ({ photos }) => {
  return (
    <FlatList
      data={photos}
      horizontal
      keyExtractor={(item) => item.uid}
      renderItem={({ item }) => <MatchPhoto imageName={item.imageName} />}
      style={{ flexGrow: 0 }}
      showsHorizontalScrollIndicator={false} // hide scroll bar
      decelerationRate="fast" // animate the snapping
    />
  );
};

export default MatchGallery;
