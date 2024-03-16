import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useUserData } from "../../context/userDataContext";
import ReservedFoodHomeScreenCard from "../ReservedFoods/ReservedFoodHomeScreenCard";
import { ScrollView } from "react-native-gesture-handler";

const RecentReservedFoods = () => {
  const { foodListReservedByNgos } = useUserData();
  const navigation = useNavigation();
  const navigateToPickups = () => {
    navigation.navigate("Explore");
  };
  
  return (
    <>
      <View className="px-10 mt-28">
        <View className="flex flex-row justify-between mb-4 items-center">
          <Text className="text-lg font-bold text-base800">
            Recent Reserved Foods
          </Text>
          <Pressable onPress={navigateToPickups}>
            <Text className="text-base800">See All</Text>
          </Pressable>
        </View>
        {foodListReservedByNgos.length === 0 && <Text>No reserved foods</Text>}
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="ml-[5%] w-[90%]"
      >
        {foodListReservedByNgos.map((item) => (
          <ReservedFoodHomeScreenCard
            key={item.reservationRequestId}
            data={item}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default RecentReservedFoods;
