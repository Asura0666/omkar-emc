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
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const validateInputs = () => {
    let valid = true;
    let newErrors = { name: "", address: "", phone: "" };

    if (!details.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (!/^[A-Za-z\s]{3,50}$/.test(details.name)) {
      newErrors.name = "Enter a valid name (only letters, min 3 chars)";
      valid = false;
    }

    if (!details.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    } else if (details.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters long";
      valid = false;
    }

    if (!details.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(details.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  //@ts-ignore
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (!validateInputs()) return;

    localStorage.setItem("checkoutDetails", JSON.stringify(details));
    router.push("/checkout/confirm");
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
        className="input input-bordered w-full mb-1"
      />
      {errors.name && <p className="text-red-500 text-sm mb-3">{errors.name}</p>}

      <input
        type="text"
        name="address"
        placeholder="Shipping Address"
        value={details.address}
        onChange={handleChange}
        className="input input-bordered w-full mb-1"
      />
      {errors.address && <p className="text-red-500 text-sm mb-3">{errors.address}</p>}

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={details.phone}
        onChange={handleChange}
        className="input input-bordered w-full mb-1"
      />
      {errors.phone && <p className="text-red-500 text-sm mb-3">{errors.phone}</p>}

      <button className="btn-primary btn w-full" onClick={handleConfirm}>
        Confirm & Proceed
      </button>
    </div>
  );
}