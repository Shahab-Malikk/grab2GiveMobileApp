import React, { createContext, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { Volunteer, Ngo, VolunteerNgo, ReservationRequest } from "../models";

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
  const [foodListReservedByNgos, setFoodListReservedByNgos] = useState([]);
  const [isgettingReservations, setIsGettingReservations] = useState(false);
  const [upComingDeliveries, setUpComingDeliveries] = useState([]);
  const [currentUserData, setCurrentUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const ngosArr = [];

  const checkIfUserIsLoggedIn = async () => {
    const user = await getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
    }
    console.log(user);
  };

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
    setCurrentUserData(userData);
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
    ngosFromDb.forEach((ngo) => {
      setCurrentUserNgos((prev) => [...prev, ngo.ngoID]);
      ngosArr.push(ngo.ngoID);
    });

    console.log("Ngos of Current User");
    console.log(ngosFromDb);
  };

  const getFoodListReservedByNgos = async (ngosArray) => {
    console.log("Getting Food List Reserved By");

    const connectedNgos = ngosArray;
    console.log(connectedNgos.length);
    let reservationRequest = [];
    for (let i = 0; i < connectedNgos.length; i++) {
      const request = await DataStore.query(ReservationRequest, (c) =>
        c.and((c) => [c.ngoId.eq(connectedNgos[i]), c.status.eq("Accepted")])
      );
      reservationRequest = [...reservationRequest, ...request];
    }
    // console.log("Reservation Requests :");
    // console.log(reservationRequest);
    let foodList = [];
    for (let i = 0; i < reservationRequest.length; i++) {
      const reservationRequestId = reservationRequest[i].id;
      const food = await reservationRequest[i].food;
      const ngo = await reservationRequest[i].ngo;
      const hotel = await reservationRequest[i].hotel;
      const status = await reservationRequest[i].status;
      const hotelName = hotel.name;
      const ngoName = ngo.name;
      const date = reservationRequest[i].updatedAt;
      const foodName = food.name;
      const pickupObj = {
        reservationRequestId,
        hotelName,
        ngoName,
        date,
        foodName,
        status,
      };
      console.log(pickupObj);
      foodList.push(pickupObj);
    }
    const uniqueList = new Set(foodList);

    setFoodListReservedByNgos([...uniqueList]);
    console.log("Food List Reserved By Ngos");
  };

  const getUpComingDeliveries = async (ngosArray) => {
    console.log("Getting Upcoming Deliveries");
    setIsGettingReservations(true);

    const connectedNgos = ngosArray;

    let reservationRequest = [];
    for (let i = 0; i < connectedNgos.length; i++) {
      const request = await DataStore.query(ReservationRequest, (c) =>
        c.and((c) => [c.ngoId.eq(connectedNgos[i]), c.volunteerID.eq(userId)])
      );
      reservationRequest = [...reservationRequest, ...request];
    }
    // console.log("Reservation Requests :");
    // console.log(reservationRequest);
    let foodList = [];
    for (let i = 0; i < reservationRequest.length; i++) {
      const reservationRequestId = reservationRequest[i].id;
      const food = await reservationRequest[i].food;
      const ngo = await reservationRequest[i].ngo;
      const hotel = await reservationRequest[i].hotel;
      const status = await reservationRequest[i].status;
      const hotelName = hotel.name;
      const ngoName = ngo.name;
      const date = reservationRequest[i].updatedAt;
      const foodName = food.name;
      const pickupObj = {
        reservationRequestId,
        hotelName,
        ngoName,
        date,
        foodName,
        status,
      };
      console.log(pickupObj);
      foodList.push(pickupObj);
    }
    const uniqueList = new Set(foodList);

    setUpComingDeliveries([...uniqueList]);
  };

  const getAllData = async () => {
    const promise1 = getUserData();
    const promise2 = getNgosFromDb();
    const promise3 = getNgosOfCurrentVolunteer();
    const promise4 = getFoodListReservedByNgos();
    const promise5 = getUpComingDeliveries();

    Promise.all([promise1, promise2, promise3, promise4, promise5]).then(() => {
      console.log("All Data Fetched");
    });
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
        getFoodListReservedByNgos,
        foodListReservedByNgos,
        isgettingReservations,
        setFoodListReservedByNgos,
        upComingDeliveries,
        getUpComingDeliveries,
        getAllData,
        ngosArr,
        currentUserData,
        setCurrentUserData,
        checkIfUserIsLoggedIn,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
