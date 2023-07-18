import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const NavHeader = ({ onPress }) => {
  const myIcon = <Icon name="left" size={29} color="#fff" />;

  return (
    <View className=" bg-transparent w-full h-[50] justify-center pl-1">
      <TouchableOpacity className="flex-row w-fit" onPress={onPress}>
        <Text
          className="text-white text-2xl"
          style={{ fontFamily: "lalezar" }}
        >
          {myIcon}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavHeader;
