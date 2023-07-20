import React from "react";
import PoolPhoto from "./PoolPhoto";
import { FlatList } from "react-native";

const PoolGallery = ({ photos }) => {
  return (
    <FlatList
      data={photos}
      vertical
      numColumns={1}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PoolPhoto uri={item.uri} liked={item.liked} onPress={() => {}} />
      )}
      //   style={{ flexGrow: 0 }}
      showsVerticalScrollIndicator={false} // hide scroll bar
      decelerationRate="fast" // animate the snapping
    />
  );
};

export default PoolGallery;
