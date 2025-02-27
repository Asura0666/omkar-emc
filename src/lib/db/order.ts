"use server";

import { prisma } from "@/lib/db/prisma";
import { getCart, clearCart } from "@/lib/db/cart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function placeOrder(name: string, address: string, phone: string) {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty. Cannot place an order.");
  }

  // Create an order
  const order = await prisma.order.create({
    data: {
      userId: session ? session.user.id : null, // Nullable for guest checkout
      name,
      address,
      phone,
      total: cart.subtotal,
      status: "pending",
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price, // Store price snapshot
        })),
      },
    },
    include: { items: true },
  });

  // Clear the cart after order is placed
  await clearCart();

  return order;
}

export async function getUserOrders() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.id) {
    throw new Error("User not authenticated");
  }

  return await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: true, // Fetch product details
        },
      },
    },
  });
}
