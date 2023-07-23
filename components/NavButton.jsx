import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const NavButton = ({ iconName, onPress, active }) => {
  const navIcon = (
    <Icon
      name={iconName}
      size={32}
      color={`${active ? "#FE6244" : "#FCFBFC"}`}
    />
  );

  return <TouchableOpacity onPress={onPress}>{navIcon}</TouchableOpacity>;
};

export default NavButton;
