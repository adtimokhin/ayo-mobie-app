import { Text, View } from "react-native";

const ButtonBlock = (props) => {
  const title = props.title || "No title";
  return (
    <View className="w-full justify-center items-center mb-8">
      <Text className="text-bone text-[32px]" style={{ fontFamily: "lalezar" }}>
        {title}
      </Text>
      <View className="w-full">{props.children}</View>
    </View>
  );
};

export default ButtonBlock;
