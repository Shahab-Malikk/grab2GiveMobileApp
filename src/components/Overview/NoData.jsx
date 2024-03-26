import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import homeScreenEmptyIlls from "../../../assets/homeScreenEmptyIlls.png";
import { useNavigation } from "@react-navigation/native";

const NoData = () => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("Ngos");
  };

  return (
    <View className="flex-col flex-1 justify-center items-center">
      <Image source={homeScreenEmptyIlls} className="w-40 h-40" />
      <Text className="text-[#4A5468] w-[70%] font-semibold text-sm mt-5 text-center">
        No data available. Try following Ngo or Wait for upcoming pickups.
      </Text>
      <Pressable
        onPress={handleNavigation}
        className="px-8 py-3 bg-black rounded-lg mt-5"
      >
        <Text className="text-white font-semibold">Try following Ngo</Text>
      </Pressable>
    </View>
  );
};

export default NoData;
