import React, { createContext, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { fetchUserAttributes } from "aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { Volunteer, Ngo, VolunteerNgo } from "../models";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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
  const [currentUserNgos, setCurrentUserNgos] = useState([]);
  const [filteredNgos, setFilteredNgos] = useState([]);
  const [followedNgos, setFollowedNgos] = useState([]);
  const [unfollowedNgos, setUnfollowedNgos] = useState([]);

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
    const ngosFromDb = await DataStore.query(Ngo);
    console.log(ngosFromDb);
    setNgos(ngosFromDb);
    const promise = getNgosOfCurrentVolunteer();

    Promise.all([promise]).then(() => {
      setFollowedNgos(ngos.filter((item) => currentUserNgos.includes(item.id)));
      setUnfollowedNgos(
        ngos.filter((item) => !currentUserNgos.includes(item.id))
      );
    });
  };

  const getNgosOfCurrentVolunteer = async () => {
    const ngosFromDb = await DataStore.query(VolunteerNgo, (c) =>
      c.volunteerID.eq(userId)
    );
    ngosFromDb.forEach((ngo) =>
      setCurrentUserNgos((prev) => [...prev, ngo.ngoID])
    );

    console.log("Ngos of Current User");
    console.log(ngosFromDb);
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
        getNgosOfCurrentVolunteer,
        currentUserNgos,
        setCurrentUserNgos,
        setFilteredNgos,
        filteredNgos,
        followedNgos,
        unfollowedNgos,
        setFollowedNgos,
        setUnfollowedNgos,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
