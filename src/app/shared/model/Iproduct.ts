export interface Iproduct {
  productId: number;
  name: string;
  category: 'ELECTRONIC' | 'FOOD' | 'COSMATIC' | 'CLOTH' | 'FOOTWARE' | 'OTHER';
  price: string;
  expYear: number;
  isAvailable: boolean;
}
