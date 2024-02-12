import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NgosScreen from "../screens/NgosScreen";
import DeliveriesScreen from "../screens/DeliveriesScreen";
import ExploreScreen from "../screens/ExploreScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const TabContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName="Overview"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Overview") {
            iconName = focused ? "home-sharp" : "home-outline";
          }
          if (route.name === "Explore") {
            iconName = focused ? "search-sharp" : "search-outline";
          }
          if (route.name === "Ngos") {
            iconName = focused ? "people-sharp" : "people-outline";
          }
          if (route.name === "Deliveries") {
            iconName = focused ? "car-sharp" : "car-outline";
          } else if (route.name === "Profile") {
            iconName = focused
              ? "person-circle-sharp"
              : "person-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "black",
          marginBottom: 10,
          width: "90%",
          marginLeft: "5%",
          borderRadius: 10,
        },
      })}
    >
      <Tab.Screen
        name="Overview"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerShown: false,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Ngos"
        component={NgosScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Deliveries"
        component={DeliveriesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabContainer;
