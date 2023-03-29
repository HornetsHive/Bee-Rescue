import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { addNotificationReceivedListener } from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import createSender from "./PushController";

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

export default function App() {
  // Function that will hold our push notification send function (an object with the function)
  const [sender, setSender] = useState(null);

  // useEffect to get token and create sender, add listener for alerts
  useEffect(() => {
    // create send function promise
    const s = createSender();
    // add notification listener to trigger events when notification is sent
    addNotificationReceivedListener((notification) => {
      console.log("Notification Coming!");
      console.log(notification);
    });
    // add function to state when send promise resolves
    s.then((sendFunc) => {
      console.log(typeof sendFunc);
      setSender({ sendFunc });
    });
  }, []);

  // useEffect that will send push alert
  useEffect(() => {
    // if the send function exists, send a notification
    if (sender && sender.sendFunc instanceof Function) {
      console.log(sender);
      sender.sendFunc("hello");
    }
  }, [sender]);
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
