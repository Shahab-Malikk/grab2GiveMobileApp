import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const BtnBack = () => {
  const navigation = useNavigation();
  return (
    <>
      <Pressable
        className="mb-4"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back-circle-outline" size={44} color="black" />
      </Pressable>
    </>
  );
};

export default BtnBack;
