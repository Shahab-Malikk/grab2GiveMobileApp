import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { fToNow } from "../utils/formatTime";

const NotificationCard = (props) => {
  const { content, createdAt, status } = props.data;

  const [isAcknowleged, setIsAcknowleged] = useState(status === "acknowledged");
  return (
    <Pressable
      className={`p-4 border-2 border-base300 rounded-lg ${
        isAcknowleged ? "bg-base100" : "bg-white"
      }`}
      onPress={() => setIsAcknowleged(true)}
    >
      <Text className="text-sm text-base500 mt-2">{content}</Text>
      {/* Right Aligned Time */}
      <Text className="text-xs text-base500 mt-2 text-right">
        {fToNow(createdAt)}
      </Text>
    </Pressable>
  );
};

export default NotificationCard;
