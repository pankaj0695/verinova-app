import React from "react";
import { UserProvider } from "./store/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./screens/auth/start/StartScreen";
import LoginScreen from "./screens/auth/login/LoginScreen";
import SignupMobileScreen from "./screens/auth/signup/SignUpMobileScreen";
import PersonalDetailsScreen from "./screens/auth/signup/PersonalDetailsScreen";
import DocumentUploadScreen from "./screens/auth/signup/DocumentUploadScreen";
import MpinSetupScreen from "./screens/auth/signup/MPinSetupScreen";
import HomeScreen from "./screens/home/HomeScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import ServiceBotScreen from "./screens/servicebot/ServiceBotScreen";
import LoanScreen from "./screens/loan/LoanScreen";
import LoanDetailsScreen from "./screens/loan/LoanDetailsScreen";
import LoanCategoryScreen from "./screens/loan/LoanCategoryScreen";
import WithdrawalScreen from "./screens/withdrawal/WithdrawalScreen";
import PolicyScreen from './screens/policies/PolicyScreen'; 
import FAQ from './screens/faq/FAQ';



const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            options={{ animation: "none" }}
            name="Home"
            component={HomeScreen}
          />
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

          <Stack.Screen
            options={{ animation: "none" }}
            name="Profile"
            component={ProfileScreen}
          />
          <Stack.Screen name="ServiceBot" component={ServiceBotScreen} />
          <Stack.Screen name="Loan" component={LoanScreen} />
          <Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
          <Stack.Screen name="LoanCategory" component={LoanCategoryScreen} />
          <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />
          <Stack.Screen name="Policies" component={PolicyScreen} />
          <Stack.Screen name="Faq" component={FAQ} />
          </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
