import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const AuthNavHeader = ({ text }) => {
  const navigation = useNavigation();
  const myIcon = <Icon name="settings" size={29} color="#fff" />;

  return (
    <View className=" bg-transparent w-full h-[30] justify-center pl-1 relative">
      {text && (
        <Text
          className="text-bone absolute top-1 left-1/2 text-[20px]"
          style={{ fontFamily: "lalezar", letterSpacing: "-1%" }}
        >
          {text}
        </Text>
      )}

      <TouchableOpacity
        className="flex-row w-fit justify-end pr-4"
        onPress={() => {
          navigation.navigate("Settings");
        }}
      >
        <Text
          className="text-white text-2xl text-right"
          style={{ fontFamily: "lalezar" }}
        >
          {myIcon}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthNavHeader;
