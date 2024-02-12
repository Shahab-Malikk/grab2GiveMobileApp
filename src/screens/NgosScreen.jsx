import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import AllNgos from "../components/Ngos/AllNgos";

const NgosScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-4 bg-bgLight">
      <AllNgos />
    </SafeAreaView>
  );
};

export default NgosScreen;
