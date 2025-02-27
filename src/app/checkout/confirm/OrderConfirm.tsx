"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { handlePlaceOrder } from "./OrderActions";

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

  const handleOrder = async () => {
    if (!details) return;
    setLoading(true);

    const response = await handlePlaceOrder(
      details.name,
      details.address,
      details.phone
    );

    if (response.success) {
      localStorage.removeItem("checkoutDetails");
      alert("Order placed successfully!");
      router.push("/order-confirmation");
    } else {
      alert(response.error);
    }

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
        onClick={handleOrder}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
