import React, { useEffect, useState } from 'react'
import { useDiscoveryStore } from '../../../store/discoveryStore'
import axios from '../../../api/axios'

const ArtisanSpotlightEditor: React.FC = () => {
  const { config, updateSection, isLoading } = useDiscoveryStore()
  const spotlightSection = config?.sections.find(s => s.type === 'artisan_spotlight')
  const [artisans, setArtisans] = useState<any[]>([])

  useEffect(() => {
    const fetchArtisans = async () => {
      const { data } = await axios.get('/artisans')
      setArtisans(data)
    }
    fetchArtisans()
  }, [])

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await updateSection('artisan_spotlight', {
      artisanId: formData.get('artisanId'),
      content: formData.get('content')
    })
  }

  return (
    <section className="bg-[#f4f4f0] p-8 rounded h-full">
      <div className="flex items-center gap-4 mb-8">
        <span className="w-6 h-[1px] bg-[#6b5c46]"></span>
        <h3 className="font-['Manrope'] text-xs font-bold uppercase tracking-[0.2em] text-[#6b5c46]">
          Artisan Spotlight
        </h3>
      </div>
      <form onSubmit={handleUpdate} className="space-y-8">
        <div>
          <label className="block font-['Manrope'] text-[10px] uppercase tracking-widest text-stone-500 mb-3">
            Featured Artisan
          </label>
          <select
            name="artisanId"
            defaultValue={spotlightSection?.artisanId?._id || spotlightSection?.artisanId}
            className="w-full bg-white border-none py-4 px-4 rounded text-sm font-['Manrope'] text-[#2f3430] shadow-sm focus:ring-1 focus:ring-[#6b5c46]/20"
          >
            {artisans.map(a => (
              <option key={a._id} value={a._id}>{a.displayName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-['Manrope'] text-[10px] uppercase tracking-widest text-stone-500 mb-3">
            Custom Spotlight Blurb
          </label>
          <textarea
            name="content"
            defaultValue={spotlightSection?.content || ''}
            className="w-full bg-white border-none p-4 rounded text-sm leading-relaxed font-serif italic text-[#2f3430] shadow-sm focus:ring-1 focus:ring-[#6b5c46]/20 resize-none"
            rows={6}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#6b5c46] text-[#fff6ee] px-6 py-2 rounded text-xs font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50"
          >
            Save Spotlight
          </button>
        </div>
      </form>
    </section>
  )
}

export default ArtisanSpotlightEditor
