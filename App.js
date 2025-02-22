import React from "react";
import { UserProvider } from "./store/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./screens/start/StartScreen";
import LoginScreen from "./screens/login/LoginScreen";
import SignupMobileScreen from "./screens/signup/SignUpMobileScreen";
import PersonalDetailsScreen from "./screens/signup/PersonalDetailsScreen";
import DocumentUploadScreen from "./screens/signup/DocumentUploadScreen";
import MpinSetupScreen from "./screens/signup/MPinSetupScreen";
import HomeScreen from "./screens/home/HomeScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import ServiceBotScreen from "./screens/servicebot/ServiceBotScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignupMobile" component={SignupMobileScreen} />
          <Stack.Screen
            name="PersonalDetails"
            component={PersonalDetailsScreen}
          />
          <Stack.Screen
            name="DocumentUpload"
            component={DocumentUploadScreen}
          />
          <Stack.Screen name="MpinSetup" component={MpinSetupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ServiceBot" component={ServiceBotScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
