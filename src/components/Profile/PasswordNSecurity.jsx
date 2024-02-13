import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";

const PasswordNSecurity = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View className="px-4 py-4 flex-1">
      <Text className="text-lg font-bold text-base800">
        Personal Information
      </Text>
      <Text className="text-lightGrey mt-2">
        Update your personal information here.
      </Text>
      <View className="flex flex-col mt-8">
        <View className="flex flex-col">
          <Text className="text-sm text-base800">Old Password : </Text>
          <TextInput
            className="border-b border-base300 mt-1"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
          />
        </View>
        <View className="flex flex-col mt-4">
          <Text className="text-sm text-base800">New Password : </Text>
          <TextInput
            className="border-b border-base300 mt-1"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </View>
        <View className="flex flex-col mt-4">
          <Text className="text-sm text-base800">Confirm Password : </Text>
          <TextInput
            className="border-b border-base300 mt-1"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
          />
        </View>
      </View>
      <Pressable className="flex bg-black justify-center flex-row py-2 px-10 rounded-md mt-8 items-center">
        <Text className="text-white text-center font-semibold">Save</Text>
      </Pressable>
    </View>
  );
};

export default PasswordNSecurity;
