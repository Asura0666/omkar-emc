"use client";

import { useRouter } from "next/navigation";

export default function CheckoutButton({ hasItems }: { hasItems: boolean }) {
  const router = useRouter();

  const handleCheckout = () => {
    if (!hasItems) {
      alert("Your cart is empty!");
      return;
    }
    router.push("/checkout/details"); // Redirect to checkout page
  };

  return (
    <button
      className="btn-primary btn sm:w-[200px]"
      onClick={handleCheckout}
      disabled={!hasItems}
    >
      Checkout
    </button>
  );
}
