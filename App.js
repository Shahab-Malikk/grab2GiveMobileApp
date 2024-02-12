import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwindcss-react-native";
import { Amplify } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { Hotel } from "./src/models";
import amplifyconfig from "./src/amplifyconfiguration.json";
import MainStackContainer from "./src/navigation/MainStackContainer";
Amplify.configure(amplifyconfig);

export default function App() {
  const getHotels = async () => {
    const hotels = await DataStore.query(Hotel);
    console.log(hotels);
  };

  // useEffect(() => {
  //   getHotels();
  // }, []);

  return (
    <SafeAreaProvider>
      <TailwindProvider>
        <SafeAreaView className="flex-1 bg-lightGrey">
          <StatusBar style="auto" />
          <MainStackContainer />
        </SafeAreaView>
      </TailwindProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
