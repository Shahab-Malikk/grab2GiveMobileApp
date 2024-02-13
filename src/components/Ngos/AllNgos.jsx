import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import NgoCard from "./NgoCard";

const AllNgos = () => {
  const ngos = [
    {
      ngoName: "Eidhi ",
      location: "Taxila",
      connected: true,
    },
    {
      nagoName: "The Hope",
      location: "Rawalpindi",
      connected: false,
    },
    {
      nagoName: "SOS",
      location: "Rawalpindi",
      connected: true,
    },
  ];
  const [isExploringNgosTab, setIsExploringNgosTab] = useState(true);
  const [filteredNgos, setFilteredNgos] = useState([]);

  const toggleTab = () => {
    setIsExploringNgosTab((prev) => !prev);
    if (isExploringNgosTab) {
      setFilteredNgos(ngos.filter((item) => item.connected === true));
    } else {
      setFilteredNgos(ngos.filter((item) => item.connected === false));
    }
  };

  useEffect(() => {
    setFilteredNgos(ngos.filter((item) => item.connected === false));
  }, []);
  return (
    <View className="px-4 py-4">
      <Text className="text-lg font-bold text-base800">Ngos</Text>
      <Text className="text-lightGrey mt-2">
        Here is list of ngos you can connect with.
      </Text>
      <View className="flex-1 flex-row bg-[#e2e7f0] py-1 px-1 mt-4">
        <Pressable
          style={{
            backgroundColor: isExploringNgosTab ? "white" : "transparent",
            padding: 10,
            borderRadius: 10,
          }}
          className="flex-1 items-center justify-center"
          onPress={toggleTab}
        >
          <Text className="text-base800">Explore Ngos</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: isExploringNgosTab ? "transparent" : "white",
            padding: 10,
            borderRadius: 10,
          }}
          className="flex-1 items-center justify-center"
          onPress={toggleTab}
        >
          <Text className="text-base800">Ngos Following</Text>
        </Pressable>
      </View>
      <View className="flex-1">
        <ScrollView className="mt-4 ">
          <View className="flex flex-row basis-1/2 flex-wrap justify-between">
            {filteredNgos.map((item) => (
              <NgoCard ngoName={item.ngoName} location={item.location} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AllNgos;
