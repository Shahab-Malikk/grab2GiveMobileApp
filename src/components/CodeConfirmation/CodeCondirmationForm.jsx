import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { confirmSignUp, getCurrentUser } from "aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../utils/Toast";

const CodeCondirmationForm = () => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const navigation = useNavigation();

  const handleVerifyCode = async () => {
    try {
      const username = await AsyncStorage.getItem("userName");
      console.log(username);
      console.log(value);

      if (value.length < 6) {
        showToast("Please enter a valid code", "red");
        return;
      }

      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode: value,
      });
      console.log(isSignUpComplete, nextStep);
      navigation.navigate("Login");
    } catch (e) {
      showToast("Something went wrong", "red");
      console.log(e);
    }
  };

  return (
    <View className="flex flex-col mt-6 px-4">
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Pressable
        onPress={handleVerifyCode}
        className="flex bg-black justify-center flex-row py-4 px-10 rounded-md mt-8 items-center"
      >
        <Text className="text-white text-center font-semibold">
          Verify Code
        </Text>
      </Pressable>
    </View>
  );
};

export default CodeCondirmationForm;

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
