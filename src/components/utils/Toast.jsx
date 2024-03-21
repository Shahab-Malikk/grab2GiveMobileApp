import Toast from "react-native-root-toast";

const showToast = (message, backgroundColor) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: backgroundColor,
  });
};

export default showToast;
