import { View, Text, Image } from "react-native";
import React from "react";

const ConfirmationScreenBanner = () => {
  return (
    <View className="py-4 px-4">
      <View className="flex flex-row justify-center pt-12">
        <Image
          source={require("../../../assets/g2gLogo.png")}
          className="w-24 h-24 rounded-full"
        />
      </View>
      <View className="flex flex-col items-center mt-16 w-[100%]">
        <Text className="text-2xl font-bold  text-base800 mb-2">
          Welcome to Grab2Give
        </Text>
        <Text className="text-darkGrey text-center">
          A confirmation code has been sent to your email. Please enter the code
          to verify your account.
        </Text>
      </View>
    </View>
  );
};

export default ConfirmationScreenBanner;
