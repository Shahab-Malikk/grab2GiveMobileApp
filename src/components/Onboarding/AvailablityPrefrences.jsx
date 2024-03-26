import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  incrementFormProgress,
  nextStep,
} from "../../store/slices/OnBoardingFormSlice";
import CheckBox from "react-native-check-box";
import { useNavigation } from "@react-navigation/native";
import { useUserData } from "../../context/userDataContext";
import { DataStore } from "@aws-amplify/datastore";
import { Volunteer } from "../../models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadData } from "@aws-amplify/storage";

const AvailablityPrefrences = () => {
  const {
    onBoardingFormData,
    setOnBoardingFormData,
    userId,
    setIsOnboardingCompleted,
  } = useUserData();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [availablityPrefrences, setAvailablityPrefrences] = useState(
    onBoardingFormData.availiablityPrefrences
  );

  const handleCheckboxToggle = (itemValue) => {
    if (availablityPrefrences.includes(itemValue)) {
      setAvailablityPrefrences(
        availablityPrefrences.filter((item) => item !== itemValue)
      );
    } else {
      setAvailablityPrefrences([...availablityPrefrences, itemValue]);
    }
  };

  const handleNext = async () => {
    setOnBoardingFormData((prevData) => ({
      ...prevData,
      availiablityPrefrences: availablityPrefrences,
    }));
    console.log(onBoardingFormData);
    try {
      const availiablityPrefrencesStr = availablityPrefrences.toString();
      console.log(availiablityPrefrencesStr);
      const volunteerData = {
        id: userId,
        image: userId,
        name: onBoardingFormData.name,
        contactNumber: Number(onBoardingFormData.phone),
        city: onBoardingFormData.city,
        hobbies: onBoardingFormData.profession,
        availableDays: availiablityPrefrencesStr,
        userId: userId,
      };

      // DataStore.clear();

      await DataStore.save(new Volunteer(volunteerData));
      if (onBoardingFormData.profileImage !== null) {
        const result = await uploadData({
          key: userId.toString(),
          data: onBoardingFormData.profileImage,
          options: {
            contentType:
              "image/jpeg, image/png, image/jpg, image/gif, image/svg",
          },
        }).result;
        console.log("Succeeded", result);
      }
      // await AsyncStorage.setItem("isOnboardingCompleted", "true");
    } catch (e) {
      console.log(e);
    }
    dispatch(nextStep());
    dispatch(incrementFormProgress());
  };

  useEffect(() => {
    console.log(onBoardingFormData);
    console.log(userId);
  }, [onBoardingFormData]);

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
                marginLeft: 10,
                fontSize: 12,
              }}
              style={{
                flex: 1,
                padding: 10,
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
