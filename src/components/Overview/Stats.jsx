import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Stats = () => {
  return (
    <>
      <View className="bg-white absolute top-28 rounded-md py-7 px-10 w-[90%] ml-[5%]">
        <View className="flex flex-row mb-4 items-center">
          <Text className="text-[#4A5468] font-semibold">⚡My Progress</Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-col">
            <Text className="text-black text-3xl font-semibold mb-2">5</Text>
            <Text className="text-lightGrey">Upcoming</Text>
          </View>
          <View className="flex flex-col ml-5">
            <Text className="text-black text-3xl font-bold mb-2">2</Text>
            <Text className="text-lightGrey">Completed</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Stats;
