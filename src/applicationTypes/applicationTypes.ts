
export type TProduct = {
    name: string
    category: string;
    description: string;
    price: number;
    stock: number;
    photo?: string
}

export const productKeys = {
    NAME: "name",
    CATEGORY: "category",
    DESCRIPTION: "description",
    PRICE: "price",
    STOCK: "stock",
    PHOTO: "photo"
} as const;




export type TProductRes = {
    _id: string;
    name: string
    category: string;
    description: string;
    price: number;
    stock: number;
    photo: string;
    createdAt: string;
    updateAt: string
}



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

export type TOrder = {
    carts: TShoppingCart[];
    total: number;
    userId: string;
    shoppingInfo: TShoppingInfo;
    tax: number;
    shippingCharge: number;
    subtotal: number;
};



export type TOrderRes = {

    _id: string;
    carts: TShoppingCart[];
    total: number;
    userId: string;
    shoppingInfo: TShoppingInfo;
    tax: number;
    shippingCharge: number;
    subtotal: number;
    createdAt: string;
    updatedAt: string
}