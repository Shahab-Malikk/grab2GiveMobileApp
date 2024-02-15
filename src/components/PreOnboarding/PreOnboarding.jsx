import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { incrementFormProgress } from "../../store/slices/OnBoardingFormSlice";
import { useDispatch } from "react-redux";

const PreOnboarding = () => {
  const step = useSelector((state) => state.onBoardingForm.stepCount);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(step);
  const navigateToOnboarding = () => {
    navigation.navigate("Onboarding");
    dispatch(incrementFormProgress());
  };
  return (
    <View className="py-4 px-4">
      <View className="flex flex-row justify-center pt-12">
        <Image
          source={require("../../../assets/g2gLogo.png")}
          className="w-24 h-24 rounded-full"
        />
      </View>
      <View className="flex flex-col items-center mt-16 w-[100%]">
        <Text className="text-2xl font-bold  text-base800 mb-2">
          Congratulations🎉
        </Text>
        <Text className="text-darkGrey text-center text-xs font-bold">
          You have successfully Signed up.
        </Text>
        <Text className=" text-darkGrey text-center mt-4">
          Now you can get started after a quick onboarding which we need to make
          sure the to tailor the experience according to your needs.
        </Text>
      </View>
      <View className="flex flex-col items-center mt-8">
        <Pressable
          onPress={navigateToOnboarding}
          className="flex bg-black justify-center flex-row py-4 px-10 rounded-md items-center"
        >
          <Text className="text-white text-center font-semibold">
            Let's Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PreOnboarding;
