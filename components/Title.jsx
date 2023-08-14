import { Text, View } from "react-native";

const Title = ({ content }) => {
  return (
    <View className="w-full items-center justify-center">
      <View className="items-center justify-center">
        <Text
          style={{ fontFamily: "lalezar", letterSpacing: 0 }}
          className="text-bone text-[80px]"
        >
          {content}
        </Text>
      </View>
    </View>
  );
};

export default Title;
