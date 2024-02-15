import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import PreOnboarding from "../components/PreOnboarding/PreOnboarding";

const PreOnboardingScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-4 bg-bgLight">
      <PreOnboarding />
    </SafeAreaView>
  );
};

export default PreOnboardingScreen;
