import { View, Text, SafeAreaView, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import AllUpComingPickups from "../components/Deliveries/AllUpComingPickups";
import { useUserData } from "../context/userDataContext";
import { DataStore } from "@aws-amplify/datastore";
import { ReservationRequest } from "../models";
import { ScrollView } from "react-native-gesture-handler";

const DeliveriesScreen = () => {
  const { getUpComingDeliveries, getNgosOfCurrentVolunteer, ngosArr } =
    useUserData();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const fetchData = async () => {
    setIsRefreshing(true);
    await getNgosOfCurrentVolunteer();
    await getUpComingDeliveries(ngosArr);

    setIsRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
      }
      className="flex-1 px-4 bg-bgLight"
    >
      <AllUpComingPickups />
    </ScrollView>
  );
};

export default DeliveriesScreen;
