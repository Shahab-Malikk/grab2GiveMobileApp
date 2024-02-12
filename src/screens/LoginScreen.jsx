import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-center items-center bg-amber-200">
      <Text>LoginScreen</Text>
      <Pressable
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text>Go to Home</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
