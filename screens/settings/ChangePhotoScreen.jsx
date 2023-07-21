import { useEffect, useLayoutEffect, useState } from "react";
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

// Firebase things
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../../firebaseConfig";
import LoadingCover from "../../components/LoadingCover";
import { ref, getDownloadURL } from "firebase/storage";

const ChangePhotoScreen = ({ route, navigation }) => {
  //   const navigation = useNavigation();
  const { photoUrl } = route.params;
  const [imageUrl, setImageUrl] = useState(null);
  const [oldImageDownloadUrl, setOldImageDownloadUrl] = useState(undefined);
  const [loading, setLoading] = useState(false);

  //   Getting the old image

  useEffect(async () => {
    const imageRef = ref(FIREBASE_STORAGE, `images/${photoUrl}`);
    const downloadUrl = await getDownloadURL(imageRef);
    setOldImageDownloadUrl(downloadUrl);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const handleChangePhoto = async () => {};

  return (
    <View>
      {loading && <LoadingCover />}
      <SafeAreaView className="w-full h-full bg-purple">
        <NavHeader
          onPress={() => {
            navigation.goBack();
          }}
        />
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
              {oldImageDownloadUrl && (
                <ImageChose
                  setImageUrl={setImageUrl}
                  imageCover={oldImageDownloadUrl}
                  loading
                />
              )}
            </View>
            <View className="w-full h-fit items-center justify-center pt-24">
              <CTAButton
                text={"Change Photo"}
                onPress={handleChangePhoto}
                disabled={imageUrl == null}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ChangePhotoScreen;
