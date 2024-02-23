import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "aws-amplify/auth";
import { useUserData } from "../../context/userDataContext";

const ProfileMain = () => {
  const { getUserData, setIsLoggedIn } = useUserData();
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await signOut({
        global: true,
      });
      setIsLoggedIn(false);
      // navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   getUserData();
  // }, []);
  return (
    <View className="flex-1 flex flex-col mt-12 px-4">
      <View className="flex flex-col justify-center items-center">
        <View className=" w-24 h-24 rounded-full border-2 border-gray-300 p-1">
          <Image
            source={require("../../../assets/volunteer1.webp")}
            className="w-[100%] h-[100%] rounded-full"
          />
        </View>
        <Text className="text-lg font-bold mt-2">Arsalan</Text>
      </View>
      <View className="flex flex-1 flex-col justify-start items-start mt-10">
        <Pressable
          className="flex items-center w-[100%] px-6 pb-2 flex-row border-b-2 border-gray-300 border-spacing-6 "
          onPress={() => navigation.navigate("PersonalInfo")}
        >
          <Ionicons name="person-outline" size={24} color="black" />
          <Text className="text-lg ml-4">Personal Information</Text>
        </Pressable>

        <Pressable
          className="flex items-center w-[100%] mt-4 px-6 py-2 flex-row border-b-2 border-gray-300 border-spacing-6"
          onPress={() => navigation.navigate("UpdatePassword")}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
          <Text className="text-lg ml-4">Password & Security </Text>
        </Pressable>
      </View>

      <View className="flex flex-col items-center mb-10">
        <Text className="">Version 1.0.0</Text>
        <Pressable
          onPress={handleLogout}
          className="flex flex-row py-4 items-center justify-center bg-red w-[100%] rounded-md mt-4"
        >
          <Text className="text-white text-center mr-2">Logout</Text>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileMain;
