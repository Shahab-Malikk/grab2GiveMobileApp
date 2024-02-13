import { View, Text, ScrollView } from "react-native";
import React from "react";
import NgoCard from "./NgoCard";

const AllNgos = () => {
  const ngos = [
    {
      ngoName: "Eidhi ",
      location: "Taxila",
    },
    {
      nagoName: "The Hope",
      location: "Rawalpindi",
    },
    {
      nagoName: "SOS",
      location: "Rawalpindi",
    },
  ];
  return (
    <View className="px-4 py-4">
      <Text className="text-lg font-bold text-base800">Ngos</Text>
      <Text className="text-lightGrey mt-2">
        Here is list if ngos you can connect with.
      </Text>
      <View className="flex-1">
        <ScrollView className="mt-4 ">
          <View className="flex flex-row basis-1/2 flex-wrap justify-between">
            {ngos.map((item) => (
              <NgoCard ngoName={item.ngoName} location={item.location} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AllNgos;
