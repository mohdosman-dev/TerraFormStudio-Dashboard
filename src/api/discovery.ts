import axios from './axios'

export interface HomeConfiguration {
  _id: string
  name: string
  status: 'published' | 'draft' | 'archived'
  sections: HomeSection[]
  updatedAt: string
}

export interface HomeSection {
  _id?: string
  type: 'hero' | 'artisan_spotlight' | 'product_row' | 'collection_row' | 'editorial'
  title?: string
  subtitle?: string
  image?: {
    url: string
    alt: string
  }
  cta?: {
    label: string
    targetType: 'collection' | 'product' | 'artisan' | 'url'
    targetId?: string
    url?: string
  }
  artisanId?: any
  productIds?: any[]
  collectionIds?: any[]
  content?: string
  sortOrder: number
}

export const discoveryApi = {
  getActiveHome: async (): Promise<HomeConfiguration> => {
    const { data } = await axios.get('/admin/discovery/active')
    return data
  },
  updateHomeConfiguration: async (id: string, updates: Partial<HomeConfiguration>): Promise<HomeConfiguration> => {
    const { data } = await axios.patch(`/admin/discovery/${id}`, updates)
    return data
  }
}
