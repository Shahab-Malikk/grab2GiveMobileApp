import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import PasswordNSecurity from "../components/Profile/PasswordNSecurity";

const UpdatePasswordScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-4 py-4 bg-bgLight">
      <PasswordNSecurity />
    </SafeAreaView>
  );
};

export default UpdatePasswordScreen;
