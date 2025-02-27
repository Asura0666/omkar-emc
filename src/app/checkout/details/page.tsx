"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutDetails() {
  const router = useRouter();
  const [details, setDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (!details.name || !details.address || !details.phone) {
      alert("Please fill in all fields.");
      return;
    }
    
    localStorage.setItem("checkoutDetails", JSON.stringify(details)); // Store details locally
    router.push("/checkout/confirm"); // Redirect to order confirmation page
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Enter Shipping Details</h1>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={details.name}
        onChange={handleChange}
        className="input input-bordered w-full mb-3"
      />
      <input
        type="text"
        name="address"
        placeholder="Shipping Address"
        value={details.address}
        onChange={handleChange}
        className="input input-bordered w-full mb-3"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={details.phone}
        onChange={handleChange}
        className="input input-bordered w-full mb-3"
      />
      <button className="btn-primary btn w-full" onClick={handleConfirm}>
        Confirm & Proceed
      </button>
    </div>
  );
}
