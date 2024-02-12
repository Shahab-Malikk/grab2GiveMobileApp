import { View, Text, Pressable, Image } from "react-native";
import React from "react";

const NgoCard = () => {
  return (
    <View className="flex flex-col items-center bg-white shadow-md border-2 border-gray-300 py-8 px-8 rounded-md mb-4">
      <Image
        source={require("../../../assets/ngo2.avif")}
        className="w-24 h-24 rounded-full"
      />
      <View className="flex-1 flex-col">
        <Text className="text-center mt-2">Uet Langar Khana</Text>
        <Text className="text-center mt-2">Taxila</Text>
      </View>
      <Pressable className="flex-1 py-2 bg-black w-[100%] rounded-md mt-4">
        <Text className="text-white text-center ">Follow</Text>
      </Pressable>
    </View>
  );
};

export default NgoCard;
