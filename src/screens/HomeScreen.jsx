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
import NoData from "../components/Overview/NoData";

const HomeScreen = () => {
  const {
    getUserData,
    getNgosOfCurrentVolunteer,
    getFoodListReservedByNgos,
    userId,
    foodListReservedByNgos,
    getUpComingDeliveries,
    ngosArr,
    getNotifications,
    currentUserData,
    upComingDeliveries,
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
      {foodListReservedByNgos.length === 0 ? (
        <View className="mt-28"></View>
      ) : (
        <RecentReservedFoods />
      )}

      {upComingDeliveries.length === 0 ? <></> : <RecentPickups />}

      {upComingDeliveries.length === 0 &&
        foodListReservedByNgos.length === 0 && <NoData></NoData>}
    </ScrollView>
  );
};

export default HomeScreen;
