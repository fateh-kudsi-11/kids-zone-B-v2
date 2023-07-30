export interface getProductsParams {
  gender?: string;
  category?: string;
  brand?: { $in: string[] };
  availableColor?: { $in: string[] };
  size?: { $in: string[] };
  productType?: string;
  price?: { $gte: number; $lte: number };
}

export interface getProductspagination {
  total: number;
  next?: { page: number };
}

export interface filterElTypes {
  productType: { title: string; count: number }[];
  brands: { title: string; count: number }[];
  colors: { title: string; count: number }[];
  sizes: { title: string; count: number }[];
  price: {
    maxPrice: number;
    minPrice: number;
  };
}
