import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Notifications from "../components/Notifications/Notifications";

const NotificationsScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-4 py-4 bg-bgLight">
      <Notifications />
    </SafeAreaView>
  );
};

export default NotificationsScreen;
