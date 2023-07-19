import { Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

const ImageChose = ({ setImageUrl }) => {
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
      className="w-full bg-[#C1ACE9] h-full rounded-[15px] relative"
      onPress={handleChoosePhoto}
    >
      <View className="w-[30px] h-[30px] bg-[#FE6244] rounded-full absolute bottom-1 right-1 z-20">
        {imageSource ? successIcon : myIcon}
      </View>
      {imageSource && (
        <Image
          source={{ uri: imageSource }}
          style={{ width: "100%", height: "100%" }}
          className="z-10 rounded-[15px]"
        />
      )}
    </TouchableOpacity>
  );
};

export default ImageChose;
