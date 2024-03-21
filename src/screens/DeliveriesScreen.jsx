import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import AllUpComingPickups from "../components/Deliveries/AllUpComingPickups";
import { useUserData } from "../context/userDataContext";
import { DataStore } from "@aws-amplify/datastore";
import { ReservationRequest } from "../models";

const DeliveriesScreen = () => {
  const { getUpComingDeliveries, getNgosOfCurrentVolunteer, ngosArr } =
    useUserData();
  const getData = async () => {
    await getUpComingDeliveries();
    await getNgosOfCurrentVolunteer(ngosArr);
  };
  useEffect(() => {
    console.log("DeliveriesScreen: useEffect called");
    getData();
  }, []);

  DataStore.observe(ReservationRequest).subscribe(async (msg) => {
    console.log("Subscription");
    console.log(msg.model, msg.opType, msg.element);
    await getNgosOfCurrentVolunteer();
    await getFoodListReservedByNgos();
  });

  return (
    <SafeAreaView className="flex-1 px-4 bg-bgLight">
      <AllUpComingPickups />
    </SafeAreaView>
  );
};

export default DeliveriesScreen;
