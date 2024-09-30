import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export type TShoppingCart = {
    _id: string;
    name: string;
    price: number;
    stock: number;
    photo: string;
    quantity: number;
};

export type TShoppingInfo = {
    name: string;
    address: string;
    country: string;
};

export type TCart = {
    carts: TShoppingCart[];
    total: number;
    userId: string;
    shoppingInfo: TShoppingInfo;
    tax: number;
    shippingCharge: number;
    subtotal: number;
};

const initialState: TCart = {
    carts: [],
    total: 0,
    userId: "",
    shoppingInfo: {
        address: "",
        country: "",
        name: "",
    },
    tax: 0,
    shippingCharge: 0,
    subtotal: 0,
};

const TAX_PERCENTAGE = 0.1; // Example: 10% tax
const SHIPPING_CHARGE = 50; // Example: static shipping charge

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<TShoppingCart>) => {
            const existingProduct = state.carts.find(
                (cartItem) => cartItem._id === action.payload._id
            );

            if (existingProduct) {
                toast.warning("Item already exists in the cart");
                return;
            }

            state.carts.push({ ...action.payload });
            toast.success("Item added to cart successfully!");
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const productIndex = state.carts.findIndex(
                (cartItem) => cartItem._id === action.payload
            );

            if (productIndex === -1) {
                toast.error("Item not found in the cart");
                return;
            }

            state.carts.splice(productIndex, 1);
            toast.success("Item removed from cart successfully");
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const product = state.carts.find(
                (cartItem) => cartItem._id === action.payload
            );

            if (product && product.quantity < product.stock) {
                product.quantity += 1;
            } else {
                toast.error("Cannot increase quantity beyond available stock");
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const product = state.carts.find(
                (cartItem) => cartItem._id === action.payload
            );

            if (product && product.quantity > 1) {
                product.quantity -= 1;
            } else {
                toast.error("Minimum quantity reached");
            }
        },
        calculateMyCart: (state) => {
            // Step 1: Calculate Subtotal
            state.subtotal = state.carts.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            // Step 2: Calculate Tax
            state.tax = state.subtotal * TAX_PERCENTAGE;

            // Step 3: Calculate Shipping Charge
            // Here, we use a static value, but you can apply conditional logic if needed
            state.shippingCharge = SHIPPING_CHARGE;

            // Step 4: Calculate Total
            state.total = state.subtotal + state.tax + state.shippingCharge;
        },
        addShoppingInfo: (state, action: PayloadAction<TShoppingInfo>) => {
            state.shoppingInfo = action.payload;
        },
        clearCart: (state) => {
            state.carts = [];  // Clear all items in the cart
            state.total = 0;   // Reset total
            state.subtotal = 0;  // Reset subtotal
            state.tax = 0;     // Reset tax
            state.shippingCharge = 0;  // Reset shipping charge

        }

    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateMyCart,
    clearCart
} = cartSlice.actions;

export default cartSlice;
