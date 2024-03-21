import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { VolunteerNgo } from "../../models";
import { useUserData } from "../../context/userDataContext";
import showToast from "../utils/Toast";

const NgoCard = (props) => {
  const [isNgoFollowed, setIsNgoFollowed] = useState(false);
  const {
    userId,
    setCurrentUserNgos,
    currentUserNgos,
    getNgosOfCurrentVolunteer,
    setFollowedNgos,
    setUnfollowedNgos,
    ngos,
    ngosArr,
    getFoodListReservedByNgos,
  } = useUserData();
  const { name, city, id } = props.ngo;
  const followNgo = async () => {
    try {
      const ngo = {
        ngoID: id,
        volunteerID: userId,
      };

      await DataStore.save(new VolunteerNgo(ngo));
      setIsNgoFollowed(true);
      setCurrentUserNgos([...currentUserNgos, id]);
      await getNgosOfCurrentVolunteer();
      setFollowedNgos(ngos.filter((item) => currentUserNgos.includes(item.id)));
      setUnfollowedNgos(
        ngos.filter((item) => !currentUserNgos.includes(item.id))
      );
      await getFoodListReservedByNgos(ngosArr);
      showToast("Ngo Followed Successfully", "green");
    } catch (e) {
      console.log(e);
      showToast("Something went wrong", "red");
    }
  };

  const checkifNgoFollowed = async () => {
    const ngo = await DataStore.query(VolunteerNgo, (c) =>
      c.and((c) => [c.ngoID.eq(id), c.volunteerID.eq(userId)])
    );

    if (ngo.length > 0) {
      setIsNgoFollowed(true);
    }
  };
  const unfollowNgo = async () => {
    try {
      await DataStore.delete(VolunteerNgo, (c) =>
        c.and((c) => [c.ngoID.eq(id), c.volunteerID.eq(userId)])
      );
      setIsNgoFollowed(false);
      setCurrentUserNgos(currentUserNgos.filter((item) => item !== id));
      await getNgosOfCurrentVolunteer();
      setFollowedNgos(ngos.filter((item) => currentUserNgos.includes(item.id)));
      setUnfollowedNgos(
        ngos.filter((item) => !currentUserNgos.includes(item.id))
      );
      await getFoodListReservedByNgos(ngosArr);
      showToast("Ngo Unfollowed Successfully", "green");
    } catch (e) {
      console.log(e);
      showToast("Something went wrong", "red");
    }
  };

  useEffect(() => {
    checkifNgoFollowed();
  }, []);

  return (
    <View className="flex flex-col items-center bg-white shadow-md border-2 border-gray-300 py-4 px-3 rounded-md mb-4">
      <Image
        source={require("../../../assets/eidhi.png")}
        className="w-24 h-24 rounded-full"
      />
      <View className="flex-1 flex-col">
        <Text className="text-center mt-2">{name}</Text>
        <Text className="text-center mt-2">{city}</Text>
      </View>
      {!isNgoFollowed ? (
        <Pressable
          onPress={followNgo}
          className="flex-1 py-2 bg-black w-[100%] border-2 border-transparent rounded-md mt-4"
        >
          <Text className="text-white text-center ">Follow</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={unfollowNgo}
          className="flex-1 py-2 bg-transparent border-2 border-black w-[100%] rounded-md mt-4"
        >
          <Text className="text-black text-center ">Unfollow</Text>
        </Pressable>
      )}
    </View>
  );
};

export default NgoCard;
