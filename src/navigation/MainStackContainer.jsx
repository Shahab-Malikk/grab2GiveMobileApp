import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import PersonalInformationScreen from "../screens/PersonalInformationScreen";
import UpdatePasswordScreen from "../screens/UpdatePasswordScreen";
import PreOnboardingScreen from "../screens/PreOnboardingScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import PostOnboardingScreen from "../screens/PostOnboardingScreen";
import AboutScreen from "../screens/AboutScreen";
import CodeCondirmationScreen from "../screens/CodeConfirmationScreen";
import SplashScreen from "../components/utils/SplashScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import { DataStore } from "@aws-amplify/datastore";

import TabContainer from "./TabContainer";
import { useUserData } from "../context/userDataContext";

const Stack = createStackNavigator();

const MainStackContainer = () => {
  const {
    checkIfUserIsLoggedIn,
    isLoggedIn,
    isFirstLaunched,
    checkIfFirstLaunched,
    checkOnboardingStatus,
    isOnboardingCompleted,
    getUserData,
    isLoading,
    setIsLoading,
  } = useUserData();
  useEffect(() => {
    console.log("checking if user is logged in");

    DataStore.start().then(() => {
      checkIfUserIsLoggedIn();
    });
  }, [isLoggedIn]);

  useEffect(() => {
    checkIfFirstLaunched();
  }, []);

  // useEffect(() => {
  //   console.log("checking onboarding status");
  //   DataStore.start().then(() => {
  //     if (isLoggedIn) {
  //       getUserData();
  //     }
  //     setIsLoading(false);
  //   });
  // }, [isLoggedIn]);

  const screenToRender = () => {
    // if (isLoading) {
    //   return (
    //     <Stack.Screen
    //       name="Splash"
    //       component={SplashScreen}
    //       options={{ headerShown: false }}
    //     />
    //   );
    // } else if (
    //   isFirstLaunched !== null &&
    //   isLoggedIn &&
    //   isOnboardingCompleted
    // ) {
    //   return (
    //     <>
    //       <Stack.Screen
    //         name="Home"
    //         component={TabContainer}
    //         options={{ headerShown: false }}
    //       />
    //       <Stack.Screen
    //         name="PersonalInfo"
    //         component={PersonalInformationScreen}
    //         options={{ headerShown: false }}
    //       />
    //       <Stack.Screen
    //         name="UpdatePassword"
    //         component={UpdatePasswordScreen}
    //         options={{ headerShown: false }}
    //       />
    //     </>
    //   );
    // } else if (
    //   isFirstLaunched !== null &&
    //   isLoggedIn &&
    //   !isOnboardingCompleted
    // ) {
    //   return (
    //     <>
    //       <Stack.Screen
    //         name="PreOnboarding"
    //         component={PreOnboardingScreen}
    //         options={{ headerShown: false }}
    //       />
    //       <Stack.Screen
    //         name="Onboarding"
    //         component={OnBoardingScreen}
    //         options={{ headerShown: false }}
    //       />
    //       <Stack.Screen
    //         name="PostOnboarding"
    //         component={PostOnboardingScreen}
    //         options={{ headerShown: false }}
    //       />
    //     </>
    //   );
    // } else if (isFirstLaunched !== null && !isLoggedIn) {
    //   return (
    //     <>
    //       <Stack.Screen
    //         name="Login"
    //         component={LoginScreen}
    //         options={{ headerShown: false }}
    //       />
    //       <Stack.Screen
    //         name="Signup"
    //         component={SignupScreen}
    //         options={{ headerShown: false }}
    //       />
    //       <Stack.Screen
    //         name="CodeConfirmation"
    //         component={CodeCondirmationScreen}
    //         options={{ headerShown: false }}
    //       />
    //     </>
    //   );
    // } else {
    //   return (
    //     <Stack.Screen
    //       name="About"
    //       component={AboutScreen}
    //       options={{ headerShown: false }}
    //     />
    //   );
    // }

    if (isLoading) {
      return (
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      );
    } else if (isFirstLaunched) {
      return (
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ headerShown: false }}
        />
      );
    } else if (!isLoggedIn) {
      return (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CodeConfirmation"
            component={CodeCondirmationScreen}
            options={{ headerShown: false }}
          />
        </>
      );
    } else if (!isOnboardingCompleted) {
      return (
        <>
          <Stack.Screen
            name="PreOnboarding"
            component={PreOnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding"
            component={OnBoardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostOnboarding"
            component={PostOnboardingScreen}
            options={{ headerShown: false }}
          />
        </>
      );
    } else {
      return (
        <>
          <Stack.Screen
            name="Home"
            component={TabContainer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PersonalInfo"
            component={PersonalInformationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdatePassword"
            component={UpdatePasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{ headerShown: false }}
          />
        </>
      );
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>{screenToRender()}</Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackContainer;
