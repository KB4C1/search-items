type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku?: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warranty: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    lastUpdate: string;
    barcode: string;
    qrcode: string;
  };
  images: string[];
  thumbnail: string;
};

export type DummyJsonResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};