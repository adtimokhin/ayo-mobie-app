import React from "react";
import MatchPhoto from "./MatchPhoto";
import { FlatList } from "react-native";

const MatchGallery = ({ photos }) => {
  return (
    <FlatList
      data={photos}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MatchPhoto uri={item.uri} />}
      style={{ flexGrow: 0 }}
      showsHorizontalScrollIndicator={false} // hide scroll bar
      decelerationRate="fast" // animate the snapping
    />
  );
};

export default MatchGallery;
