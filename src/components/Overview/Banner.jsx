import { View, Text, Image } from "react-native";
import React from "react";
import { useUserData } from "../../context/userDataContext";

const Banner = () => {
  const { currentUserData, userImage } = useUserData();
  return (
    <>
      <View className="py-6 h-44 px-10 bg-[#1e1e1e]">
        <View className="flex flex-row">
          <Image
            source={
              userImage
                ? { uri: userImage }
                : require("../../../assets/volunteer1.webp")
            }
            className="w-10 h-10 rounded-full"
          />
          <View className="ml-4 flex flex-col">
            <Text className="text-white">Welcome</Text>
            <Text className="text-white text-2xl font-semibold ">
              {currentUserData?.name}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Banner;
