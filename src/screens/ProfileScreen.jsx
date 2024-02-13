import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import ProfileMain from "../components/Profile/ProfileMain";

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 px-4 py-4 bg-bgLight">
      <ProfileMain />
    </SafeAreaView>
  );
};

export default ProfileScreen;
