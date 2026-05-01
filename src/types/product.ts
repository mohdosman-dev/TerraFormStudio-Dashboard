export interface Product {
  id: string;
  _id?: string;
  title: string;
  description: string;
  price: number;
  artisanId: string;
  artisanName?: string;
  collectionId?: string;
  category: string;
  materials: string[];
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  inventory: number;
  status: 'available' | 'low_stock' | 'sold_out' | 'draft';
  images: string[];
  featured: boolean;
  createdAt: string;
}

export interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  createProduct: (data: FormData) => Promise<void>;
  updateProduct: (id: string, data: FormData) => Promise<void>;
}
