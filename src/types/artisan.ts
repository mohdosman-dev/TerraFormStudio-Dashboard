export interface Artisan {
  id: string;
  _id?: string;
  name: string;
  bio: string;
  philosophy: string;
  materials: string[];
  imageUrl?: string;
  status: 'active' | 'inactive' | 'archived';
  productCount: number;
  featured: boolean;
  createdAt: string;
}

export interface CreateArtisanDto {
  name: string;
  bio: string;
  philosophy: string;
  materials: string[];
  featured?: boolean;
}

export interface ArtisanStore {
  artisans: Artisan[];
  loading: boolean;
  error: string | null;
  fetchArtisans: () => Promise<void>;
  createArtisan: (data: FormData) => Promise<void>;
  updateArtisan: (id: string, data: FormData) => Promise<void>;
}
