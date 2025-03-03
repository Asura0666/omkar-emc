"use client"; // Required for Next.js 13 App Router

interface RazorpayButtonProps {
  amount: number; // Expect amount as a prop
}

export default function RazorpayButton({ amount }: RazorpayButtonProps) {
  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      alert("Invalid amount. Please enter a valid value.");
      return;
    }

    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const { success, order } = await res.json();
    if (!success) {
      alert("Error creating payment order");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Electronic Mart",
      description: "UPI Payment",
      order_id: order.id,
      handler: function (response: any) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      <h2>Pay via UPI</h2>
      <p>Amount: ₹{amount}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
