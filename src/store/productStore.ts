import { create } from 'zustand';
import api from '../api/axios';
import { type Product, type ProductStore } from '../types/product';

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/products');
      const data = response.data.map((p: any) => ({
        ...p,
        id: p.id || p._id
      }));
      set({ products: data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch products', loading: false });
    }
  },

  createProduct: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const response = await api.get('/products');
      const data = response.data.map((p: any) => ({
        ...p,
        id: p.id || p._id
      }));
      set({ products: data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to create product', loading: false });
      throw err;
    }
  },

  updateProduct: async (id: string, formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await api.patch(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const response = await api.get('/products');
      const data = response.data.map((p: any) => ({
        ...p,
        id: p.id || p._id
      }));
      set({ products: data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to update product', loading: false });
      throw err;
    }
  }
}));
