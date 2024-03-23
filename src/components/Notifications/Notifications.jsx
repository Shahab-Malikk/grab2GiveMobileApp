import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import NotificationCard from "./NotificationCard";
import { useUserData } from "../../context/userDataContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { set } from "date-fns";
import { DataStore } from "@aws-amplify/datastore";
import { Notification } from "../../models";

const Notifications = () => {
  const { notifications, setIsNewNotification, setNotifications } =
    useUserData();
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.goBack();
    setIsNewNotification(false);
    notifications.forEach((notification) => {
      setNotifications((prev) => {
        return prev.map((item) => {
          if (item.id === notification.id) {
            return { ...item, status: "acknowledged" };
          }
          return item;
        });
      });
    });

    const expireNotification = async (acknowledgedNotification) => {
      try {
        const currentDate = new Date();
        //Add 60 Minutes
        currentDate.setMinutes(currentDate.getMinutes() + 60);
        const expTimeStamp = Number(Math.floor(currentDate.getTime() / 1000));
        const expTime = new Date(expTimeStamp * 1000);

        const oldNotification = await DataStore.query(
          Notification,
          acknowledgedNotification.id
        );
        const updated = await DataStore.save(
          Notification.copyOf(oldNotification, (updated) => {
            updated.expiryDate = expTimeStamp;
            updated.status = "acknowledged";
          })
        );
        console.log("Updated Notification");
        console.log(updated);
      } catch (e) {
        console.log(e);
      }
    };
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].status === "unread") {
        console.log("expireNotification");
        console.log(notifications[i]);
        expireNotification(notifications[i]);
      }
    }
  };

  return (
    <ScrollView className="p-4 flex-1">
      <View className="flex flex-row items-center ">
        <Pressable onPress={handleNavigate}>
          <Ionicons name="arrow-back-circle-outline" size={44} color="black" />
        </Pressable>
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
