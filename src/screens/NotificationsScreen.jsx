import { View, Text, SafeAreaView, RefreshControl } from "react-native";
import React from "react";
import Notifications from "../components/Notifications/Notifications";
import { ScrollView } from "react-native-gesture-handler";
import { useUserData } from "../context/userDataContext";

const NotificationsScreen = () => {
  const { getUserData, getNotifications, currentUserData } = useUserData();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const fetchData = async () => {
    setIsRefreshing(true);
    await getNotifications(currentUserData);
    setIsRefreshing(false);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
      }
      className="flex-1 px-4 py-4 bg-bgLight"
    >
      <Notifications />
    </ScrollView>
  );
};

export default NotificationsScreen;
