import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import AllNgos from "../components/Ngos/AllNgos";
import { useUserData } from "../context/userDataContext";

const NgosScreen = () => {
  const { getNgosFromDb } = useUserData();

  useEffect(() => {
    getNgosFromDb();
  }, []);

  return (
    <SafeAreaView className="flex-1 px-4 bg-bgLight">
      <AllNgos />
    </SafeAreaView>
  );
};

export default NgosScreen;
