import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import PhotoRegisterScreen from "./screens/register/PhotoScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import ConfimEmailRegisterScreen from "./screens/register/ConfimEmailScreen";
import QRScreen from "./screens/QRScreen";
import MapScreen from "./screens/MapScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChangeSexScreen from "./screens/settings/ChangeSexScreen";

import Icon from "react-native-vector-icons/Feather";
import { useLayoutEffect } from "react";
import MatchScrollScreen from "./screens/MatchScrollScreen";
import PartyPoolScreen from "./screens/PartyPoolScreen";
import LeavePartyScren from "./screens/LeavePartyScren";
import SettingsScreen from "./screens/SettingsScreen";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import ChangeSexOfInterestScreen from "./screens/settings/ChangeSexOfInterestScreen";

// React Navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// TODO: Move this stack to another file
function NotJoinPartyStack() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "QR") {
            iconName = "plus-square";
          } else if (route.name === "Map") {
            iconName = "map";
          }

          // Return a Icon component with the relevant icon name
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "#5F29C7",
          position: "absolute",
          borderTopWidth: 0,
        },
      })}
      tabBarOptions={{
        activeTintColor: "#FE6244",
        inactiveTintColor: "#FCFBFC",
        showLabel: false,
      }}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="QR" component={QRScreen} />
    </Tab.Navigator>
  );
}

// TODO: Move this stack to another file
function JoinPartyStack() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Match") {
            iconName = "heart";
          } else if (route.name === "PartyPool") {
            iconName = "users";
          } else if (route.name === "LeaveParty") {
            iconName = "log-out";
          }

          // Return a Icon component with the relevant icon name
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "#5F29C7",
          position: "absolute",
          borderTopWidth: 0,
        },
      })}
      tabBarOptions={{
        activeTintColor: "#FE6244",
        inactiveTintColor: "#FCFBFC",
        showLabel: false,
      }}
    >
      <Tab.Screen name="Match" component={MatchScrollScreen} />
      <Tab.Screen name="PartyPool" component={PartyPoolScreen} />
      <Tab.Screen name="LeaveParty" component={LeavePartyScren} />
    </Tab.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = Font.useFonts({
    lalezar: require("./assets/fonts/Lalezar-Regular.ttf"), // Replace 'custom-font' and 'CustomFont.ttf' with your font name and file.
  });

  if (!fontsLoaded) {
    return <View></View>;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="JoinPartyStack" component={JoinPartyStack} />
          <Stack.Screen
            name="NotJoinPartyStack"
            component={NotJoinPartyStack}
          />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Email_register" component={EmailRegisterScreen} />
          <Stack.Screen
            name="Password_register"
            component={PasswordRegisterScreen}
          />
          <Stack.Screen
            name="Password_again_register"
            component={ReEnterPasswordRegisterScreen}
          />
          <Stack.Screen
            name="Gender_register"
            component={GenderRegisterScreen}
          />
          <Stack.Screen
            name="Sex_register"
            component={SexOfInterestRegisterScreen}
          />
          <Stack.Screen name="Photo_register" component={PhotoRegisterScreen} />
          <Stack.Screen
            name="Confirm_email_register"
            component={ConfimEmailRegisterScreen}
          />
          <Stack.Screen name="Email_login" component={EmailScreen} />
          <Stack.Screen name="Password_login" component={PasswordScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ChangeGender" component={ChangeSexScreen} />
          <Stack.Screen
            name="ChangeSexOfInterest"
            component={ChangeSexOfInterestScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
