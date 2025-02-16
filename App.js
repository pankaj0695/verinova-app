import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpMobileScreen from './Screens/SignUpMobileScreen';
import OtpVerificationScreen from "./Screens/OtpVerificationScreen";
import PersonalDetailsScreen from "./Screens/PersonalDetailsScreen";
import DocumentUploadScreen from "./Screens/DocumentUploadScreen";
import MpinSetupScreen from "./Screens/MPinSetupScreen";
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
import ServiceBotScreen from './Screens/ServiceBotScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignupMobile" component={SignUpMobileScreen} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
        <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />
        <Stack.Screen name="MpinSetup" component={MpinSetupScreen} />
        <Stack.Screen name="ServiceBot" component={ServiceBotScreen} />
        {/* <Stack.Screen name="Login" component={LoginScreen} />   */}
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
