import { View } from "react-native";

const NavBottom = (props) => {
  return (
    <View className=" bg-transparent w-full justify-between items-center px-3 flex-row">
      {props.children}
    </View>
  );
};

export default NavBottom;
