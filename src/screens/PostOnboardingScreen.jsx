import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useUserData } from "../context/userDataContext";

const PostOnboardingScreen = () => {
  const { setIsOnboardingCompleted } = useUserData();
  const navigation = useNavigation();
  const handleNavigation = () => {
    setIsOnboardingCompleted(true);
  };
  return (
    <View className="py-4 px-4">
      <View className="flex flex-col items-center mt-20 w-[100%]">
        <Text className="text-lg font-bold text-center  text-base800 mb-2">
          See this was Easy!
        </Text>
        <Text className="text-lg font-bold text-center  text-base800 mb-2">
          We are all set and Ready to Help the Community!
        </Text>
        <Text className="text-darkGrey text-center text-xs font-bold">
          Let’s start doing some good deeds.
        </Text>
      </View>
      <View className="flex flex-col items-center mt-8">
        <Pressable
          onPress={handleNavigation}
          className="flex w-[100%] bg-black justify-center flex-row py-4 px-10 rounded-md items-center"
        >
          <Text className="text-white text-center font-semibold">
            Let's Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PostOnboardingScreen;
