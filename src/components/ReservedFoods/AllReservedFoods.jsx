import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import ReservedFoodCard from "./ReservedFoodCard";
import { useUserData } from "../../context/userDataContext";
import emptyIlls from "../../../assets/emptyIlls.gif";

const AllReservedFoods = () => {
  const { foodListReservedByNgos } = useUserData();
  console.log(foodListReservedByNgos);
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
      <Text className="text-lg font-bold text-base800">
        Recent Reservations
      </Text>
      <Text className="text-lightGrey mt-2">
        Here are recent reservations made by your followed NGOs.
      </Text>

      {foodListReservedByNgos.length > 0 ? (
        <View className="flex-1">
          <ScrollView className="mt-7">
            {foodListReservedByNgos.map((item) => (
              <ReservedFoodCard key={item.reservationRequestId} data={item} />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View className="flex flex-1 h-[100%] justify-center items-center">
          <Image source={emptyIlls} className="w-24 h-24 rounded-full mb-4" />
          <Text className="text-lg font-semibold mt-2 text-center">
            No Reserved Food Available. Try following Ngo.
          </Text>
        </View>
      )}
    </View>
  );
};

export default AllReservedFoods;

const styles = StyleSheet.create({});
