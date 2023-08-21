import { Text, TouchableOpacity } from "react-native";

// Fixed

const SettingsButton = ({ text, onPress, contrast }) => {
  const customStyles = {
    contrast: {
      buttonClasses: {
        backgroundColor: "#FCFBFC",
        width: "100%",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      },
      textClasses: {
        color: "#FE6244",
        fontFamily: "lalezar",
        fontSize: 32,
      },
    },
    default: {
      buttonClasses: {
        backgroundColor: "#C1ACE9",
        width: "100%",
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      },
      textClasses: {
        color: "#4E22A1",
        fontFamily: "lalezar",
        fontSize: 32,
      },
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        contrast
          ? customStyles.contrast.buttonClasses
          : customStyles.default.buttonClasses
      }
    >
      <Text
        style={
          contrast
            ? customStyles.contrast.textClasses
            : customStyles.default.textClasses
        }
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SettingsButton;
