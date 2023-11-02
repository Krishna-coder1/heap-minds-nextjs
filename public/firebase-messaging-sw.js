// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyD5IeLUTo-5houz30TdZRibIhdO3GPux-Y",
  authDomain: "heap-minds.firebaseapp.com",
  projectId: "heap-minds",
  storageBucket: "heap-minds.appspot.com",
  messagingSenderId: "1054464910219",
  appId: "1:1054464910219:web:cf2876b8ad282e6873458e",
  measurementId: "G-7NGENXBL09",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("BG_MSSG", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // You can customize notification options here
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
  self.clients.openWindow("/");
});

// Handle notification click event (open URL)
self.addEventListener("notificationclick", (event) => {
  console.log(event);
  const clickedNotification = event.notification;
  const urlToOpen = "/"; // Default URL or URL from notification data
  event.notification.close();
  // Open the URL in the same tab or a new tab
  self.clients.openWindow(urlToOpen);
});
