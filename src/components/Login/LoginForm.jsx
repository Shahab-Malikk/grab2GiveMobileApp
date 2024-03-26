import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "aws-amplify/auth";
import { useUserData } from "../../context/userDataContext";
import { DataStore } from "@aws-amplify/datastore";
import { Ionicons } from "@expo/vector-icons";
import showToast from "../utils/Toast";
import { validateEmail, validatesimpleInput } from "../../utils/validateInputs";

const LoginForm = () => {
  const { setIsLoggedIn } = useUserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const navigation = useNavigation();

  const handleLogin = async () => {
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
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password: password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });
      console.log(isSignedIn, nextStep);
      setIsLoggedIn(true);
    } catch (e) {
      showToast("Invalid Credentials", "red");
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
            className="text-base w-[90%]"
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
