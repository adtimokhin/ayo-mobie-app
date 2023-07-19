import { Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const PoolPhoto = ({ uri }) => {
  const likeIcon = <Icon name="plus" size={50} color="#7D4439" />;
  const successIcon = <Icon name="check" size={50} color="#7D4439" />;

  return (
    <View className="relative">
      <Image
        style={{
          // width: windowWidth * 0.8,
          height: 400,
          aspectRatio: 0.8,
          resizeMode: "cover",
          marginBottom: 30,
        }}
        source={{ uri: uri }}
        className="rounded-[15px]"
      />
      <TouchableOpacity className="w-[50px] h-[50px] bg-[#FE6244] rounded-full absolute bottom-10 right-2 z-20">
        {likeIcon}
      </TouchableOpacity>
    </View>
  );
};

export default PoolPhoto;
