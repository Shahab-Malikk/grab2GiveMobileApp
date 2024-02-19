import { View, Text, SafeAreaView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PersonalInformation from "../components/Onboarding/PersonalInformation";
import AvailablityPrefrences from "../components/Onboarding/AvailablityPrefrences";
import AddressDetails from "../components/Onboarding/AddressDetails";
import PostOnboardingScreen from "./PostOnboardingScreen";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  prevStep,
  decrementFormProgress,
} from "../store/slices/OnBoardingFormSlice";
import { useUserData } from "../context/userDataContext";

const OnBoardingScreen = () => {
  const { handleFetchUserAttributes } = useUserData();
  const dispatch = useDispatch();
  const step = useSelector((state) => state.onBoardingForm.stepCount);
  const formProgress = useSelector(
    (state) => state.onBoardingForm.formProgress
  );

  console.log(formProgress);

  const formToShow = () => {
    switch (step) {
      case 0:
        return <PersonalInformation />;
      case 1:
        return <AddressDetails />;
      case 2:
        return <AvailablityPrefrences />;
      case 3:
        return <PostOnboardingScreen />;

      default:
        return <PersonalInformation />;
    }
  };

  useEffect(() => {
    handleFetchUserAttributes();
  }, []);

  return (
    <SafeAreaView className="flex-1 px-4 py-4 bg-bgLight">
      <View className="px-4 py-4">
        <View className="flex flex-row justify-center items-center">
          <Pressable
            className="mr-4"
            onPress={() => {
              dispatch(prevStep());
              dispatch(decrementFormProgress());
            }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={44}
              color="black"
            />
          </Pressable>
          <View className="flex-1 h-2 rounded bg-[#e2f2e3]">
            <View
              className="bg-[#4CAF50]  h-2 rounded"
              style={{
                width: `${formProgress}%`,
              }}
            ></View>
          </View>
        </View>
        {formToShow()}
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
