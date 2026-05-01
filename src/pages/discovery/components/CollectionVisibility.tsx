import React, { useEffect, useState } from 'react'
import { useDiscoveryStore } from '../../../store/discoveryStore'
import axios from '../../../api/axios'

const CollectionVisibility: React.FC = () => {
  const { config, updateSection, isLoading } = useDiscoveryStore()
  const collectionSection = config?.sections.find(s => s.type === 'collection_row')
  const [collections, setCollections] = useState<any[]>([])

  useEffect(() => {
    const fetchCollections = async () => {
      const { data } = await axios.get('/collections')
      setCollections(data)
    }
    fetchCollections()
  }, [])

  const toggleCollection = async (collectionId: string) => {
    const currentIds = collectionSection?.collectionIds?.map((c: any) => c._id || c) || []
    const newIds = currentIds.includes(collectionId)
      ? currentIds.filter((id: string) => id !== collectionId)
      : [...currentIds, collectionId]
    
    await updateSection('collection_row', { collectionIds: newIds })
  }

  return (
    <section className="bg-[#edeeea] p-10 rounded shadow-sm">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <span className="w-8 h-[1px] bg-[#6b5c46]"></span>
          <h3 className="font-['Manrope'] text-xs font-bold uppercase tracking-[0.2em] text-[#6b5c46]">
            Featured Collections
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((collection) => {
          const isSelected = collectionSection?.collectionIds?.some((c: any) => (c._id || c) === collection._id)
          return (
            <div
              key={collection._id}
              className="bg-white p-6 rounded flex items-center justify-between group hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-[#f4f4f0]">
                  <img
                    src={collection.heroImage?.url}
                    alt={collection.title}
                    className={`w-full h-full object-cover transition-all ${isSelected ? '' : 'grayscale'}`}
                  />
                </div>
                <div>
                  <p className="font-serif text-lg text-[#2f3430]">{collection.title}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleCollection(collection._id)}
                  disabled={isLoading}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6b5c46]"></div>
              </label>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CollectionVisibility
