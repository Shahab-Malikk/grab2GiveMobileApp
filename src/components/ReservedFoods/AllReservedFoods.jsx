import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import ReservedFoodCard from "./ReservedFoodCard";

const AllReservedFoods = () => {
  const reservedFoods = [
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
    <View className="px-4">
      <Text className="text-lg font-bold text-base800">Upcoming Pickups</Text>
      <Text className="text-lightGrey mt-2">
        Here are all your upcoming pickups.
      </Text>
      <View className="flex-1">
        <ScrollView className="mt-7">
          {reservedFoods.map((item) => (
            <ReservedFoodCard
              ngoName={item.ngoName}
              from={item.from}
              to={item.to}
              date={item.date}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default AllReservedFoods;

const styles = StyleSheet.create({});
