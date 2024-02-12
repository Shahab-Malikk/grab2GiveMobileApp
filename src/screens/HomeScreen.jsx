import { View, Text, Button, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Banner from "../components/Overview/Banner";
import Stats from "../components/Overview/Stats";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-bgLight relative">
      <Banner />
      <Stats />
    </SafeAreaView>
  );
};

export default HomeScreen;
