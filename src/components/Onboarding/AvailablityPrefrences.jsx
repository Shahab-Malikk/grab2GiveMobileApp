import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  incrementFormProgress,
  nextStep,
} from "../../store/slices/OnBoardingFormSlice";
import CheckBox from "react-native-check-box";
import { useNavigation } from "@react-navigation/native";

const AvailablityPrefrences = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [availablityPrefrences, setAvailablityPrefrences] = useState([
    "Monday",
    "Tuesday",
  ]);

  const handleCheckboxToggle = (itemValue) => {
    if (availablityPrefrences.includes(itemValue)) {
      setAvailablityPrefrences(
        availablityPrefrences.filter((item) => item !== itemValue)
      );
    } else {
      setAvailablityPrefrences([...availablityPrefrences, itemValue]);
    }
  };

  const handleNext = () => {
    dispatch(nextStep());
    dispatch(incrementFormProgress());
  };

  return (
    <View className="mt-12">
      <View className="flex flex-col">
        <Text className="text-base font-bold text-base800 mb-3">
          Availiablity Prefrences{" "}
        </Text>

        <View className=" flex flex-row gap-3 flex-wrap">
          <View className="py-1 px-1  bg-secondary w-[45%] flex self-start flex-row">
            <CheckBox
              onClick={() => handleCheckboxToggle("Monday")}
              isChecked={availablityPrefrences.includes("Monday")}
              rightText="Monday"
              rightTextStyle={{
                color: "#000",
                alignSelf: "center",
                marginLeft: 10,
                fontSize: 12,
              }}
              style={{
                flex: 1,
                padding: 10,
                alignItems: "start",
                justifyContent: "start",
              }}
            />
          </View>
          <View className="py-1 px-3 bg-secondary w-[45%] flex self-start flex-row">
            <CheckBox
              onClick={() => handleCheckboxToggle("Tuesday")}
              isChecked={availablityPrefrences.includes("Tuesday")}
              rightText="Tuesday"
              rightTextStyle={{
                color: "#000",
                marginLeft: 10,
                fontSize: 12,
              }}
              style={{ flex: 1, padding: 10 }}
            />
          </View>
          <View className="py-1 px-3 bg-secondary w-[45%] flex self-start flex-row">
            <CheckBox
              onClick={() => handleCheckboxToggle("Wednesday")}
              isChecked={availablityPrefrences.includes("Wednesday")}
              rightText="Wednesday"
              rightTextStyle={{
                color: "#000",
                marginLeft: 10,
                fontSize: 12,
              }}
              style={{ flex: 1, padding: 10 }}
            />
          </View>
          <View className="py-1 px-3 bg-secondary w-[45%] flex self-start flex-row">
            <CheckBox
              onClick={() => handleCheckboxToggle("Thursday")}
              isChecked={availablityPrefrences.includes("Thursday")}
              rightText="Thursday"
              rightTextStyle={{
                color: "#000",
                marginLeft: 10,
                fontSize: 12,
              }}
              style={{ flex: 1, padding: 10 }}
            />
          </View>
          <View className="py-1 px-3 bg-secondary w-[45%] flex self-start flex-row">
            <CheckBox
              onClick={() => handleCheckboxToggle("Firday")}
              isChecked={availablityPrefrences.includes("Firday")}
              rightText="Friday"
              rightTextStyle={{
                color: "#000",
                marginLeft: 10,
                fontSize: 12,
              }}
              style={{ flex: 1, padding: 10 }}
            />
          </View>
          <View className="py-1 px-3 bg-secondary w-[45%] flex self-start flex-row">
            <CheckBox
              onClick={() => handleCheckboxToggle("Saturday")}
              isChecked={availablityPrefrences.includes("Saturday")}
              rightText="Saturday"
              rightTextStyle={{
                color: "#000",
                marginLeft: 10,
                fontSize: 12,
              }}
              style={{ flex: 1, padding: 10 }}
            />
          </View>
          <View className="py-1 px-3 bg-secondary w-[45%] flex self-start flex-row">
            <CheckBox
              onClick={() => handleCheckboxToggle("Sunday")}
              isChecked={availablityPrefrences.includes("Sunday")}
              rightText="Sunday"
              rightTextStyle={{
                color: "#000",
                marginLeft: 10,
                fontSize: 12,
              }}
              style={{ flex: 1, padding: 10 }}
            />
          </View>
        </View>
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

export default AvailablityPrefrences;