import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  incrementFormProgress,
  nextStep,
} from "../../store/slices/OnBoardingFormSlice";
import SelectDropdown from "react-native-select-dropdown";
import { useUserData } from "../../context/userDataContext";

const AddressDetails = () => {
  const { onBoardingFormData, setOnBoardingFormData } = useUserData();
  const [city, setCity] = useState(onBoardingFormData.city);
  const [profession, setProfession] = useState(onBoardingFormData.profession);
  const professionOptions = [
    "Software Engineer",
    "Doctor",
    "Nurse",
    "Teacher",
    "Student",
  ];
  const dispatch = useDispatch();

  const handleNext = () => {
    setOnBoardingFormData((prevData) => ({ ...prevData, city, profession }));
    dispatch(nextStep());
    dispatch(incrementFormProgress());
  };

  return (
    <View className="mt-12">
      <View className="flex flex-col">
        <Text className="text-base font-bold text-base800 mb-3">City </Text>
        <TextInput
          className="border-2 border-base300 py-2 px-2 rounded-lg text-base "
          onChangeText={(value) => setCity(value)}
          value={city}
          placeholder="Islamabad"
        />
      </View>
      <View className="flex flex-col mt-4">
        <Text className="text-base font-bold text-base800 mb-3">
          Phone Number{" "}
        </Text>
        <SelectDropdown
          data={professionOptions}
          onSelect={(selectedItem, index) => {
            setProfession(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={{
            backgroundColor: "#edf0f7",
            borderRadius: 8,
            height: 40,
          }}
          buttonTextStyle={{
            color: "#000",
            fontSize: 16,
          }}
          dropdownStyle={{ marginTop: 8 }}
          defaultButtonText={profession}
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

export default AddressDetails;
