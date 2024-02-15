import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("PreOnboarding");
  };
  return (
    <View className="flex flex-col mt-6 px-4">
      <View className="flex flex-col">
        <TextInput
          className="border-2 border-base300 mt-1 py-2 px-2 rounded-lg text-base"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter Your Email"
        />
        <TextInput
          className="border-2 border-base300 py-2 px-2 rounded-lg text-base mt-6"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter Your Password"
          type="password"
          secureTextEntry={true}
        />
      </View>
      <Pressable
        onPress={handleLogin}
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
