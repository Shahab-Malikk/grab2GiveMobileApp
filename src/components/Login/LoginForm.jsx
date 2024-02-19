import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "aws-amplify/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      console.log(email, password);
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password: password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });
      console.log(isSignedIn, nextStep);

      navigation.navigate("Onboarding");
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
        <TextInput
          className="border-2 border-base300 py-2 px-2 rounded-lg text-base mt-6"
          onChangeText={(value) => setPassword(value)}
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
        <Text className="text-white text-center font-semibold">Login</Text>
      </Pressable>
      <View className="flex flow-row justify-center mt-4">
        <Text className="text-center text-darkGrey text-base700">
          Don't have an account?{" "}
          <Text
            className="text-bgDark font-bold"
            onPress={() => navigation.navigate("Signup")}
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginForm;
