import { useLayoutEffect, useState } from "react";
import {
  View,
  Alert,
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
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from "../../firebaseConfig";
import LoadingCover from "../../components/LoadingCover";

const PhotoRegisterScreen = ({ route, navigation }) => {
  //   const navigation = useNavigation();
  const { email, password, gender, sexOfInterest } = route.params;
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //   State of the fields
  const handleAccountCreation = async () => {
    // adding user to account list
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      const userUID = userCredentials.user.uid;

      // adding user to firestore database
      await setDoc(doc(FIREBASE_DB, "users", userUID), {
        uid: userUID,
        email: email,
        sex: gender,
        sexOfInterest: sexOfInterest,
      });

      // Adding image to the firebase storage
      const imagePath = imageUrl.split("/").pop();
      const fileName = `${userUID}.${imagePath.split(".")[1]}`;
      console.log("fileName :>> ", fileName);
      const imageRef = ref(FIREBASE_STORAGE, `images/${fileName}`);

      // Upload the file to the reference
      const response = await fetch(imageUrl);

      const blob = await response.blob();
      console.log("Blob >> ", blob);
      await uploadBytes(imageRef, blob, { contentType: "image/jpeg" }); // TODO: This file may be of othrt tpye of image
      // await imageRef.putFile(imageUrl); // Unsure might not work

      // Updating the database

      await updateDoc(doc(FIREBASE_DB, "users", userUID), {
        imageName: fileName,
      });

      // Sending email verification email

      const currentUser = FIREBASE_AUTH.currentUser;
      await sendEmailVerification(currentUser);

      //  Signing user out
      await signOut(FIREBASE_AUTH);

      // navigating to the new page
      navigation.navigate("Confirm_email_register", { ...route.params });
    } catch (error) {
      console.log("Error: " + error.message);
      Alert.alert(
        "Shoot!",
        "Something went wrong while registering you... Try again!"
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
                  onPress={handleAccountCreation}
                  disabled={imageUrl == null}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};

export default PhotoRegisterScreen;
