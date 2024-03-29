import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwindcss-react-native";
import { Amplify } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { Hotel } from "./src/models";
import {
  TapGestureHandler,
  RotationGestureHandler,
} from "react-native-gesture-handler";
import amplifyconfig from "./src/amplifyconfiguration.json";
import MainStackContainer from "./src/navigation/MainStackContainer";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { UserDataProvider } from "./src/context/userDataContext";
import { RootSiblingParent } from "react-native-root-siblings";
Amplify.configure(amplifyconfig);

export default function App() {
  useEffect(() => {
    DataStore.start();
  }, []);

  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <Provider store={store}>
          <UserDataProvider>
            <TailwindProvider>
              <SafeAreaView className="flex-1">
                <StatusBar style="auto" />
                <MainStackContainer />
              </SafeAreaView>
            </TailwindProvider>
          </UserDataProvider>
        </Provider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
}
