import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";

import * as Font from "expo-font";
import EmailScreen from "./screens/login/EmailScreen";
import PasswordScreen from "./screens/login/PasswordScreen";
import EmailRegisterScreen from "./screens/register/EmailScreen";
import PasswordRegisterScreen from "./screens/register/PasswordScreen";
import ReEnterPasswordRegisterScreen from "./screens/register/ReEnterPasswordScreen";
import GenderRegisterScreen from "./screens/register/GenderScreen";
import SexOfInterestRegisterScreen from "./screens/register/SexOfInterestScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = Font.useFonts({
    lalezar: require("./assets/fonts/Lalezar-Regular.ttf"), // Replace 'custom-font' and 'CustomFont.ttf' with your font name and file.
  });

  if (!fontsLoaded) {
    return <View></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Email_register" component={EmailRegisterScreen} />
      <Stack.Screen name="Password_register" component={PasswordRegisterScreen} />
      <Stack.Screen name="Password_again_register" component={ReEnterPasswordRegisterScreen} />
      <Stack.Screen name="Gender_register" component={GenderRegisterScreen} />
      <Stack.Screen name="Sex_register" component={SexOfInterestRegisterScreen} />
        <Stack.Screen name="Email_login" component={EmailScreen} />
        <Stack.Screen name="Password_login" component={PasswordScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
