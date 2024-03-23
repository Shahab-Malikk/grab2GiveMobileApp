import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import AllReservedFoods from "../components/ReservedFoods/AllReservedFoods";
import { useUserData } from "../context/userDataContext";
import { DataStore } from "@aws-amplify/datastore";
import { ReservationRequest } from "../models";

const ExploreScreen = () => {
  const {
    getFoodListReservedByNgos,
    ngosArr,
    getNgosOfCurrentVolunteer,
    setFoodListReservedByNgos,
    getUpComingDeliveries,
  } = useUserData();

  return (
    <SafeAreaView className="flex-1 px-4 py-4  bg-bgLight">
      <AllReservedFoods />
    </SafeAreaView>
  );
};

export default ExploreScreen;
