import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Edit2, Package, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { useProductStore } from '../../store/productStore';

export const ProductList = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-text-primary">Product Management</h1>
          <p className="text-text-secondary mt-1">Registry of all ceramic artifacts in the gallery.</p>
        </div>
        <button 
          onClick={() => navigate('/products/new')}
          className="flex items-center justify-center gap-2 bg-primary text-surface py-2.5 px-6 rounded-lg font-medium transition-all hover:bg-primary-dark shadow-sm self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 bg-surface p-4 rounded-xl border border-border shadow-sm">
        <div className="flex-1 flex items-center gap-2 bg-background px-3 py-2 rounded-lg border border-border/50">
          <Search className="w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search by title, artisan..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-text-secondary/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            <Filter className="w-4 h-4" />
            <span>Category</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort</span>
          </button>
          <select className="bg-background border border-border rounded-lg text-sm font-medium text-text-secondary px-4 py-2 focus:ring-primary focus:border-primary outline-none">
            <option value="">Status</option>
            <option value="available">Available</option>
            <option value="low_stock">Low Stock</option>
            <option value="sold_out">Sold Out</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-background animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center text-error">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-text-secondary/20 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-text-primary">No products found</h3>
            <p className="text-text-secondary mt-2">Add your first ceramic piece to the catalog.</p>
            <button 
              onClick={() => navigate('/products/new')}
              className="mt-6 text-primary font-semibold hover:underline"
            >
              Add Product Now
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-warm/50 border-b border-border">
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-secondary">Product</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-secondary">Artisan</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-secondary">Price</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-secondary">Stock</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-secondary">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-surface-warm/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-background rounded-lg border border-border overflow-hidden shrink-0">
                          {product.images?.[0] ? (
                            <img 
                              src={product.images[0].startsWith('http') ? product.images[0] : `http://localhost:3000${product.images[0]}`} 
                              alt={product.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-text-secondary/20" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{product.title}</p>
                          <p className="text-xs text-text-secondary">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-primary">
                      {product.artisanName || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-text-primary">
                      ${product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {product.inventory} left
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        product.status === 'available' ? 'bg-success/10 text-success' : 
                        product.status === 'low_stock' ? 'bg-warning/10 text-warning' : 
                        'bg-error/10 text-error'
                      }`}>
                        {product.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => navigate(`/products/edit/${product.id}`)}
                          className="p-2 hover:bg-surface-warm rounded-full text-text-secondary hover:text-primary transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-surface-warm rounded-full text-text-secondary">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
