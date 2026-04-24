/* eslint-disable no-undef */
// Firebase Messaging Service Worker – handles background push notifications.
importScripts("https://www.gstatic.com/firebasejs/11.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC1eP3KZ8xWpGRVSkG4T7U3EUWv887uJe4",
  authDomain: "astro-app-6f4b6.firebaseapp.com",
  projectId: "astro-app-6f4b6",
  storageBucket: "astro-app-6f4b6.firebasestorage.app",
  messagingSenderId: "107502949558",
  appId: "1:107502949558:web:9ddc6fdab6d33a0a888217",
  measurementId: "G-NL7WQ0N73W",
});

const messaging = firebase.messaging();

// Optional: customise the background notification here
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background message received:", payload);

  const { title, body, icon } = payload.notification || {};

  self.registration.showNotification(title || "New Notification", {
    body: body || "",
    icon: icon || "/logo.png",
  });
});
