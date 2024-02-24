import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";

const SplashScreen = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-bgDark">
      <Image
        source={require("../../../assets/g2gLogo.png")}
        className="w-24 h-24 rounded-full"
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
