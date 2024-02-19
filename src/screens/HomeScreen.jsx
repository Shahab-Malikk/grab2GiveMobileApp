import { View, Text, Button, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Banner from "../components/Overview/Banner";
import Stats from "../components/Overview/Stats";
import RecentPickups from "../components/Overview/RecentPickups";
import { useUserData } from "../context/userDataContext";

const HomeScreen = () => {
  const { getUserData } = useUserData();

  useEffect(() => {
    getUserData();
  }, []);

  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-bgLight relative">
      <Banner />
      <Stats />
      <RecentPickups />
    </SafeAreaView>
  );
};

export default HomeScreen;
