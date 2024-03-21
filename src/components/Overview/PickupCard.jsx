import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { DataStore } from "@aws-amplify/datastore";
import { ReservationRequest, Food } from "../../models";
import showToast from "../utils/Toast";
import { useUserData } from "../../context/userDataContext";

const PickupCard = (props) => {
  const {
    getNgosOfCurrentVolunteer,
    getUpComingDeliveries,
    setUpComingDeliveries,
    upComingDeliveries,
    setNoOfCompletedDeliveries,

    setNoOfUpcomingDeliveries,
  } = useUserData();

  const {
    hotelName,
    ngoName,
    date,
    foodName,
    reservationRequestId,
    status,
    foodId,
  } = props.data;
  const deliverFood = async () => {
    const oldFoodValue = await DataStore.query(Food, foodId);

    const updated = await DataStore.save(
      Food.copyOf(oldFoodValue, (updated) => {
        updated.foodStatus = "Delivered";
      })
    );
    const oldReservationRequest = await DataStore.query(
      ReservationRequest,
      reservationRequestId
    );
    const updatedReservationRequest = await DataStore.save(
      ReservationRequest.copyOf(oldReservationRequest, (updated) => {
        updated.status = "Delivered";
      })
    );
    showToast("Food Delivered Successfully", "green");
    setUpComingDeliveries(
      upComingDeliveries.filter(
        (item) => item.reservationRequestId !== reservationRequestId
      )
    );
    setNoOfCompletedDeliveries((prevState) => prevState + 1);
    setNoOfUpcomingDeliveries((prevState) => prevState - 1);
  };
  return (
    <View className="flex-1 justify-between flex-row p-4 bg-white rounded-sm mb-4">
      <Image
        source={require("../../../assets/meal1.png")}
        className="w-24 h-28 rounded-md mr-2"
      />
      <View className="flex flex-col mr-2 ">
        <Text className=" text-sm font-bold mb-1">{foodName}</Text>
        <View className="flex flex-row mb-1">
          <Text className="text-lightGrey text-xs">From : </Text>
          <Text className="text-xs">{hotelName}</Text>
        </View>
        <View className="flex w-[100%] flex-row mb-2">
          <Text className=" text-lightGrey text-xs">To : </Text>
          <Text className="text-xs">{ngoName}</Text>
        </View>
        <View className="flex flex-row gap-1 mb-1">
          <View className="p-1 bg-[#edf0f7] rounded-sm flex flex-row">
            <Text className=" text-darkGrey">Date :</Text>
            <Text>10 June, 2023</Text>
          </View>
        </View>
        <Pressable
          onPress={deliverFood}
          className="flex-1 items-center py-2 bg-black rounded-md"
        >
          <Text className="text-white">Mark As Delivered</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PickupCard;
