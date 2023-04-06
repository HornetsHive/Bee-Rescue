import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { addNotificationReceivedListener } from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View, Button, Platform } from "react-native";
import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import AccountScreen from "./screens/AccountScreen";
import ForgotPassScreen from "./screens/ForgotPassScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MyReportsHomeScreen from "./screens/MyReportsHomeScreen";
import MyReportsScreen from "./screens/MyReportsScreen";
import PreferencesScreen from "./screens/PreferencesScreen";
import ReportInfoScreen from "./screens/ReportInfoScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createNativeStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  //if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
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
  //} else {
  //alert("Must use physical device for Push Notifications");
  //}

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  ////////////////////////////////

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />

        <Stack.Screen name="AccountScreen" component={AccountScreen} />
        <Stack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="MyReportsHomeScreen"
          component={MyReportsHomeScreen}
        />
        <Stack.Screen name="MyReportsScreen" component={MyReportsScreen} />
        <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
        <Stack.Screen name="ReportInfoScreen" component={ReportInfoScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
