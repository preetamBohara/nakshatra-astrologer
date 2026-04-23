"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { FIREBASE_FCM_TOKEN } from "@/constants/others";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { onMessageListener, requestForToken } from "@/utils/firebase";


export default function ReduxProvider({ children }) {

  useEffect(() => {
    const fetchFirebaseToken = async () => {
      try {
        const fcmToken = await requestForToken();
        if (fcmToken) {
          console.log("FCM Token:", fcmToken);
          sessionStorage.setItem(FIREBASE_FCM_TOKEN, fcmToken);
        }
      } catch (error) {
        console.error("Failed to fetch FCM token:", error);
      }
    };

    fetchFirebaseToken();

    // Listen for foreground push notifications
    const listenForMessages = () => {
      onMessageListener()
        .then((payload) => {
          const { title, body } = payload.notification || {};
          if (title || body) {
            toast(`${title || ""} ${body ? `- ${body}` : ""}`.trim());
          }
          
          listenForMessages();
        })
        .catch((err) => console.error("onMessageListener error:", err));
    };

    listenForMessages();
  }, []);



  return <Provider store={store}>{children}</Provider>;
}
