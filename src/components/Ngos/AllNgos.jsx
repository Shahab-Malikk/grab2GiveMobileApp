import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import NgoCard from "./NgoCard";
import { useUserData } from "../../context/userDataContext";

const AllNgos = () => {
  const { ngos } = useUserData();
  const hardCodedNgos = [
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
      setFilteredNgos(hardCodedNgos.filter((item) => item.connected === true));
    } else {
      setFilteredNgos(hardCodedNgos.filter((item) => item.connected === false));
    }
  };

  useEffect(() => {
    setFilteredNgos(hardCodedNgos.filter((item) => item.connected === false));
  }, []);
  return (
    <View className="px-4 py-4">
      <Text className="text-lg font-bold text-base800">Ngos</Text>
      <Text className="text-lightGrey mt-2">
        Here is list of ngos you can connect with.
      </Text>
      <View className="flex-1 flex-row bg-[#e2e7f0] rounded py-1 px-2 mt-4">
        <Pressable
          style={{
            backgroundColor: isExploringNgosTab ? "white" : "transparent",
            padding: 10,
            borderRadius: 8,
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
            {ngos.map((item) => (
              <NgoCard ngo={item} key={item.id} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AllNgos;
