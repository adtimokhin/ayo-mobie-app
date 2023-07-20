import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const LoadingCover = ({ text }) => {
  return (
    <Spinner
      visible={true}
      textContent={text}
      textStyle={{ color: "#FE6244" }}
    />
  );
};

export default LoadingCover;
