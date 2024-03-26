import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signUp } from "aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { Users } from "../../models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { validateEmail, validatesimpleInput } from "../../utils/validateInputs";
import showToast from "../utils/Toast";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      console.log(email, password);
      if (email === "" || password === "") {
        showToast("Please fill all the fields", "red");
        return;
      }
      if (!validateEmail(email)) {
        showToast("Please enter a valid email", "red");
        return;
      }
      if (!validatesimpleInput(password)) {
        showToast("Password should be atleast 8 characters long", "red");
        return;
      }

      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password: password,
      });
      await AsyncStorage.setItem("userName", email);
      console.log(isSignUpComplete, userId, nextStep);
      const user = await DataStore.save(
        new Users({
          id: userId,
          email: email,
          userRole: "volunteer",
        })
      );
      navigation.navigate("CodeConfirmation");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View className="flex flex-col mt-6 px-4">
      <View className="flex flex-col">
        <TextInput
          className="border-2 border-base300 mt-1 py-2 px-2 rounded-lg text-base"
          onChangeText={(value) => setEmail(value)}
          value={email}
          placeholder="Enter Your Email"
        />
        <View className="border-2 border-base300 py-2 px-2 rounded-lg  mt-6 flex flex-row justify-between">
          <TextInput
            className="text-base w-[80%]"
            onChangeText={(value) => setPassword(value)}
            value={password}
            placeholder="Enter Your Password"
            type="password"
            secureTextEntry={showPassword}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            className="flex items-center justify-center"
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      </View>
      <Pressable
        onPress={handleSignup}
        className="flex bg-black justify-center flex-row py-4 px-10 rounded-md mt-8 items-center"
      >
        <Text className="text-white text-center font-semibold">Signup</Text>
      </Pressable>
      <View className="flex flow-row justify-center mt-4">
        <Text className="text-center text-darkGrey text-base700">
          Already have an account?{" "}
          <Text
            className="text-bgDark font-bold"
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignupForm;
