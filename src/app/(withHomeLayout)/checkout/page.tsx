"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserIcon, HomeIcon, GlobeIcon, ShoppingCartIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/api/endpoints/order.api.";
import handleResponse from "@/helpers/handleResponse";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/slices/cart.slice";

type TShoppingInfo = {
  name: string;
  address: string;
  country: string;
};

const Page = () => {
  const dispatch = useAppDispatch();
  const { total, subtotal, tax, shippingCharge } =
    useAppSelector((state) => state?.cart) || {};
  const cart = useAppSelector((state) => state?.cart);
  const userId = useAppSelector((state) => state.auth.user?._id);
  const [shoppingInfo, setShoppingInfo] = useState<TShoppingInfo>({
    name: "",
    address: "",
    country: "",
  });
  const router = useRouter();
  const [createOrder] = useCreateOrderMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createOrder({
        ...cart,
        shoppingInfo: shoppingInfo,
        userId: userId!,
      });

      const result = handleResponse(res);

      if (result?.data) {
        router.push("/myOrders");
        dispatch(clearCart());
        toast.message(result.message);
      }
    } catch (error) {
      console.log("chekcout", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShoppingInfo({ ...shoppingInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className=" flex  justify-center p-12">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Checkout
          </CardTitle>
          <CardDescription className="text-center">
            Complete your purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={shoppingInfo.name}
                    onChange={handleChange}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <HomeIcon className="w-4 h-4" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="123 Main St, City, State, ZIP"
                    value={shoppingInfo.address}
                    onChange={handleChange}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="country"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <GlobeIcon className="w-4 h-4" />
                    Country
                  </Label>
                  <Select
                    name="country"
                    onValueChange={(value) =>
                      setShoppingInfo({ ...shoppingInfo, country: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </div>
            <div className="flex-1  p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShoppingCartIcon className="w-5 h-5" />
                Order Summary
              </h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal} </span>
                </p>
                <p className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingCharge} </span>
                </p>
                <p className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax} </span>
                </p>
                <div className="border-t pt-2 mt-2">
                  <p className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full mt-6" onClick={handleSubmit}>
            Complete Purchase
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
