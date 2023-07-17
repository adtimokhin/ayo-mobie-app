import { Text, View } from "react-native";

const Title = ({ content }) => {
  return (
    <View className="w-full items-center justify-center">
      <View className="items-center justify-center">
        <Text
          style={{ fontFamily: "lalezar", letterSpacing: "-4%" }}
          className="text-bone text-[110px]"
        >
          {content}
        </Text>
        {/* TODO: Add the orange stripe under the text */}
      </View>
    </View>
  );
};

export default Title;
