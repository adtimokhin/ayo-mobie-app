import { Dimensions } from "react-native";
import { useEffect } from "react";

/**
 * A custom React Hook to track changes in the dimensions (width and height) of the device's screen.
 *
 * This hook uses the Dimensions API from React Native to get the width and height of the screen,
 * and sets up an event listener to update these values when the screen dimensions change
 * (e.g., when the device orientation changes from portrait to landscape or vice versa).
 *
 * The hook cleans up the event listener when the component that uses this hook is unmounted.
 *
 * @returns {Object} An object with two properties: 'windowWidth' and 'windowHeight'. These properties represent
 * the current width and height of the screen, respectively.
 *
 * @example
 * const { windowWidth, windowHeight } = useScreenDimensions();
 */
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
