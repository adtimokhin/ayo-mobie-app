// NotificationProvider.js
import React, { useEffect, createContext, useContext } from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  useEffect(() => {
    // Register for push notifications
    const registerForPushNotificationsAsync = async () => {
      let token;
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();

        console.log("existing status: " + existingStatus);
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        console.log("Not a real device");
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      return token;
    };

    console.log("Requesting to send notifications");
    registerForPushNotificationsAsync().then(() => {
      return true;
    });
  }, []);

  const scheduleNotification = async (content, trigger) => {
    console.log("System schedule notification");
    await Notifications.scheduleNotificationAsync({ content, trigger });
  };

  return (
    <NotificationContext.Provider value={{ scheduleNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the Notification context
export const useNotifications = () => {
  return useContext(NotificationContext);
};

// Use Example:
// const { scheduleNotification } = useNotifications();
// const handleButtonPress = () => {
//   console.log("Scheduling notification");
//   const { content, trigger } = newPeopleJoinedPartyNotification({
//     numberOfPeople: 90,
//   });
//   scheduleNotification(content, trigger);
// };
