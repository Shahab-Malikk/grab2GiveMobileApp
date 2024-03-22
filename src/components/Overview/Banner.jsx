import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useUserData } from "../../context/userDataContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Banner = () => {
  const { currentUserData, userImage, isNewNotification } = useUserData();
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("Notifications");
  };

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
          <View className="relative flex flex-1 self-start items-end">
            <Pressable onPress={handleNavigate}>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </Pressable>
            <View className="absolute -top-0 -right-0">
              {isNewNotification && (
                <View className="w-2 h-2 bg-red rounded-full"></View>
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Banner;
