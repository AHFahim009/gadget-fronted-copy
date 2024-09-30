// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Image as ImageIcon } from "lucide-react";

// interface ImagePreviewProps {
//   src: string;
//   alt: string;
//   isHovering: boolean;
//   setIsHovering: any;
// }

// export default function ImagePreview({
//   src,
//   alt,
//   setIsHovering,
// }: ImagePreviewProps) {
//   return (
//     <div
//       className="absolute left-1/2 top-1/2 ml-2 transform -translate-y-1/2 z-50 "
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       <div className="bg-red-900 rounded-lg shadow-lg p-2 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100 w-28 h-28">
//         <Image
//           src={src}
//           alt={alt}
//           width={300}
//           height={300}
//           className="rounded-md object-cover"
//         />
//       </div>
//     </div>
//   );
// }
