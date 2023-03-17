import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import AccountScreen from "./screens/AccountScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MyReportsHomeScreen from "./screens/MyReportsHomeScreen";
import MyReportsScreen from "./screens/MyReportsScreen";
import PreferencesScreen from "./screens/PreferencesScreen";
import ReportInfoScreen from "./screens/ReportInfoScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ForgotPassScreen from "./screens/ForgotPassScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />

        <Stack.Screen name="AccountScreen" component={AccountScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MyReportsHomeScreen" component={MyReportsHomeScreen}/>
        <Stack.Screen name="MyReportsScreen" component={MyReportsScreen} />
        <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
        <Stack.Screen name="ReportInfoScreen" component={ReportInfoScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
