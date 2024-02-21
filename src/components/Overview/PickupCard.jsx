import { View, Text, Image } from "react-native";
import React from "react";

const PickupCard = (props) => {
  const { hotelName, ngoName, date, foodName, reservationRequestId, status } =
    props.data;
  return (
    <View className="flex-1 justify-between flex-row p-4 bg-white rounded-sm mb-4">
      <Image
        source={require("../../../assets/volunteer1.webp")}
        className="w-16 h-24 rounded-md mr-2"
      />
      <View className="flex flex-col mr-2 ">
        <Text className=" text-sm font-bold mb-1">{hotelName}</Text>
        <View className="flex flex-row mb-1">
          <Text className="text-lightGrey text-xs">From : </Text>
          <Text className="text-xs">{hotelName}</Text>
        </View>
        <View className="flex w-[100%] flex-row mb-2">
          <Text className=" text-lightGrey text-xs">To : </Text>
          <Text className="text-xs">{ngoName }</Text>
        </View>
        <View className="flex flex-row gap-1 mb-1">
          <View className="p-1 bg-[#edf0f7] rounded-sm flex flex-row">
            <Text className=" text-darkGrey">Date :</Text>
            <Text>10 June, 2023</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PickupCard;
