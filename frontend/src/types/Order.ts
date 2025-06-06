export interface OrderItemRaw {
  id: number;         // primary key of the OrderItem record
  orderId: number;    // FK back to the parent order
  productId: number;  // FK to Product (we’ll just show productId for now)
  quantity: number;
  unitPrice: number;
}

export interface OrderRaw {
  id: number;                // primary key of the order
  userId: string;            // the retailer’s user ID or email
  orderDate: string;         // ISO date string; e.g. "2025-06-01T00:00:00"
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  orderItems: OrderItemRaw[];  // array of line items (no product name yet)
}