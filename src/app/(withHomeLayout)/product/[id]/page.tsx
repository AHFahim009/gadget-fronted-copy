"use client";

import { Button } from "@/components/ui/button";
import { useGetSingleProductsQuery } from "@/redux/api/endpoints/product.api";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cart.slice";
import { Badge, Heart, Share2, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const {
    data: singleProduct,
    isLoading,
    isError,
  } = useGetSingleProductsQuery({ productId: id as string });
  if (isError) {
    return <div>failed to load</div>;
  }
  if (isLoading) {
    return <div>loading</div>;
  }
  console.log(singleProduct?.data);

  const handleIncreaseQuantity = (quan: number) => {
    setQuantity((pre) => pre + quan);
  };
  const handleDecreaseQuantity = (quan: number) => {
    setQuantity((prev) => Math.max(1, prev - quan)); // Prevents quantity from going below 1
  };
  const { photo, name, stock, price, description, _id, category } =
    singleProduct?.data;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id,
        name,
        photo,
        price,
        quantity: quantity,
        stock,
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-8 px-">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-6xl w-full">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 p-6">
            <div className="relative aspect-[4/3]">
              <Image
                src={photo}
                alt={name}
                fill
                className="object-cover rounded-lg w-full h-full"
              />
              <Badge className="absolute top-4 left-4 bg-black/75 text-white">
                New Arrival
              </Badge>
            </div>
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
              <p className="text-sm text-gray-500 mb-4">Category: {category}</p>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  (121 reviews)
                </span>
              </div>
              <p className="text-gray-700 mb-6">{description}</p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-primary">
                  ₹{price.toLocaleString()}
                </span>
                <span
                  className={`text-sm ${
                    stock > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stock > 0 ? `In Stock (${stock} available)` : "Out of Stock"}
                </span>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDecreaseQuantity(1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="text-xl font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleIncreaseQuantity(1)}
                  disabled={quantity === stock}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button onClick={handleAddToCart} className="w-full" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <Heart className="mr-2 h-5 w-5" /> Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-5 w-5" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
