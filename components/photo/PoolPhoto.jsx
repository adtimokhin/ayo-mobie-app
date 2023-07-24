import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { FIREBASE_STORAGE } from "../../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

const PoolPhoto = ({ imageName, liked, onPress }) => {
  const [imageURI, setImageURI] = useState("");
  const [buttonLiked, setButtonLiked] = useState(liked);
  const likeIcon = <Icon name="plus" size={50} color="#7D4439" />;
  const likedIcon = <Icon name="check" size={50} color="#7D4439" />;

  useEffect(() => {
    // Getting an image from the imageName property
    const getImageURI = async () => {
      const imageRef = ref(FIREBASE_STORAGE, `images/${imageName}`);
      const downloadUrl = await getDownloadURL(imageRef);
      setImageURI(downloadUrl);
    };
    getImageURI();
  }, []);

  return (
    <View className="relative">
      <Image
        style={{
          // width: windowWidth * 0.8,
          height: 400,
          aspectRatio: 0.8,
          resizeMode: "cover",
          marginBottom: 30,
        }}
        source={{ uri: imageURI }}
        className="rounded-[15px]"
      />
      {!buttonLiked ? (
        <TouchableOpacity
          className="w-[50px] h-[50px] bg-[#FE6244] rounded-full absolute bottom-10 right-2 z-20"
          onPress={() => {
            setButtonLiked(true);
            onPress();
          }}
        >
          {likeIcon}
        </TouchableOpacity>
      ) : (
        <View className="w-[50px] h-[50px] bg-[#FE6244] rounded-full absolute bottom-10 right-2 z-20">
          {likedIcon}
        </View>
      )}
    </View>
  );
};

export default PoolPhoto;
