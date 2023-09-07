import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

// Fixed

const AuthNavHeader = ({ text }) => {
  const navigation = useNavigation();
  const myIcon = <Icon name="settings" size={25} color="#fff" />;

  return (
    <View
      style={{
        width: "100%",
        height: 40,
        justifyContent: "center",
        marginLeft: 4,
        position: "relative",
        marginBottom: 2,
      }}
    >
      {text && (
        <Text
          style={{
            fontFamily: "lalezar",
            letterSpacing: 0,
            color: "#FCFBFC",
            position: "absolute",
            bottom: 0,
            fontSize: 25,
            left: 5,
          }}
        >
          {text}
        </Text>
      )}

      <TouchableOpacity
        style={{
          justifyContent: "right",
          paddingRight: 4,
        }}
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Text
          style={{
            fontFamily: "lalezar",
            color: "white",
            fontSize: 20,
            textAlign: "right",
          }}
        >
          {myIcon}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthNavHeader;
