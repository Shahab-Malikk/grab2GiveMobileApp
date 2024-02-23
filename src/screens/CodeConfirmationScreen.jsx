import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import ConfirmationScreenBanner from "../components/CodeConfirmation/ConfirmationScreenBanner";
import CodeCondirmationForm from "../components/CodeConfirmation/CodeCondirmationForm";

const CodeConfirmationScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-4 bg-bgLight">
      <ConfirmationScreenBanner />
      <CodeCondirmationForm />
    </SafeAreaView>
  );
};

export default CodeConfirmationScreen;
