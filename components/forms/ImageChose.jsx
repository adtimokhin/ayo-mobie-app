import { Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

// Fixed

const ImageChose = ({ setImageUrl, imageCover, loading }) => {
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const myIcon = <Icon name="plus" size={29} color="#7D4439" />;
  const successIcon = <Icon name="check" size={29} color="#7D4439" />;
  const getPermissionsAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const handleChoosePhoto = async () => {
    await getPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageSource(result.uri);
      setImageUrl(result.uri); // TODO: This result.uri will be deprecated soon.
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: "#C1ACE9",
        height: "100%",
        borderRadius: 15,
        position: "relative",
      }}
      onPress={handleChoosePhoto}
    >
      {loading && (
        <ActivityIndicator
          size={29}
          color="#FE6244"
          style={{
            transform: [{ translateX: -10 }, { translateY: -10 }],
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      )}
      {imageCover && (
        <Image
          source={{ uri: imageCover }}
          style={{
            width: "100%",
            height: "100%",
            zIndex: 0,
            borderRadius: 15,
            position: "absolute",
            top: 0,
          }}
        />
      )}
      <View
        style={{
          width: 30,
          height: 30,
          backgroundColor: "#FE6244",
          borderRadius: 15,
          position: "absolute",
          bottom: 1,
          right: 1,
          zIndex: 20,
        }}
      >
        {imageSource ? successIcon : myIcon}
      </View>
      {imageSource && (
        <Image
          source={{ uri: imageSource }}
          style={{
            width: "100%",
            height: "100%",
            zIndex: "10",
            borderRadius: 15,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default ImageChose;
