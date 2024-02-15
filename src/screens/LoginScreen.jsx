import { View, Text, Pressable, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import Banner from "../components/Login/Banner";
import LoginForm from "../components/Login/LoginForm";

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 px-4 bg-bgLight">
      <Banner />
      <LoginForm />
    </SafeAreaView>
  );
};

export default LoginScreen;
