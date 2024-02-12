import { View, Text, Pressable, ScrollView, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PickupCard from "./PickupCard";

const RecentPickups = () => {
  const navigation = useNavigation();
  const navigateToPickups = () => {
    navigation.navigate("Deliveries");
  };

  const recentPickups = [
    {
      ngoName: "Al Khidmat Foundation",
      from: "Alkhair Hotel",
      to: "Alkhimat Foundation Taxila",
      date: "10 June, 2023",
    },
    {
      ngoName: "Al Janat Foundation",
      from: "Alkhair Hotel",
      to: "Alkhimat Foundation Taxila",
      date: "10 June, 2023",
    },
    {
      ngoName: "Al Qalab Foundation",
      from: "Alkhair Hotel",
      to: "Alkhimat Foundation Taxila",
      date: "10 June, 2023",
    },
    {
      ngoName: "Al lab Foundation",
      from: "Alkhair Hotel",
      to: "Alkhimat Foundation Taxila",
      date: "10 June, 2023",
    },
  ];

  return (
    <View className="px-10 mt-32">
      <View className="flex flex-row justify-between mb-4 items-center">
        <Text className="text-lg font-bold text-base800">Upcoming Pickups</Text>
        <Pressable onPress={navigateToPickups}>
          <Text className="text-base800">See All</Text>
        </Pressable>
      </View>
      <View className="mt-2 flex-1">
        <FlatList
          contentContainerStyle={{ height: "auto" }}
          data={recentPickups}
          renderItem={({ item }) => (
            <PickupCard
              ngoName={item.ngoName}
              from={item.from}
              to={item.to}
              date={item.date}
            />
          )}
          keyExtractor={(item) => item.ngoName}
          scrollToOverflowEnabled={true}
        />
      </View>
    </View>
  );
};

export default RecentPickups;
