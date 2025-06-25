export interface UserType {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    googleId: string;
    cart: CartItemType[];
    role: UserRole;
    address: AddressType;
    birthdate: Date;
    createdAt: Date;
}

export enum UserRole {
    admin = 'admin',
    user = 'user'
}
export interface BrandType {
    brandId: number;
    name: string;
    description?: string;
    poducts: ProductType[];
    imageUrl: string;
}

export enum ParfumeGenderType {
    male = "male",
    female = "female",
    unisex = "unisex"
}
export interface CategoryType {
    categoryId: string;
    name: string;
    description?: string;
}
export interface CartItemType {
    productId: number;
    userId: number;
    quantity: number;
    product: ProductType;
}
export interface ProductType {
    productId: number;
    name: string;
    brand: BrandType;
    price: number;
    imageUrl: string;
    description?: string;
    stockQuantity: number;
    category: CategoryType;
}
export enum OrderStatus {
    pending = 'pending',
    processing = 'processing',
    cancelled = 'cancelled',
    delivered = 'delivered'
}
export interface AddressType {
    addressId: number;
    city: string;
    street: string;
    country: string;
    postalCode: string;
}
export interface OrderItemType {
    product: ProductType;
    quantity: number;
    unitPrice: number;
}
export enum PaymentMethod {
    creditCard = 'credit_card',
    paypal = 'paypal'
}
export enum PaymentStatus {
    pending = 'pending',
    cancelled = 'cancelled',
    approved = 'approved'
}
export interface PaymentType {
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    amount: number;
}
export interface OrderType {
    orderId: number;
    status: OrderStatus;
    totalAmount: number;
    user: UserType;
    address: AddressType;
    items: OrderItemType[];
    payments: PaymentType[];
    createdAt: Date;
}

export interface MonthlyOrderStats {
  month: number;
  orderCount: number;
}