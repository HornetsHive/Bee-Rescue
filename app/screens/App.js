import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import AccountScreen from "./AccountScreen";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import MyReportsScreen from "./MyReportsScreen";
import PreferencesScreen from "./PreferencesScreen";
import ReportInfoScreen from "./ReportInfoScreen";
import SettingsScreen from "./SettingsScreen";
import SignUpScreen from "./SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AccountScreen" component={AccountScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MyReportsScreen" component={MyReportsScreen} />
        <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
        <Stack.Screen name="ReportInfoScreen" component={ReportInfoScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
