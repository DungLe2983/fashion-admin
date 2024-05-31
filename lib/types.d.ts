type CategoryType = {
    _id: string;
    name: string;
    description: string;
};
type ColorType = {
    _id: string;
    name: string;
    description: string;
};
type SizeType = {
    _id: string;
    name: string;
    description: string;
};
type ProductType = {
    _id: string;
    name: string;
    description: string;
    image: [string];
    category_id: [CategoryType];
    product_item_id: [ProductItemType];
    createdAt: Date;
    updatedAt: Date;
};
type ProductItemType = {
    _id: string;
    price: number;
    quantity: number;
    product_id: ProductType;
    size_id: SizeType;
    color_id: ColorType;
};
type OrderColumnType = {
    _id: string;
    customer: string;
    products: number;
    totalAmount: number;
    createdAt: string;
};
type OrderItemType = {
    product: ProductType;
    color: string;
    size: string;
    quantity: number;
};

type UserType = {
    _id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: number;
    address: string;
    sex: string;
    birthday: Date;
    cart_id: CartType;
    createdAt: Date;
    updatedAt: Date;
};
type CartType = {
    _id: string;
    user_id: UserType;
    cart_item_id: CartItemType;
    createdAt: Date;
    updatedAt: Date;
};
type CartItemType = {
    _id: string;
    cart_id: CartType;
    product_item_id: ProductItemType;
    item_quantity: number;
    createdAt: Date;
    updatedAt: Date;
};
