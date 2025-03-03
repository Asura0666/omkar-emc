"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createRazorpayOrder, handlePlaceOrder } from "./OrderActions";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type CheckoutDetails = {
  name: string;
  address: string;
  phone: string;
};

export default function OrderConfirm() {
  const router = useRouter();
  const [details, setDetails] = useState<CheckoutDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedDetails = localStorage.getItem("checkoutDetails");
    if (storedDetails) {
      setDetails(JSON.parse(storedDetails));
    } else {
      router.push("/checkout/details");
    }
  }, [router]);

  // const handlePayment = async () => {
  //   if (!details) return;
  //   setLoading(true);

  //   // Step 1: Create Razorpay order (fetches cart total internally)
  //   const orderResponse = await createRazorpayOrder();
  //   if (!orderResponse?.orderId || !orderResponse?.amount) {
  //     alert("Failed to create payment order.");
  //     setLoading(false);
  //     return;
  //   }

  //   // Step 2: Open Razorpay checkout
  //   const options = {
  //     key: process.env.RAZORPAY_KEY_ID,
  //     amount: orderResponse.amount * 100, // Convert to paise
  //     currency: "INR",
  //     name: "E Mart",
  //     description: "Complete your purchase",
  //     order_id: orderResponse.orderId,
  //     handler: async function (response: any) {
  //       // Step 3: On success, place the order
  //       const orderResult = await handlePlaceOrder(
  //         details.name,
  //         details.address,
  //         details.phone
  //       );

  //       if (orderResult.success) {
  //         localStorage.removeItem("checkoutDetails");
  //         alert("Order placed successfully!");
  //         router.push("/order-confirmation");
  //       } else {
  //         alert(orderResult.error);
  //       }
  //     },
  //     prefill: {
  //       name: details.name,
  //       email: "customer@example.com", // Change dynamically
  //       contact: details.phone,
  //     },
  //     theme: {
  //       color: "#F37254",
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();

  //   setLoading(false);
  // };

  const handlePayment = async () => {
    if (!details) return;
    setLoading(true);
  
    // Step 1: Dynamically load Razorpay script
    const loadRazorpay = () =>
      new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(window.Razorpay);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(window.Razorpay);
        script.onerror = () => {
          alert("Failed to load Razorpay script");
          setLoading(false);
        };
        document.body.appendChild(script);
      });
  
    const Razorpay = await loadRazorpay();
    if (!Razorpay) return;
  
    // Step 2: Create Razorpay order (fetches cart total internally)
    const orderResponse = await createRazorpayOrder();
    if (!orderResponse?.orderId || !orderResponse?.amount) {
      alert("Failed to create payment order.");
      setLoading(false);
      return;
    }
  
    // Step 3: Open Razorpay checkout
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: orderResponse.amount * 100, // Convert to paise
      currency: "INR",
      name: "E Mart",
      description: "Complete your purchase",
      order_id: orderResponse.orderId,
      handler: async function (response: any) {
        // Step 4: On success, place the order
        const orderResult = await handlePlaceOrder(
          details.name,
          details.address,
          details.phone
        );
  
        if (orderResult.success) {
          localStorage.removeItem("checkoutDetails");
          alert("Order placed successfully!");
          router.push("/order-confirmation");
        } else {
          alert(orderResult.error);
        }
      },
      prefill: {
        name: details.name,
        email: "customer@example.com", // Change dynamically
        contact: details.phone,
      },
      theme: {
        color: "#F37254",
      },
    };
  
    //@ts-ignore
    const rzp = new Razorpay(options);
    rzp.open();
  
    setLoading(false);
  };  

  if (!details) return <p>Loading...</p>;

  return (
    <div className="mx-auto mt-10 max-w-md">
      <h1 className="mb-4 text-2xl font-bold">Confirm Your Order</h1>
      <p>
        <strong>Name:</strong> {details.name}
      </p>
      <p>
        <strong>Address:</strong> {details.address}
      </p>
      <p>
        <strong>Phone:</strong> {details.phone}
      </p>

      <button
        className="btn-primary btn mt-5 w-full"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing Payment..." : "Pay with Razorpay"}
      </button>
    </div>
  );
}
