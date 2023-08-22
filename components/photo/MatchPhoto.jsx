import { useEffect, useState } from "react";
import useScreenDimensions from "../../hooks/useScreenDimensions";
import { FIREBASE_STORAGE } from "../../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { Image } from "react-native";

// Fixed

const MatchPhoto = ({ imageName }) => {
  const { windowWidth, windowHeight } = useScreenDimensions();
  const [imageURI, setImageURI] = useState("");

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
    <Image
      style={{
        width: windowWidth * 0.8,
        height: windowHeight * 0.6,
        resizeMode: "cover",
        marginRight: 10, // add space on the right
        marginLeft: 10, // add space on the left
        borderWidth: 4,
        borderColor: "#FE6244",
        borderRadius: 15,
      }}
      source={{ uri: imageURI }}
    />
  );
};

export default MatchPhoto;
