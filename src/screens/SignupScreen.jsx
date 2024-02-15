import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Banner from "../components/Login/Banner";
import SignupForm from "../components/Signup/SignupForm";

const SignupScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-4 bg-bgLight">
      <Banner />
      <SignupForm />
    </SafeAreaView>
  );
};

export default SignupScreen;
