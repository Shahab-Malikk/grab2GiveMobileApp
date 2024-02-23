import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { updatePassword } from "aws-amplify/auth";

const PasswordNSecurity = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleUpdatePassword = async () => {
    if (oldPassword === "" || newPassword === "") {
      alert("All fields are required");
      return;
    }
    console.log(oldPassword, newPassword);
    try {
      await updatePassword({ oldPassword, newPassword });
      console.log("Password updated successfully");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View className="px-4 py-4 flex-1">
      <Pressable
        className="mb-4"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="arrow-back-circle-outline" size={44} color="black" />
      </Pressable>
      <Text className="text-lg font-bold text-base800">
        Password & Security
      </Text>
      <Text className="text-lightGrey mt-2">Updated your password here.</Text>
      <View className="flex flex-col mt-8">
        <View className="flex flex-col">
          <Text className="text-sm text-base800">Old Password</Text>
          <TextInput
            className="border-2 border-base300 mt-1 py-2 px-2 rounded-lg "
            onChangeText={(value) => setOldPassword(value)}
            value={oldPassword}
          />
        </View>
        <View className="flex flex-col mt-4">
          <Text className="text-sm text-base800">New Password</Text>
          <TextInput
            className="border-2 border-base300 mt-1 py-2 px-2 rounded-lg "
            onChangeText={(value) => setNewPassword(value)}
            value={newPassword}
          />
        </View>
        <View className="flex flex-col mt-4">
          <Text className="text-sm text-base800">Confirm Password</Text>
          <TextInput
            className="border-2 border-base300 mt-1 py-2 px-2 rounded-lg "
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
          />
        </View>
      </View>
      <Pressable
        onPress={handleUpdatePassword}
        className="flex flex-row py-4 items-center justify-center bg-red w-[100%] rounded-md mt-10"
      >
        <Text className="text-white text-center font-semibold">
          Update Password
        </Text>
      </Pressable>
    </View>
  );
};

export default PasswordNSecurity;
