"use server";

import { clearCart, getCart } from "@/lib/db/cart";
import { placeOrder } from "@/lib/db/order";

export async function createRazorpayOrder() {
  try {
    // Fetch cart total
    const cart = await getCart();
    const amount = cart?.subtotal || 0;

    if (amount <= 0) {
      throw new Error("Invalid cart total");
    }

    // Create Razorpay order
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from("rzp_test_MwqWb1sGlFcoYl:SJiAIzXeGWq47yByhSmdex9f").toString("base64")}`,
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to paise
        currency: "INR",
        payment_capture: 1,
      }),
    });

    const data = await res.json();
    return { orderId: data.id, amount };
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return null;
  }
}

export async function handlePlaceOrder(name: string, address: string, phone: string) {
  try {
    const cart = await getCart();
    if (!cart?.items?.length) {
      return { success: false, error: "Cart is empty" };
    }

    await placeOrder(name, address, phone);
    await clearCart();
    return { success: true };
  } catch (error) {
    console.error("Error placing order:", error);
    return { success: false, error: "Something went wrong. Try again." };
  }
}
