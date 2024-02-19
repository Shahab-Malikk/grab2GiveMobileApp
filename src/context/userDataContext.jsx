import React, { createContext, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { fetchUserAttributes } from "aws-amplify/auth";

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

  async function handleFetchUserAttributes() {
    try {
      const userAttributes = await fetchUserAttributes();
      console.log(userAttributes);
      setUserId(userAttributes.sub);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserDataContext.Provider
      value={{
        onBoardingFormData,
        setOnBoardingFormData,
        handleFetchUserAttributes,
        userId,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
