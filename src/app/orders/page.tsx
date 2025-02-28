// import { getUserOrders } from "@/lib/db/order";
// import OrderItemSlider from "./OrderItemSlider";

// export const metadata = {
//   title: "Your Orders - E mart",
// };

// export default async function OrdersPage() {
//   const orders = await getUserOrders();

//   return (
//     <div className="mx-auto max-w-4xl p-6">
//       <h1 className="mb-6 text-3xl font-bold">Your Orders</h1>
//       {orders.length === 0 ? (
//         <p>You have not placed any orders yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div key={order.id} className="rounded-lg border p-4 shadow">
//               <p className="text-lg font-semibold">
//                 Order ID: <span className="text-gray-600">{order.id}</span>
//               </p>
//               <p className="text-sm text-gray-500">
//                 Placed on: {new Date(order.createdAt).toLocaleDateString()}
//               </p>
//               <p className="mt-2 font-bold">
//                 Status:{" "}
//                 <span
//                   className={`rounded px-2 py-1 ${
//                     order.status === "pending"
//                       ? "bg-yellow-500 text-white"
//                       : order.status === "shipped"
//                       ? "bg-blue-500 text-white"
//                       : order.status === "delivered"
//                       ? "bg-green-500 text-white"
//                       : "bg-red-500 text-white"
//                   }`}
//                 >
//                   {order.status}
//                 </span>
//               </p>

//               <div className="mt-4 space-y-2">
//                 {order.items.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center justify-between"
//                   >
//                     <p className="text-gray-700">
//                       {item.product.name} (x{item.quantity})
//                     </p>
//                     {/* Image slider component */}
//                     <OrderItemSlider
//                       images={order.items.map((i) => i.product.imageUrl)}
//                     />
//                   </div>
//                 ))}
//               </div>

//               <p className="mt-4 text-lg font-bold">Total: ${order.total}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { getUserOrders } from "@/lib/db/order";
import OrderItemDisplay from "./OrderItemSlider";

export const metadata = {
  title: "Your Orders - E mart",
};

export default async function OrdersPage() {
  const orders = await getUserOrders();

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Your Orders</h1>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">
                    Order ID: <span className="text-gray-600">{order.id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-2 font-bold">
                    Status:{" "}
                    <span
                      className={`rounded px-2 py-1 ${
                        order.status === "pending"
                          ? "bg-yellow-500 text-white"
                          : order.status === "shipped"
                          ? "bg-blue-500 text-white"
                          : order.status === "delivered"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
                {/* Order Items */}
                <div className="mt-4">
                  <OrderItemDisplay
                    items={order.items.map((item) => ({
                      name: item.product.name,
                      imageUrl: item.product.imageUrl,
                    }))}
                  />
                </div>
              </div>

              <p className="mt-4 text-lg font-bold">Total: ${order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
