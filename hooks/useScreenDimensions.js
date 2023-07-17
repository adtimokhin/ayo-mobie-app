import { Dimensions } from "react-native";
import { useEffect } from "react";

export default useScreenDimensions = () => {
  let windowWidth = Dimensions.get("window").width;
  let windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    const onChange = ({ window, screen }) => {
      windowWidth = window.width;
      windowHeight = window.height;
    };

    Dimensions.addEventListener("change", onChange);

    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  return { windowWidth, windowHeight };
};
