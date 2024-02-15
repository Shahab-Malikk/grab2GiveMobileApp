import { View, Text, Image } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
  const navigation = useNavigation();
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#fff",
          image: <Image source={require("../../assets/about1.png")} />,
          title: "Reduce Food Wastage by Helping Others",
          subtitle:
            "Get started with a new way to contribute to the society and avoid food wastage.",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../../assets/about2.png")} />,
          title: "Reduce Food Wastage by Helping Others",
          subtitle:
            "Give a little bit of your free time to deliver the food to whom it is needed.",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../../assets/about3.png")} />,
          title: "Reduce Food Wastage by Helping Others",
          subtitle:
            "Get started with a new way to contribute to the society and avoid food wastage.",
        },
      ]}
      onDone={() => {
        navigation.navigate("Login");
      }}
      onSkip={() => {
        navigation.navigate("Login");
      }}
      titleStyles={{ color: "#000", fontSize: 28, fontWeight: "500" }}
    />
  );
};

export default AboutScreen;
