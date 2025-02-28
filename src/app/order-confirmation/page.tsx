export const metadata = {
  title: "Order Confirmation - E mart",
};

export default function OrderConfirmationPage() {
  return (
    <div className="mx-auto mt-10 max-w-md text-center">
      <h1 className="mb-4 text-2xl font-bold">Thank You for Your Order!</h1>
      <p>Your order has been placed successfully.</p>
      <p>You will receive a confirmation email shortly.</p>

      <a href="/" className="btn-primary btn mt-5">
        Return to Home
      </a>
    </div>
  );
}
