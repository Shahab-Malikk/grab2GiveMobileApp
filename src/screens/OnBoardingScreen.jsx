import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PersonalInformation from "../components/Onboarding/PersonalInformation";
import AvailablityPrefrences from "../components/Onboarding/AvailablityPrefrences";
import AddressDetails from "../components/Onboarding/AddressDetails";
import PostOnboardingScreen from "./PostOnboardingScreen";

const OnBoardingScreen = () => {
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

  return (
    <SafeAreaView className="flex-1 px-4 py-4 bg-bgLight">
      <View className="px-4 py-4">
        <View className="flex-1 h-2 rounded bg-[#e2f2e3]">
          <View
            className="bg-[#4CAF50]  h-2 rounded"
            style={{
              width: `${formProgress}%`,
            }}
          ></View>
        </View>
        {formToShow()}
      </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
