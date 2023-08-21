import { useEffect, useLayoutEffect, useState } from "react";
import { View, Alert, SafeAreaView } from "react-native";
import Title from "../../components/Title";
import CTAButton from "../../components/CTAButton";
import FormLabel from "../../components/forms/FormLabel";
import NavHeader from "../../components/NavHeader";
import ImageChose from "../../components/forms/ImageChose";

// Firebase things
import { FIREBASE_DB, FIREBASE_STORAGE } from "../../firebaseConfig";
import LoadingCover from "../../components/LoadingCover";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions";

// Fixed

const ChangePhotoScreen = ({ route, navigation }) => {
  //   const navigation = useNavigation();
  const { photoUrl, userUID } = route.params;
  const [imageUrl, setImageUrl] = useState(null);
  const [oldImageDownloadUrl, setOldImageDownloadUrl] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.user).user;
  const dispatch = useDispatch();

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

      await updateDoc(doc(FIREBASE_DB, "users", userUID), {
        imageName: fileName,
      });

      const newUserData = { ...userData };
      newUserData.imageName = fileName;
      dispatch(setUser(newUserData));

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
      console.log(error);
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
      <SafeAreaView
        style={{ width: "100%", height: "100%", backgroundColor: "#5F29C7" }}
      >
        <NavHeader
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row", // Flex direction to ensure content fits horizontally
            }}
          >
            <Title content={"PHOTO"} />
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View id="login_form" style={{ width: "90%" }}>
              <View style={{ width: "100%" }}>
                <FormLabel label="What photo of you will others see?" />
              </View>
            </View>
            <View
              style={{
                width: "60%",
                height: 300,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {oldImageDownloadUrl && (
                <ImageChose
                  setImageUrl={setImageUrl}
                  imageCover={oldImageDownloadUrl}
                  loading
                />
              )}
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row", // Flex direction to ensure content fits horizontally
                paddingTop: 24, // Adjust this value based on your needs
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
