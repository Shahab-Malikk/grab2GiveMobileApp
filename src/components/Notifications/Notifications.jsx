import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";

import BtnBack from "../utils/BtnBack";
import { ScrollView } from "react-native-gesture-handler";
import NotificationCard from "./NotificationCard";
import { useUserData } from "../../context/userDataContext";

const Notifications = () => {
  const { notifications } = useUserData();

  return (
    <ScrollView className="p-4 flex-1">
      <View className="flex flex-row items-center ">
        <BtnBack />
        <View className="flex flex-1 text-center ">
          <Text className="text-lg font-bold text-base800 text-center">
            Notifications
          </Text>
        </View>
      </View>
      <View className="mt-5">
        {notifications.length === 0 && (
          <Text className="text-center">No notifications</Text>
        )}
        {notifications.map((item) => (
          <NotificationCard key={item.id} data={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Notifications;
