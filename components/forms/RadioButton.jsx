import { Text, TouchableOpacity } from "react-native";

// Fixed

const RadioButton = ({ text, value, onPress, isActive }) => {
  const customStyles = {
    selected: {
      buttonClasses: {
        borderRadius: 14,
        paddingHorizontal: 16, // Adjust this value based on your needs
        marginBottom: 12, // Adjust this value based on your needs
        width: "100%",
        backgroundColor: "#4E22A1", // Replace with the actual color value
      },
      textClasses: {
        color: "#C1ACE9",
        fontFamily: "lalezar",
        fontSize: 32,
      },
    },
    default: {
      buttonClasses: {
        borderRadius: 14,
        paddingHorizontal: 16, // Adjust this value based on your needs
        marginBottom: 12, // Adjust this value based on your needs
        width: "100%",
        backgroundColor: "#C1ACE9", // Replace with the actual color value
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
      onPress={() => {
        if (isActive) {
          onPress("");
        } else {
          onPress(value);
        }
      }}
      style={
        isActive
          ? customStyles.selected.buttonClasses
          : customStyles.default.buttonClasses
      }
    >
      <Text
        style={
          isActive
            ? customStyles.selected.textClasses
            : customStyles.default.textClasses
        }
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
