"use client";
import useFcmToken from "@/hooks/useFcmToken";
import firebaseApp from "@/utils/firebase";
import axios from "axios";
import { onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";
import { useEffect } from "react";

const baseUrl =
  "https://815a-2405-201-c003-a0e9-d57e-7a1a-c6be-61f1.ngrok-free.app";

function Home() {
  function loadScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => resolve(false);
    });
  }
  // const __DEV__ = dynamic(() => document.domain === "localhost", {
  //   ssr: false,
  // });

  async function displayRazorPay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Payment page not loaded, please refresh");
      return;
    }
    const { data } = await axios.get(
      `${baseUrl}/api/handleSubscription/mbbsMembership/${fcmToken}`,
      { headers: { "ngrok-skip-browser-warning": 1334 } }
    );

    const options = {
      key: "rzp_test_c0ALHfuoiS0luD", // Enter the Key ID generated from the Dashboard
      amount: 299999, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Careers Companion",
      description: "Payment for MBBS",
      handler: function (response: any) {
        let redirect_url;
        if (
          typeof response.razorpay_payment_id == "undefined" ||
          response.razorpay_payment_id < 1
        ) {
          alert("No payment");
          redirect_url = "/";
        } else {
          console.log("PAYMENT_RESPONSE", response);

          console.log(response.razorpay_payment_id);
        }
      },
      order_id: data.id,
      prefill: {
        name: "Krishna",
        email: "teja.krishna.akp@gmail.com",
        contact: "7396730681",
      },

      reminder_enable: true,
      notes: {
        note_key_1: "my_id",
        note_key_2: data.membership,
      },
      // notes: {
      //   address: "Razorpay Corporate Office",
      // },
      // theme: {
      //   color: "#3399cc",
      // },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // Use the token as needed

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);

        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);
  console.log("EWQFAGREG__EWRTG", fcmToken);
  async function sendToken(token: string) {
    const result = await axios.post(`${baseUrl}/api/notification/subscribe`, {
      fcmToken,
    });
    alert("TOKEN_SENT");
  }
  useEffect(() => {
    if (fcmToken) {
      sendToken(fcmToken);
    }
  }, [fcmToken]);

  return (
    <div>
      <br />
      <br />
      <br />

      <button
        onClick={() => {
          displayRazorPay();
        }}
      >
        Pay now
      </button>
      <button
        onClick={async () => {
          try {
            const notification = new Notification("Heap Minds", {
              body: "TESTING",
            });
            notification.addEventListener("show", (err) => {
              console.log(err);
            });
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Send notif
      </button>
    </div>
  );
}

export default Home;
