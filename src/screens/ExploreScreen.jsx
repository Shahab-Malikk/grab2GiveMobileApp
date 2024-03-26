import { View, Text, SafeAreaView, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import AllReservedFoods from "../components/ReservedFoods/AllReservedFoods";
import { useUserData } from "../context/userDataContext";
import { DataStore } from "@aws-amplify/datastore";
import { ReservationRequest } from "../models";
import { ScrollView } from "react-native-gesture-handler";

const ExploreScreen = () => {
  const {
    getFoodListReservedByNgos,
    ngosArr,
    getNgosOfCurrentVolunteer,
    setFoodListReservedByNgos,
    getUpComingDeliveries,
  } = useUserData();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    await getNgosOfCurrentVolunteer();
    await getFoodListReservedByNgos(ngosArr);
    setIsRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
      }
      className="flex-1 px-4 py-4  bg-bgLight"
    >
      <AllReservedFoods />
    </ScrollView>
  );
};

export default ExploreScreen;
