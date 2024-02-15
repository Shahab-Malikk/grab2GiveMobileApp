import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  nextStep,
  incrementFormProgress,
} from "../../store/slices/OnBoardingFormSlice";

const PersonalInformation = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(nextStep());
    dispatch(incrementFormProgress());
  };

  return (
    <View className="mt-12">
      <View className="flex flex-col">
        <Text className="text-base font-bold text-base800 mb-3">Name </Text>
        <TextInput
          className="border-2 border-base300 py-2 px-2 rounded-lg text-base "
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </View>
      <View className="flex flex-col mt-4">
        <Text className="text-base font-bold text-base800 mb-3">
          Phone Number{" "}
        </Text>
        <TextInput
          className="border-2 border-base300 py-2 px-2 rounded-lg text-base "
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
      </View>
      <View className="flex-1 flex-col items-center mt-20">
        <Pressable
          onPress={handleNext}
          className="flex-1 w-[100%] bg-black justify-center flex-row py-4 px-10 rounded-md items-center"
        >
          <Text className="text-white text-center font-semibold">Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PersonalInformation;
