import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useUserData } from "../../context/userDataContext";
import { ReservationRequest } from "../../models";
import { DataStore } from "@aws-amplify/datastore";

const ReservedFoodHomeScreenCard = (props) => {
  const { hotelName, ngoName, date, foodName, reservationRequestId, status } =
    props.data;
  const { setFoodListReservedByNgos, foodListReservedByNgos, userId } =
    useUserData();
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()} ${d.toLocaleString("default", {
      month: "short",
    })}, ${d.getFullYear()}`;
  };

  const beVolunteer = async () => {
    const oldReservationRequest = await DataStore.query(
      ReservationRequest,
      reservationRequestId
    );

    const updatedResrvationRequest = await DataStore.save(
      ReservationRequest.copyOf(oldReservationRequest, (updated) => {
        updated.status = "VOLUNTEERED";
        updated.volunteerID = userId;
      })
    );

    setFoodListReservedByNgos(
      foodListReservedByNgos.filter(
        (item) => item.reservationRequestId !== reservationRequestId
      )
    );
  };

  return (
    <View className="flex-1 flex-col mb-4 bg-white p-4 mr-4">
      <Image
        source={require("../../../assets/meal1.png")}
        className="w-[100%] h-24 rounded-md mr-2"
      />
      <View>
        <Text className=" text-sm font-bold mb-1">{foodName}</Text>
        <View className="flex flex-row mb-1">
          <Text className="text-lightGrey text-xs">From : </Text>
          <Text className="text-xs">{hotelName}</Text>
        </View>
        <View className="flex w-[100%] flex-row mb-2">
          <Text className=" text-lightGrey text-xs">To : </Text>
          <Text className="text-xs">{ngoName}</Text>
        </View>
        <View className="p-1 bg-[#edf0f7] rounded-sm flex w-44 flex-row">
          <Text className=" text-darkGrey">Date :</Text>
          <Text>{formatDate(date)}</Text>
        </View>
        <Pressable
          onPress={beVolunteer}
          className="flex-1 py-2 bg-black w-[80%] ml-[10%] rounded-md mt-4"
        >
          <Text className="text-white text-center ">Be Voulnteer</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReservedFoodHomeScreenCard;
