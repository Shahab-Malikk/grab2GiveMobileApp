import React, { createContext, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { DataStore } from "@aws-amplify/datastore";
import { Volunteer, Ngo, VolunteerNgo, ReservationRequest } from "../models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { downloadData, getUrl } from "aws-amplify/storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const UserDataContext = createContext();

export const useUserData = () => {
  return useContext(UserDataContext);
};

export const UserDataProvider = ({ children }) => {
  const [onBoardingFormData, setOnBoardingFormData] = useState({
    name: "Malik",
    profileImage: null,
    phone: "",
    city: "",
    profession: "Software Engineer",
    availiablityPrefrences: [],
  });
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);
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
  const [isFirstLaunched, setIsFirstLaunched] = useState(null);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [noOfCompletedDeliveries, setNoOfCompletedDeliveries] = useState(0);
  const [noOfUpcomingDeliveries, setNoOfUpcomingDeliveries] = useState(0);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const ngosArr = [];

  const checkIfUserIsLoggedIn = async () => {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log("User is logged in", username, userId, signInDetails);
      setIsLoggedIn(true);
      getUserData().then(() => {
        setIsLoading(false);
      });
    } catch (e) {
      setIsLoggedIn(false);
      setIsLoading(false);
      console.log(e);
    }
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
    if (userData.name !== null) {
      setIsOnboardingCompleted(true);
    } else {
      setIsOnboardingCompleted(false);
    }
    if (userData.image) {
      const image = await getUrl({
        key: userData.image,
      });

      const updatedUserData = {
        ...userData,
        profileImage: image.url,
      };

      setUserImage(image.url.toString());
    }

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
      const foodId = food.id;
      const ngo = await reservationRequest[i].ngo;
      const hotel = await reservationRequest[i].hotel;
      const status = await reservationRequest[i].status;
      const hotelName = hotel.name;
      const ngoName = ngo.name;
      const date = reservationRequest[i].updatedAt;
      const foodName = food.name;
      const pickupObj = {
        foodId,
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
    let volunteerId = userId;
    for (let i = 0; i < connectedNgos.length; i++) {
      const request = await DataStore.query(ReservationRequest, (c) =>
        c.and((c) => [c.ngoId.eq(connectedNgos[i]), c.volunteerID.eq(userId)])
      );

      if (request.status !== "Delivered") {
        console.log("This is request");
        console.log(request);
        reservationRequest = [...reservationRequest, ...request];
      }
    }
    reservationRequest.forEach((item) => {
      if (item.status === "Delivered") {
        setNoOfCompletedDeliveries((prev) => prev + 1);
      }
      if (item.status === "VOLUNTEERED") {
        setNoOfUpcomingDeliveries((prev) => prev + 1);
      }
    });
    // console.log("Reservation Requests :");
    // console.log(reservationRequest);
    let foodList = [];
    for (let i = 0; i < reservationRequest.length; i++) {
      const reservationRequestId = reservationRequest[i].id;
      const food = await reservationRequest[i].food;
      const foodId = food.id;
      const ngo = await reservationRequest[i].ngo;
      const hotel = await reservationRequest[i].hotel;
      const status = await reservationRequest[i].status;
      const hotelName = hotel.name;
      const ngoName = ngo.name;
      const date = reservationRequest[i].updatedAt;
      const foodName = food.name;

      const pickupObj = {
        foodId,
        reservationRequestId,
        hotelName,
        ngoName,
        date,
        foodName,
        status,
        volunteerId,
      };
      console.log(pickupObj);
      if (reservationRequest[i].status !== "Delivered") {
        foodList.push(pickupObj);
      }
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

  const checkIfFirstLaunched = async () => {
    try {
      console.log("Checking First Launched");
      AsyncStorage.getItem("isFirstLaunched").then((value) => {
        console.log("Checking if first launched", value);
        if (value === null) {
          AsyncStorage.setItem("isFirstLaunched", "true");
          setIsFirstLaunched(true);
        }
        if (value === "true") {
          setIsFirstLaunched(false);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const checkOnboardingStatus = async () => {
    try {
      AsyncStorage.getItem("isOnboardingCompleted").then((value) => {
        if (value === null) {
          setIsOnboardingCompleted(false);
        }
        if (value === "true") {
          setIsOnboardingCompleted(true);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getNotifications = async (userData) => {
    let notificationsFromDb = [];
    userData.notifications.values.then((data) => {
      console.log("Notifications");
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === "unread") {
          setIsNewNotification(true);
        }
      }
      setNotifications(data);
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
        setUpComingDeliveries,
        getUpComingDeliveries,
        getAllData,
        ngosArr,
        currentUserData,
        setCurrentUserData,
        checkIfUserIsLoggedIn,
        isLoggedIn,
        setIsLoggedIn,
        isFirstLaunched,
        setIsFirstLaunched,
        checkIfFirstLaunched,
        checkOnboardingStatus,
        isOnboardingCompleted,
        setIsOnboardingCompleted,
        isLoading,
        setIsLoading,
        setNoOfCompletedDeliveries,
        noOfCompletedDeliveries,
        noOfUpcomingDeliveries,
        setNoOfUpcomingDeliveries,
        userImage,
        setUserImage,
        getNotifications,
        isNewNotification,
        setIsNewNotification,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
