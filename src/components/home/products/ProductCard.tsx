/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cart.slice";
import { CheckIcon, CrossIcon, EyeIcon, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type SingleProductProps = {
  singleProduct: {
    _id: string;
    name: string;
    photo: any;
    description: string;
    price: number;
    stock: number;
  };
};

const ProductCard = ({ singleProduct }: SingleProductProps) => {
  const dispatch = useAppDispatch();
  const { _id, description, name, photo, price, stock } = singleProduct || {};

  const handleAddToCart = () => {
    dispatch(addToCart({ _id, name, photo, price, stock, quantity: 1 }));
  };

  const carts = useAppSelector((state) => state.cart.carts);
  const lovedActive = carts.some((cartItem) => cartItem._id === _id)
    ? "text-green-700 fill-green-700  "
    : "";

  return (
    <div
      key={_id}
      className="relative overflow-hidden  rounded-lg shadow-lg transition-all duration-300  group"
    >
      <div className="relative aspect-[4/3] w-full  ">
        <Image
          src={photo}
          alt={name}
          width={500}
          height={500}
          className="object-cover w-full h-full  rounded-lg"
          loading="lazy"
        />
        <button
          onClick={handleAddToCart}
          className="absolute top-2 right-2 p-2 bg-white text-black  rounded-full transition-colors duration-300 z-10"
        >
          <Heart className={`${lovedActive}`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold  mb-2">{name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold ">${price.toFixed(2)}</p>
          {stock > 0 ? (
            <p className="text-sm text-green-600 flex items-center">
              <CheckIcon className="w-4 h-4 mr-1" /> In Stock
            </p>
          ) : (
            <p className="text-sm text-red-600 flex items-center">
              <CrossIcon className="w-4 h-4 mr-1" /> Out of Stock
            </p>
          )}
        </div>
      </div>
      <div className="absolute -bottom-1 left-0 right-0 bg-black bg-opacity-75 text-white p-4 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 h-[45%]">
        <p className="text-sm leading-relaxed line-clamp-3">{description}</p>
        <div className="flex items-center justify-end mt-2">
          <EyeIcon className="w-5 h-5 text-white" />
          <Link
            href={`/product/${_id}`}
            className="ml-1 text-sm cursor-pointer"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
