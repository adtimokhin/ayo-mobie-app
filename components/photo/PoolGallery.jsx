import React from "react";
import PoolPhoto from "./PoolPhoto";
import { FlatList } from "react-native";
import { addLike } from "../../utils/poolActions";
import { useSelector } from "react-redux";

// Fixed

const PoolGallery = ({ photos }) => {
  const userData = useSelector((state) => state.user).user;

  const userUID = userData?.uid;
  const poolUID = userData?.poolUID;

  return (
    <FlatList
      data={photos}
      vertical
      numColumns={1}
      keyExtractor={(item) => item.uid}
      renderItem={({ item }) => (
        <PoolPhoto
          imageName={item.imageName}
          liked={item.liked}
          onPress={async () => {
            await addLike(poolUID, userUID, item.uid);
          }}
        />
      )}
      showsVerticalScrollIndicator={false} // hide scroll bar
      decelerationRate="fast" // animate the snapping
    />
  );
};

export default PoolGallery;
