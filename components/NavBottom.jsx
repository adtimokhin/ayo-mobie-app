import { Text, TouchableOpacity, View } from "react-native";

const NavBottom = (props) => {
  return (
    <View className=" bg-transparent w-full justify-between items-center px-3 flex-row">
      {/* <TouchableOpacity className="flex-row w-fit" onPress={onPress}>
        <Text
          className="text-white text-2xl"
          style={{ fontFamily: "lalezar" }}
        >
          {myIcon}
        </Text>
      </TouchableOpacity> */}
      {props.children}
    </View>
  );
};

export default NavBottom;
