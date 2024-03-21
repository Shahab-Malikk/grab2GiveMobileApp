import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import PickupCard from "./PickupCard";
import { useUserData } from "../../context/userDataContext";
import { ScrollView } from "react-native-gesture-handler";

const RecentPickups = () => {
  const { upComingDeliveries } = useUserData();
  const navigation = useNavigation();
  const navigateToPickups = () => {
    navigation.navigate("Deliveries");
  };


  return (
    <>
      <View className="px-10 mt-2">
        <View className="flex flex-row justify-between mb-4 items-center">
          <Text className="text-lg font-bold text-base800">
            Upcoming Pickups
          </Text>
          <Pressable onPress={navigateToPickups}>
            <Text className="text-base800">See All</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: 10,
        }}
        className="px-10"
      >
        {upComingDeliveries.map((item) => (
          <PickupCard key={item.deliveryRequestId} data={item} />
        ))}
      </ScrollView>
    </>
  );
};

export default RecentPickups;
