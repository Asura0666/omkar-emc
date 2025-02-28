import { getCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import CheckoutButton from "./CheckoutButton";

export const metadata = {
  title: "Your Cart - E mart",
};

export default async function CartPage() {
  const cart = await getCart();
  //@ts-ignore
  const hasItems = cart?.items?.length > 0;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          cartItem={cartItem}
          key={cartItem.id}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!hasItems && <p>Your cart is empty.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <CheckoutButton hasItems={hasItems} /> {/* Use the client component */}
      </div>
    </div>
  );
}
