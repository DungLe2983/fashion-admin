type CollectionType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    products: ProductType[];
};
type ColorType = {
    _id: string;
    title: string;
    description: string;
    products: ProductType[];
};
type SizeType = {
    _id: string;
    title: string;
    description: string;
    products: ProductType[];
};
type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    collections: [CollectionType];
    rate: number;
    sizes: [SizeType];
    colors: [ColorType];
    price: number;
    expense: number;
    createdAt: Date;
    updatedAt: Date;
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

type CustomerType = {
    Id: string;
    name: string;
    email: string;
};
