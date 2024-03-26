import { View, Text, SafeAreaView, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import AllNgos from "../components/Ngos/AllNgos";
import { useUserData } from "../context/userDataContext";
import { ScrollView } from "react-native-gesture-handler";

const NgosScreen = () => {
  const { getNgosFromDb, getNgosOfCurrentVolunteer } = useUserData();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    await getNgosFromDb();
    await getNgosOfCurrentVolunteer();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
      }
      className="flex-1 px-4 bg-bgLight"
    >
      <AllNgos />
    </ScrollView>
  );
};

export default NgosScreen;
