import { Text, TouchableOpacity, View } from "react-native";

const CTAButton = ({ text, onPress, disabled }) => {
  const buttonClasses = `${
    disabled ? "bg-orange/50" : "bg-orange"
  }  py-3 px-2 w-[80%] rounded-[17px]`;

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
      className={buttonClasses}
    >
      <View className="items-center justify-center w-fit">
        <Text className={textClasses} style={{ fontFamily: "lalezar" }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CTAButton;
