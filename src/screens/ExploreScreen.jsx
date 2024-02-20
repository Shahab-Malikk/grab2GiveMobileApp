import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import AllReservedFoods from "../components/ReservedFoods/AllReservedFoods";
import { useUserData } from "../context/userDataContext";

const ExploreScreen = () => {
  const { getFoodListReservedByNgos } = useUserData();

  useEffect(() => {
    getFoodListReservedByNgos();
  }, []);

  return (
    <SafeAreaView className="flex-1 px-4 py-4  bg-bgLight">
      <AllReservedFoods />
    </SafeAreaView>
  );
};

export default ExploreScreen;
