import FastImage from "react-native-fast-image";
import useScreenDimensions from "../../hooks/useScreenDimensions";
import { Image } from "react-native";

const MatchPhoto = ({ uri }) => {
  const { windowWidth, windowHeight } = useScreenDimensions();

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
      }}
      source={{ uri: uri }}
      className="rounded-[15px]"
      //   resizeMode={FastImage.resizeMode.contain}
    />
  );
};

export default MatchPhoto;
