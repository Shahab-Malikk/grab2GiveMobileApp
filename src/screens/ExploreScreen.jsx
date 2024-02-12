import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import AllReservedFoods from "../components/ReservedFoods/AllReservedFoods";

const ExploreScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-4 bg-bgLight">
      <AllReservedFoods />
    </SafeAreaView>
  );
};

export default ExploreScreen;
