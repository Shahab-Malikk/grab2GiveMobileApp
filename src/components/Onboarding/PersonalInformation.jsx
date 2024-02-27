import { View, Text, Pressable, TextInput, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  nextStep,
  incrementFormProgress,
} from "../../store/slices/OnBoardingFormSlice";
import { useUserData } from "../../context/userDataContext";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PersonalInformation = () => {
  const { onBoardingFormData, setOnBoardingFormData } = useUserData();
  const [name, setName] = useState(onBoardingFormData.name);
  const [phone, setPhone] = useState(onBoardingFormData.phone);
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();

  const handleNext = () => {
    setOnBoardingFormData((prevData) => ({ ...prevData, name, phone }));

    dispatch(nextStep());
    dispatch(incrementFormProgress());
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

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    async function getId() {
      const userId = await AsyncStorage.getItem("userId");
      console.log("user id", userId);
    }
    getId();
  }, []);

  return (
    <View className="mt-12">
      <View className="flex items-center flex-col">
        <View className="p-1 rounded-full border-2 border-gray-300 w-24 h-24">
          <Image
            source={
              profileImage
                ? { uri: profileImage }
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
      </View>
      <View className="flex flex-col">
        <Text className="text-base font-bold text-base800 mb-3">Name </Text>
        <TextInput
          className="border-2 border-base300 py-2 px-2 rounded-lg text-base "
          onChangeText={(value) => setName(value)}
          value={name}
        />
      </View>
      <View className="flex flex-col mt-4">
        <Text className="text-base font-bold text-base800 mb-3">
          Phone Number{" "}
        </Text>
        <TextInput
          className="border-2 border-base300 py-2 px-2 rounded-lg text-base "
          onChangeText={(value) => setPhone(value)}
          value={phone}
        />
      </View>
      <View className="flex-1 flex-col items-center mt-20">
        <Pressable
          onPress={handleNext}
          className="flex-1 w-[100%] bg-black justify-center flex-row py-4 px-10 rounded-md items-center"
        >
          <Text className="text-white text-center font-semibold">Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PersonalInformation;
