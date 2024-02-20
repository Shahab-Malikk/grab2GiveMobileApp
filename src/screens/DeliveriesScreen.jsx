import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import AllUpComingPickups from "../components/Deliveries/AllUpComingPickups";
import { useUserData } from "../context/userDataContext";

const DeliveriesScreen = () => {
  const { getUpComingDeliveries } = useUserData();
  useEffect(() => {
    console.log("DeliveriesScreen: useEffect called");
    getUpComingDeliveries();
  }, []);
  return (
    <SafeAreaView className="flex-1 px-4 bg-bgLight">
      <AllUpComingPickups />
    </SafeAreaView>
  );
};

export default DeliveriesScreen;
