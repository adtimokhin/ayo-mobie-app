import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";

import * as Font from "expo-font";

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
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
