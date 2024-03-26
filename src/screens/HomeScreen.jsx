import { View, Text, Button, SafeAreaView, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Banner from "../components/Overview/Banner";
import Stats from "../components/Overview/Stats";
import RecentPickups from "../components/Overview/RecentPickups";
import RecentReservedFoods from "../components/Overview/RecentReservedFoods";
import { useUserData } from "../context/userDataContext";
import { DataStore } from "@aws-amplify/datastore";
import { ReservationRequest } from "../models";
import { ScrollView } from "react-native-gesture-handler";

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
    getNotifications,
    currentUserData,
  } = useUserData();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    await getUserData();
    await getNgosOfCurrentVolunteer();
    await getFoodListReservedByNgos(ngosArr);
    await getUpComingDeliveries(ngosArr);
    await getNotifications(currentUserData);
    setIsRefreshing(false);
  };

  useEffect(() => {
    DataStore.start().then(() => {
      fetchData();
    });
  }, [userId]);

  const navigation = useNavigation();
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
      }
      className="flex-1 bg-bgLight relative"
    >
      <Banner />
      <Stats />
      <RecentReservedFoods />
      <RecentPickups />
    </ScrollView>
  );
};

export default HomeScreen;
