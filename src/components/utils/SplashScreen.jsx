import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import LoaderKit from "react-native-loader-kit";
import Loader from "../../../assets/loader.gif";

const SplashScreen = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <View className="flex flex-col justify-center items-center">
        <Image source={Loader} className="w-24 h-24 rounded-full mb-4" />
        <Text className="text-lg font-bold mt-2">Loading...</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
