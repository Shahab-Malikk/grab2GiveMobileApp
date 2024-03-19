import { View, Text, ScrollView } from "react-native";
import React from "react";
import PickupCard from "../Overview/PickupCard";
import { useUserData } from "../../context/userDataContext";
import emptyIlls from "../../../assets/emptyIlls.gif";

const AllUpComingPickups = () => {
  const { upComingDeliveries } = useUserData();
  console.log(upComingDeliveries);
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
    <View className="px-4 py-4">
      <Text className="text-lg font-bold text-base800">Upcoming Pickups</Text>
      <Text className="text-lightGrey mt-2">
        Here are all your upcoming pickups.
      </Text>
      {upComingDeliveries.length > 0 ? (
        <View className="flex-1 mb-8">
          <ScrollView className="mt-4 mb-10">
            {upComingDeliveries.map((item) => (
              <PickupCard key={item.reservationRequestId} data={item} />
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

export default AllUpComingPickups;
