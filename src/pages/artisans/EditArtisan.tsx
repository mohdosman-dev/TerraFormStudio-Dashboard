import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, X, Upload, Check } from 'lucide-react';
import { useArtisanStore } from '../../store/artisanStore';

export const EditArtisan = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { artisans, createArtisan, updateArtisan, loading, error } = useArtisanStore();

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    philosophy: '',
    materials: '',
    featured: false,
    status: 'active'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      const artisan = artisans.find(a => a.id === id);
      if (artisan) {
        setFormData({
          name: artisan.name,
          bio: artisan.bio,
          philosophy: artisan.philosophy,
          materials: artisan.materials.join(', '),
          featured: artisan.featured,
          status: artisan.status
        });
        if (artisan.imageUrl) {
          setImagePreview(artisan.imageUrl.startsWith('http') ? artisan.imageUrl : `http://localhost:3000${artisan.imageUrl}`);
        }
      }
    }
  }, [id, isEdit, artisans]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('bio', formData.bio);
    data.append('philosophy', formData.philosophy);
    formData.materials.split(',').forEach(m => data.append('materials[]', m.trim()));
    data.append('featured', String(formData.featured));
    data.append('status', formData.status);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (isEdit && id) {
        await updateArtisan(id, data);
      } else {
        await createArtisan(data);
      }
      navigate('/artisans');
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/artisans')}
            className="p-2 hover:bg-surface-warm rounded-full text-text-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-serif text-3xl font-bold text-text-primary">
              {isEdit ? 'Edit Artisan' : 'Add New Artisan'}
            </h1>
            <p className="text-text-secondary mt-1">
              {isEdit ? 'Update profile and storytelling details.' : 'Define a new maker in the gallery community.'}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/artisans')}
            className="px-6 py-2.5 border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-warm transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-primary text-surface py-2.5 px-6 rounded-lg font-medium transition-all hover:bg-primary-dark shadow-sm disabled:opacity-70"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/20 text-error p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Form Fields */}
        <div className="md:col-span-8 space-y-6">
          <div className="bg-surface p-8 rounded-xl border border-border shadow-sm space-y-6">
            <h3 className="font-serif text-xl font-bold border-b border-border pb-4">Profile Details</h3>
            
            <div className="space-y-2">
              <label className="block text-[11px] tracking-wider uppercase text-text-secondary font-semibold">Artisan Name</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm transition-all"
                placeholder="e.g., Elena Kostic"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] tracking-wider uppercase text-text-secondary font-semibold">Short Biography</label>
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm transition-all resize-none"
                placeholder="A brief editorial intro..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] tracking-wider uppercase text-text-secondary font-semibold">Creative Philosophy</label>
              <textarea 
                name="philosophy"
                value={formData.philosophy}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm transition-all resize-none"
                placeholder="Describe their process and vision..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] tracking-wider uppercase text-text-secondary font-semibold">Materials & Techniques (Comma separated)</label>
              <input 
                name="materials"
                value={formData.materials}
                onChange={handleInputChange}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm transition-all"
                placeholder="Terracotta, Stoneware, Hand-built..."
              />
            </div>
          </div>
        </div>

        {/* Right Column: Media & Status */}
        <div className="md:col-span-4 space-y-6">
          {/* Status & Visibility */}
          <div className="bg-surface p-6 rounded-xl border border-border shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold">Publishing</h3>
            
            <div className="space-y-2">
              <label className="block text-[11px] tracking-wider uppercase text-text-secondary font-semibold">Visibility Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`w-10 h-5 rounded-full transition-colors ${formData.featured ? 'bg-primary' : 'bg-border'}`}></div>
                <div className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform ${formData.featured ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
              <span className="text-sm font-medium text-text-primary">Featured Artisan</span>
            </label>
          </div>

          {/* Profile Media */}
          <div className="bg-surface p-6 rounded-xl border border-border shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold">Profile Media</h3>
            <div className="relative aspect-square bg-background rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center overflow-hidden group">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <label className="p-2 bg-white rounded-full cursor-pointer hover:bg-white/90 transition-colors">
                      <Upload className="w-5 h-5 text-primary" />
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <button 
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(null); }}
                      className="p-2 bg-white rounded-full hover:bg-white/90 transition-colors"
                    >
                      <X className="w-5 h-5 text-error" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-surface-warm transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs text-text-secondary font-medium">Upload Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>
            <p className="text-[10px] text-text-secondary italic text-center">
              Recommended: 800x800px or larger. JPEG or PNG.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
