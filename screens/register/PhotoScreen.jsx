import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import Title from "../../components/Title";
import CTAButton from "../../components/CTAButton";
import FormLabel from "../../components/forms/FormLabel";
import NavHeader from "../../components/NavHeader";
import ImageChose from "../../components/forms/ImageChose";

const PhotoRegisterScreen = ({ route, navigation }) => {
  //   const navigation = useNavigation();
  const { email, password, gender, sexOfInterest } = route.params;
  const [imageUrl, setImageUrl] = useState(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const handleLogin = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView className="w-full h-full bg-purple">
      <NavHeader
        onPress={() => {
          navigation.navigate("Sex_register");
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center ">
          <View className="w-full h-fit">
            <Title content={"PHOTO"} />
          </View>
          <View className="w-full items-center justify-center">
            <View id="login_form" className="w-[90%]">
              <View className="w-full h-fit ">
                <FormLabel label="What photo of you will others see?" />
              </View>
            </View>
            <View className="w-[60%] h-[300px] items-center justify-center ">
              <ImageChose setImageUrl={setImageUrl} />
            </View>
            <View className="w-full h-fit items-center justify-center pt-24">
              <CTAButton
                text={"Create an account"}
                onPress={handleLogin}
                disabled={imageUrl == null}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default PhotoRegisterScreen;
