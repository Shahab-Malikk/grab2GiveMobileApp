import React, { createContext, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { fetchUserAttributes } from "aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { Volunteer, Ngo } from "../models";

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
  const [ngos, setNgos] = useState([]);

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
    setUserId(userAttributes.sub);
    const userId = userAttributes.sub;
    const userData = await DataStore.query(Volunteer, userId);
    console.log(userData);
    setUserName(userData.name);
  };

  const getNgosFromDb = async () => {
    const ngos = await DataStore.query(Ngo);
    console.log(ngos);
    setNgos(ngos);
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
        getNgosFromDb,
        ngos,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
