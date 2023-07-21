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
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const ChangePhotoScreen = ({ route, navigation }) => {
  //   const navigation = useNavigation();
  const { photoUrl, userUID } = route.params;
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

  //   Handle update of the image of a given user.
  const handleChangePhoto = async () => {
    // TODO: Add security rules that prohibit users from changing the image of other users
    try {
      setLoading(true);

      // Changing data on he back-end
      const imagePath = imageUrl.split("/").pop();
      const fileName = `${userUID}.${imagePath.split(".")[1]}`;
      console.log("fileName :>> ", fileName);
      const imageRef = ref(FIREBASE_STORAGE, `images/${fileName}`);

      const response = await fetch(imageUrl);

      const blob = await response.blob();
      console.log("Blob >> ", blob);
      await uploadBytes(imageRef, blob, { contentType: "image/jpeg" });

      // Letting the user know that the image has been uploaded successfully
      Alert.alert("All set!", "", [
        {
          text: "Nice",
          // Return user back to the settings page after a button on the alert has been pressed
          onPress: () => navigation.goBack(),
          style: "default",
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        "Something went wrong while changing the image. Try again"
      );
    } finally {
      setLoading(false);
    }
  };

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
