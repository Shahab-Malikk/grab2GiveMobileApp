import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import CheckBox from "react-native-check-box";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUserData } from "../../context/userDataContext";
import { DataStore } from "@aws-amplify/datastore";
import { Volunteer } from "../../models";
import BtnBack from "../utils/BtnBack";

const PersonalInformation = () => {
  const { currentUserData, userId, setCurrentUserData } = useUserData();
  const navigation = useNavigation();
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);
  const [name, setName] = useState(currentUserData.name);
  const [phone, setPhone] = useState(currentUserData.contactNumber.toString());
  const [city, setCity] = useState(currentUserData.city);
  const [profession, setProfession] = useState(currentUserData.hobbies);
  const [availablityPrefrences, setAvailablityPrefrences] = useState([]);

  const professionOptions = [
    "Software Engineer",
    "Doctor",
    "Nurse",
    "Teacher",
    "Student",
  ];

  const convertAvailablityPrefrences = (prefrences) => {
    const prefrencesArr = prefrences.split(",");
    setAvailablityPrefrences(prefrencesArr);
  };

  useEffect(() => {
    convertAvailablityPrefrences(currentUserData.availableDays);
  }, []);

  const handleCheckboxToggle = (itemValue) => {
    if (availablityPrefrences.includes(itemValue)) {
      setAvailablityPrefrences(
        availablityPrefrences.filter((item) => item !== itemValue)
      );
    } else {
      setAvailablityPrefrences([...availablityPrefrences, itemValue]);
    }
  };

  const saveData = async () => {
    const oldVolunteerData = await DataStore.query(Volunteer, userId);

    const updatedData = await DataStore.save(
      Volunteer.copyOf(oldVolunteerData, (updated) => {
        updated.name = name;
        updated.contactNumber = parseInt(phone);
        updated.city = city;
        updated.hobbies = profession;
        updated.availableDays = availablityPrefrences.toString();
      })
    );
    console.log(updatedData);
    setCurrentUserData(updatedData);
  };

  const enableFields = () => {
    setIsFieldsDisabled(false);
  };

  return (
    <View className="px-4 py-4 flex-1">
      <BtnBack />
      <Text className="text-lg font-bold text-base800">
        Personal Information
      </Text>
      <Text className="text-lightGrey mt-2">
        Update your personal information here.
      </Text>
      <View className="flex flex-row justify-end  mt-4 ">
        <Pressable
          onPress={enableFields}
          className="flex bg-black flex-row py-2 px-10 rounded-md  mr-4 items-center"
        >
          <Text className="text-white font-semibold text-xs">Edit</Text>
        </Pressable>
        <Pressable
          onPress={saveData}
          className="flex bg-black flex-row py-2 px-10 rounded-md items-center"
        >
          <Text className="text-white font-semibold text-xs">Save</Text>
        </Pressable>
      </View>
      <View className="flex-1 flex-col mt-8">
        <ScrollView>
          <View className="flex flex-col">
            <Text className="text-sm text-base800">Name </Text>
            <TextInput
              className="border-2 border-base300 mt-1 py-2 px-2 rounded-lg "
              onChangeText={(value) => setName(value)}
              value={name}
              editable={!isFieldsDisabled}
            />
          </View>
          <View className="flex flex-col mt-4">
            <Text className="text-sm text-base800">Phone</Text>
            <TextInput
              className="border-2 border-base300 mt-1 py-2 px-2 rounded-lg "
              onChangeText={(value) => setPhone(value)}
              value={phone}
              editable={!isFieldsDisabled}
            />
          </View>
          <View className="flex flex-col mt-4">
            <Text className="text-sm text-base800">City</Text>
            <TextInput
              className="border-2 border-base300 mt-1 py-2 px-2 rounded-lg "
              onChangeText={(value) => setCity(value)}
              value={city}
              editable={!isFieldsDisabled}
            />
          </View>
          <View className="flex flex-col mt-4">
            <Text className="text-sm text-base800">Profession</Text>
            <SelectDropdown
              data={professionOptions}
              onSelect={(selectedItem, index) => {
                setProfession(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                backgroundColor: "#edf0f7",
                borderRadius: 8,
                height: 40,
              }}
              buttonTextStyle={{
                color: "#000",
                fontSize: 16,
              }}
              dropdownStyle={{ marginTop: 8 }}
              defaultButtonText={profession}
              disabled={isFieldsDisabled}
            />
          </View>
          <View className="flex flex-col mt-4">
            <Text className="text-sm text-base800 mb-4">
              Availablity Prefrences
            </Text>
            <View className=" flex flex-row gap-3 flex-wrap">
              <View className="py-1 px-1  bg-secondary w-[45%] flex self-start flex-row">
                <CheckBox
                  onClick={() => handleCheckboxToggle("Monday")}
                  isChecked={availablityPrefrences.includes("Monday")}
                  rightText="Monday"
                  rightTextStyle={{
                    color: "#000",
                    alignSelf: "center",
                    marginLeft: 10,
                    fontSize: 12,
                  }}
                  style={{
                    flex: 1,
                    padding: 10,
                    alignItems: "start",
                    justifyContent: "start",
                  }}
                  disabled={isFieldsDisabled}
                />
              </View>
              <View className="py-1 px-3 bg-secondary w-[45%] flex self-start flex-row">
                <CheckBox
                  onClick={() => handleCheckboxToggle("Tuesday")}
                  isChecked={availablityPrefrences.includes("Tuesday")}
                  rightText="Tuesday"
                  rightTextStyle={{
                    color: "#000",
                    marginLeft: 10,
                    fontSize: 12,
                  }}
                  style={{ flex: 1, padding: 10 }}
                  disabled={isFieldsDisabled}
                />
              </View>
              <View className="py-1 px-3 bg-secondary w-[45%] flex self-start flex-row">
                <CheckBox
                  onClick={() => handleCheckboxToggle("Wednesday")}
                  isChecked={availablityPrefrences.includes("Wednesday")}
                  rightText="Wednesday"
                  rightTextStyle={{
                    color: "#000",
                    marginLeft: 10,
                    fontSize: 12,
                  }}
                  style={{ flex: 1, padding: 10 }}
                  disabled={isFieldsDisabled}
                />
              </View>
              <View className="py-1 px-3 bg-secondary w-[45%] flex self-start flex-row">
                <CheckBox
                  onClick={() => handleCheckboxToggle("Thursday")}
                  isChecked={availablityPrefrences.includes("Thursday")}
                  rightText="Thursday"
                  rightTextStyle={{
                    color: "#000",
                    marginLeft: 10,
                    fontSize: 12,
                  }}
                  style={{ flex: 1, padding: 10 }}
                  disabled={isFieldsDisabled}
                />
              </View>
              <View className="py-1 px-3 bg-secondary w-[45%] flex self-start flex-row">
                <CheckBox
                  onClick={() => handleCheckboxToggle("Firday")}
                  isChecked={availablityPrefrences.includes("Firday")}
                  rightText="Friday"
                  rightTextStyle={{
                    color: "#000",
                    marginLeft: 10,
                    fontSize: 12,
                  }}
                  style={{ flex: 1, padding: 10 }}
                  disabled={isFieldsDisabled}
                />
              </View>
              <View className="py-1 px-3 bg-secondary w-[45%] flex self-start flex-row">
                <CheckBox
                  onClick={() => handleCheckboxToggle("Saturday")}
                  isChecked={availablityPrefrences.includes("Saturday")}
                  rightText="Saturday"
                  rightTextStyle={{
                    color: "#000",
                    marginLeft: 10,
                    fontSize: 12,
                  }}
                  style={{ flex: 1, padding: 10 }}
                  disabled={isFieldsDisabled}
                />
              </View>
              <View className="py-1 px-3 bg-secondary w-[45%] flex self-start flex-row">
                <CheckBox
                  onClick={() => handleCheckboxToggle("Sunday")}
                  isChecked={availablityPrefrences.includes("Sunday")}
                  rightText="Sunday"
                  rightTextStyle={{
                    color: "#000",
                    marginLeft: 10,
                    fontSize: 12,
                  }}
                  style={{ flex: 1, padding: 10 }}
                  disabled={isFieldsDisabled}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PersonalInformation;
