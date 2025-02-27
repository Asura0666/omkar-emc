"use server";

import { clearCart } from "@/lib/db/cart";
import { placeOrder } from "@/lib/db/order";

export async function handlePlaceOrder(name: string, address: string, phone: string) {
  try {
    await placeOrder(name, address, phone);
    await clearCart();
    return { success: true };
  } catch (error) {
    console.error("Error placing order:", error);
    return { success: false, error: "Something went wrong. Try again." };
  }
}
