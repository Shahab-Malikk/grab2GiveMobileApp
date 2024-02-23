import { View, Text, Button, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Banner from "../components/Overview/Banner";
import Stats from "../components/Overview/Stats";
import RecentPickups from "../components/Overview/RecentPickups";
import { useUserData } from "../context/userDataContext";
import { DataStore } from "@aws-amplify/datastore";

const HomeScreen = () => {
  const {
    getUserData,
    getNgosOfCurrentVolunteer,
    getFoodListReservedByNgos,
    userId,
    ngos,
    currentUserNgos,
    foodListReservedByNgos,
    isgettingReservations,
    getAllData,
    getUpComingDeliveries,
    ngosArr,
  } = useUserData();

  const fetchData = async () => {
    await getUserData();
    await getNgosOfCurrentVolunteer();
    await getFoodListReservedByNgos(ngosArr);
    await getUpComingDeliveries(ngosArr);
  };

  useEffect(() => {
    DataStore.start().then(() => {
      fetchData();
    });
  }, [userId]);

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
