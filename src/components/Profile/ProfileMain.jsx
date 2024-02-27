import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "aws-amplify/auth";
import { useUserData } from "../../context/userDataContext";
import { DataStore } from "@aws-amplify/datastore";
import * as ImagePicker from "expo-image-picker";
import { uploadData } from "@aws-amplify/storage";
import { Volunteer } from "../../models";

const ProfileMain = () => {
  const {
    getUserData,
    setIsLoggedIn,
    userImage,
    setUserImage,
    currentUserData,
  } = useUserData();
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await signOut({
        global: true,
      });
      await DataStore.clear().then(() => {
        console.log("Datastore cleared");
      });
      setIsLoggedIn(false);
      // navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    console.log("assesst ", result.assets[0]);

    if (!result.canceled) {
      setUserImage(result.assets[0].uri);
      const imagetoUpload = result.assets[0].uri;
      try {
        // const response = await fetch(imagetoUpload);
        // const blob = await response.blob();
        // console.log("blob", blob);

        // const file = new File([blob], "imageName.jpg", {
        //   type: "image/jpeg, image/png, image/svg, image/jpg",
        // });

        const result = await uploadData({
          key: currentUserData.id.toString(),
          data: result.assets[0],
          options: {
            contentType:
              "image/jpeg, image/png, image/jpg, image/gif, image/svg",
          },
        }).result;
        console.log("Succeeded", result);
        const oldUserData = await DataStore.query(
          Volunteer,
          currentUserData.id
        );

        const updatedUserData = await DataStore.save(
          Volunteer.copyOf(oldUserData, (updated) => {
            updated.image = result.key;
          })
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    console.log("user data Image", currentUserData.profileImage);
  }, []);
  return (
    <View className="flex-1 flex flex-col mt-12 px-4">
      <View className="flex flex-col justify-center items-center">
        <View className="p-1 rounded-full border-2 border-gray-300 w-24 h-24">
          <Image
            source={
              currentUserData.profileImage
                ? { uri: currentUserData.profileImage }
                : require("../../../assets/volunteer1.webp")
            }
            className="w-[100%] h-[100%] rounded-full mb-4"
          />
        </View>
        <Pressable
          className="rounded-md mb-4 mt-2 flex items-center"
          onPress={pickImage}
        >
          <Ionicons name="pencil-outline" size={24} color="black" />
        </Pressable>
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
