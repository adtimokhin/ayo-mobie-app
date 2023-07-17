import { Text, TouchableOpacity, View } from "react-native";

const CTAButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-orange py-3 px-2 w-[80%] rounded-[17px]"
    >
      <View className="items-center justify-center w-fit">
        <Text
          className="w-fit text-[24px] text-bone"
          style={{ fontFamily: "lalezar" }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CTAButton;
