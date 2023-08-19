import { Text, TouchableOpacity, View } from "react-native";

// Fixed

const CTAButton = ({ text, onPress, disabled }) => {
  const customStyles = {
    enabledButtonStyle: {
      paddingVertical: 12, // You can adjust this value as needed
      paddingHorizontal: 8, // You can adjust this value as needed
      width: "80%",
      borderRadius: 17,
      backgroundColor: "#FE6244",
    },
    disabledButtonStyle: {
      paddingVertical: 12, // You can adjust this value as needed
      paddingHorizontal: 8, // You can adjust this value as needed
      width: "80%",
      borderRadius: 17,
      backgroundColor: "rgba(254, 98, 68, 0.5)",
    },
    enabledTextStyle: {
      fontFamily: "lalezar",
      fontSize: 24,
      color: "#FCFBFC",
    },
    disabledTextStyle: {
      fontFamily: "lalezar",
      fontSize: 24,
      color: "rgba(252, 251, 252, 0.5)",
    },
  };

  const textClasses = `w-fit text-[24px] ${
    disabled ? "text-bone/50" : "text-bone"
  }`;

  return (
    <TouchableOpacity
      onPress={() => {
        if (!disabled) {
          onPress();
        }
      }}
      style={
        disabled
          ? customStyles.disabledButtonStyle
          : customStyles.enabledButtonStyle
      }
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={
            disabled
              ? customStyles.disabledTextStyle
              : customStyles.enabledTextStyle
          }
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CTAButton;
