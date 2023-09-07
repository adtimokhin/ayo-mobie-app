import { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { FIREBASE_STORAGE } from "../../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";

// Fixed

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
    <View style={{ position: "relative", backgroundColor:"#4E22A1", height:400, marginBottom:8,  borderRadius: 15 }}>
      <Image
        style={{
          // width: windowWidth * 0.8,
          height: 400,
          aspectRatio: 0.8,
          resizeMode: "cover",
          marginBottom: 30,
          borderRadius: 15,
        }}
        source={{ uri: imageURI }}
      />
      {!buttonLiked ? (
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#FE6244",
            borderRadius: 25,
            position: "absolute",
            bottom: 30,
            right: 0,
            zIndex: 20,
          }}
          onPress={() => {
            setButtonLiked(true);
            onPress();
          }}
        >
          {likeIcon}
        </TouchableOpacity>
      ) : (
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#FE6244",
            borderRadius: 25,
            position: "absolute",
            bottom: 30,
            right: 0,
            zIndex: 20,
          }}
        >
          {likedIcon}
        </View>
      )}
    </View>
  );
};

export default PoolPhoto;
