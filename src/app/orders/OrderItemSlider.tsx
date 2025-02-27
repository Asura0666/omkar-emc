// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface OrderItemSliderProps {
//   images: string[];
// }

// export default function OrderItemSlider({ images }: OrderItemSliderProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   if (images.length === 0) return null;

//   return (
//     <div className="relative h-40 w-40 overflow-hidden rounded-lg border">
//       {images.length > 1 && (
//         <>
//           <button
//             className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-1 shadow-md"
//             onClick={() =>
//               setCurrentIndex((prev) =>
//                 prev > 0 ? prev - 1 : images.length - 1
//               )
//             }
//           >
//             <ChevronLeft size={16} />
//           </button>

//           <button
//             className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-1 shadow-md"
//             onClick={() =>
//               setCurrentIndex((prev) =>
//                 prev < images.length - 1 ? prev + 1 : 0
//               )
//             }
//           >
//             <ChevronRight size={16} />
//           </button>
//         </>
//       )}

//       <Image
//         src={images[currentIndex]}
//         alt="Order item"
//         width={150}
//         height={150}
//         className="h-full w-full object-cover"
//       />
//     </div>
//   );
// }

"use client";

import Image from "next/image";

interface OrderItemDisplayProps {
  items: {
    name: string;
    imageUrl: string;
  }[];
}

export default function OrderItemDisplay({ items }: OrderItemDisplayProps) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-lg border p-2"
        >
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={60}
            height={60}
            className="h-16 w-16 rounded-md object-cover"
          />
          <p className="text-lg font-medium">{item.name}</p>
        </div>
      ))}
    </div>
  );
}
