import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const AuthNavHeader = ({ text }) => {
  const navigation = useNavigation();
  const myIcon = <Icon name="settings" size={29} color="#fff" />;

  return (
    <View className=" bg-transparent w-full h-[30] justify-center ml-4 relative mb-2">
      {text && (
        <Text
          className="text-bone absolute top-1 text-[20px] left-3"
          style={{ fontFamily: "lalezar", letterSpacing: 0 }}
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
