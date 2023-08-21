import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

// Fixed

const NavHeader = ({ onPress }) => {
  const myIcon = <Icon name="arrowleft" size={29} color="#fff" />;

  return (
    <View
      style={{
        width: "100%",
        height: 32,
        justifyContent: "center",
        paddingLeft: 1,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <Text
          style={{
            color: "#FCFBFC",
            fontSize: 32,
            paddingLeft: 2,
          }}
        >
          {myIcon}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavHeader;
