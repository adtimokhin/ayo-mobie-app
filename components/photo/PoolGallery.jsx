import React from "react";
import PoolPhoto from "./PoolPhoto";
import { FlatList } from "react-native";

const PoolGallery = ({ photos }) => {
  return (
    <FlatList
      data={photos}
      vertical
      numColumns={1}
      keyExtractor={(item) => item.uid}
      renderItem={({ item }) => (
        <PoolPhoto imageName={item.imageName} liked={item.liked} onPress={() => {}} />
      )}
      showsVerticalScrollIndicator={false} // hide scroll bar
      decelerationRate="fast" // animate the snapping
    />
  );
};

export default PoolGallery;
