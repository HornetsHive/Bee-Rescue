//responsible for phing notifications to users
import * as Notifications from "expo-notifications";
import {
  getExpoPushTokenAsync,
  scheduleNotificationAsync,
} from "expo-notifications";

const registerForPushNotifications = async () => {
  try {
    const permission = await Notifications.getPermissionsAsync();
    if (!permission.granted) return;
    const token = await getExpoPushTokenAsync();
    return token;
  } catch (error) {
    console.log("Error getting a token", error);
  }
};

const createSender = async () => {
  // Get Token
  const token = await registerForPushNotifications();

  // function for sending push notifications
  const sendPushNotification = async (message) => {
    scheduleNotificationAsync({
      content: {
        title: "Notification test from Bee Rescue",
        body: "New report!",
      },
      trigger: {
        seconds: 10,
      },
    });
  };

  return sendPushNotification;
};

export default createSender;
