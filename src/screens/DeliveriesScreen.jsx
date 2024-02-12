import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import AllUpComingPickups from "../components/Deliveries/AllUpComingPickups";

const DeliveriesScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-4 bg-bgLight">
      <AllUpComingPickups />
    </SafeAreaView>
  );
};

export default DeliveriesScreen;
