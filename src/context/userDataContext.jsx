import React, { createContext, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { fetchUserAttributes } from "aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { Volunteer } from "../models";

const UserDataContext = createContext();

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }) => {
  const [onBoardingFormData, setOnBoardingFormData] = useState({
    name: "Malik",
    phone: "",
    city: "",
    profession: "Software Engineer",
    availiablityPrefrences: [],
  });
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  async function handleFetchUserAttributes() {
    try {
      const userAttributes = await fetchUserAttributes();
      console.log(userAttributes);
      setUserId(userAttributes.sub);
    } catch (error) {
      console.log(error);
    }
  }
  const getUserData = async () => {
    const userAttributes = await fetchUserAttributes();
    const userId = userAttributes.sub;
    const userData = await DataStore.query(Volunteer, userId);
    console.log(userData);
    setUserName(userData.name);
  };

  return (
    <UserDataContext.Provider
      value={{
        onBoardingFormData,
        setOnBoardingFormData,
        handleFetchUserAttributes,
        userId,
        getUserData,
        userName,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
