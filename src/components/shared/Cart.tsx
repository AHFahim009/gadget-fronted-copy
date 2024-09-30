import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  calculateMyCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  TShoppingCart,
} from "@/redux/slices/cart.slice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Cart = () => {
  const [onOpen, setOnOpen] = useState(false);
  const { carts, subtotal } = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.auth.user?.email);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleOpenCart = () => {
    setOnOpen(true);
  };
  const handleRemoveFromCart = (_id: string) => {
    dispatch(removeFromCart(_id));
  };

  const handleIncreaseQuantity = (_id: string) => {
    dispatch(increaseQuantity(_id));
  };
  const handleDecreaseQuantity = (_id: string) => {
    dispatch(decreaseQuantity(_id));
  };

  const handleCheckoutPage = () => {
    if (user) {
      setOnOpen(false);
      router.push("/checkout");
    } else {
      toast.warning("Login first");
    }
  };

  useEffect(() => {
    dispatch(calculateMyCart());
  }, [dispatch, carts]);

  return (
    <Sheet open={onOpen} onOpenChange={setOnOpen}>
      <SheetTrigger asChild>
        <Button
          onClick={handleOpenCart}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-6">
          {carts.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Your cart is empty
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {carts.map((cart: TShoppingCart) => {
                const { _id, name, photo, price, stock, quantity } = cart || {};
                return (
                  <li key={_id} className="flex py-6 items-center">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={photo}
                        alt={"no image"}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover "
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col ">
                      <div className=" flex flex-col gap-3">
                        <div className="flex justify-between text-base font-medium  items-center">
                          <h3>{name}</h3>
                          <p className="ml-4">${price.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2 min-w-[150px] ">
                            <Button
                              variant="outline"
                              size="icon"
                              disabled={quantity <= 1}
                              className="h-8 w-8"
                              onClick={() => handleDecreaseQuantity(_id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center justify-center border rounded-md w-12 h-8">
                              {quantity}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              disabled={quantity === stock}
                              onClick={() => handleIncreaseQuantity(_id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            onClick={() => handleRemoveFromCart(_id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <SheetFooter className="border-t border-gray-200">
          <div className="space-y-4 py-6 w-full">
            <div className="flex items-center justify-between text-base font-medium">
              <p>Subtotal</p>
              <p>{subtotal}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>
            {carts.length > 0 && (
              <div className="mt-6">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckoutPage}
                >
                  Checkout
                </Button>
              </div>
            )}
            <div className="text-center text-sm text-muted-foreground">
              <Link href={"/"}>
                <button
                  onClick={() => setOnOpen(false)}
                  type="button"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
