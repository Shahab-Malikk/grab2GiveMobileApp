import { View, Text, Pressable, Image } from "react-native";
import React from "react";

const ReservedFoodCard = () => {
  return (
    <View className="flex flex-col mb-4 bg-white p-4">
      <Image
        source={require("../../../assets/meal1.png")}
        className="w-[100%] h-24 rounded-md mr-2"
      />
      <View>
        <Text className=" text-sm font-bold mb-1">Al Khidmat Foundation</Text>
        <View className="flex flex-row mb-1">
          <Text className="text-lightGrey text-xs">From : </Text>
          <Text className="text-xs">New Taxila Foods</Text>
        </View>
        <View className="flex w-[100%] flex-row mb-2">
          <Text className=" text-lightGrey text-xs">To : </Text>
          <Text className="text-xs">Al Khidmat Foundation Taxila</Text>
        </View>
        <View className="p-1 bg-[#edf0f7] rounded-sm flex w-40 flex-row">
          <Text className=" text-darkGrey">Date :</Text>
          <Text>10 June, 2023</Text>
        </View>
        <Pressable className="flex-1 py-2 bg-black w-[80%] ml-[10%] rounded-md mt-4">
          <Text className="text-white text-center ">Be Voulnteer</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReservedFoodCard;
