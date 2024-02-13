import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import PersonalInformation from "../components/Profile/PersonalInformation";

const PersonalInformationScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-4 py-4 bg-bgLight">
      <PersonalInformation />
    </SafeAreaView>
  );
};

export default PersonalInformationScreen;
