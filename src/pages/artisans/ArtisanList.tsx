import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Edit2, Eye, MoreHorizontal, User } from 'lucide-react';
import { useArtisanStore } from '../../store/artisanStore';

export const ArtisanList = () => {
  const { artisans, loading, error, fetchArtisans } = useArtisanStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtisans();
  }, [fetchArtisans]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-text-primary">Artisan Management</h1>
          <p className="text-text-secondary mt-1">Manage the storyteller and maker community.</p>
        </div>
        <button 
          onClick={() => navigate('/artisans/new')}
          className="flex items-center justify-center gap-2 bg-primary text-surface py-2.5 px-6 rounded-lg font-medium transition-all hover:bg-primary-dark shadow-sm self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Artisan</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-surface p-4 rounded-xl border border-border shadow-sm">
        <div className="flex-1 flex items-center gap-2 bg-background px-3 py-2 rounded-lg border border-border/50">
          <Search className="w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search by artisan name..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-text-secondary/50"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <select className="bg-background border border-border rounded-lg text-sm font-medium text-text-secondary px-4 py-2 focus:ring-primary focus:border-primary outline-none">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Artisan Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface rounded-xl border border-border p-6 h-64 animate-pulse"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-error/10 border border-error/20 text-error p-4 rounded-lg text-center">
          {error}
        </div>
      ) : artisans.length === 0 ? (
        <div className="bg-surface rounded-xl border border-border p-12 text-center">
          <div className="w-16 h-16 bg-surface-warm rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-text-secondary" />
          </div>
          <h3 className="font-serif text-xl font-bold text-text-primary">No artisans found</h3>
          <p className="text-text-secondary mt-2">Start by adding your first artisan to the gallery.</p>
          <button 
            onClick={() => navigate('/artisans/new')}
            className="mt-6 text-primary font-semibold hover:underline"
          >
            Add Artisan Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisans.map((artisan) => (
            <div key={artisan.id} className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
              <div className="h-48 relative overflow-hidden bg-surface-warm">
                {artisan.imageUrl ? (
                  <img 
                    src={artisan.imageUrl.startsWith('http') ? artisan.imageUrl : `http://localhost:3000${artisan.imageUrl}`} 
                    alt={artisan.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-text-secondary/30" />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    artisan.status === 'active' ? 'bg-success text-surface' : 'bg-text-secondary text-surface'
                  }`}>
                    {artisan.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-text-primary">{artisan.name}</h3>
                    <p className="text-text-secondary text-xs mt-1 uppercase tracking-widest">{artisan.productCount} Artifacts</p>
                  </div>
                  <button className="p-1 hover:bg-surface-warm rounded">
                    <MoreHorizontal className="w-5 h-5 text-text-secondary" />
                  </button>
                </div>
                <p className="text-sm text-text-secondary mt-4 line-clamp-2 italic leading-relaxed">
                  "{artisan.bio}"
                </p>
                <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
                  <div className="flex gap-2">
                    {artisan.featured && (
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate(`/artisans/edit/${artisan.id}`)}
                      className="p-2 hover:bg-surface-warm rounded-full text-text-secondary hover:text-primary transition-colors"
                      title="Edit Artisan"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 hover:bg-surface-warm rounded-full text-text-secondary hover:text-primary transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
