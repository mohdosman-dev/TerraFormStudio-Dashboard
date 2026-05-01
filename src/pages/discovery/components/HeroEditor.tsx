import React from 'react'
import { useForm } from 'react-hook-form'
import { useDiscoveryStore } from '../../../store/discoveryStore'

const HeroEditor: React.FC = () => {
  const { config, updateSection, isLoading } = useDiscoveryStore()
  const heroSection = config?.sections.find(s => s.type === 'hero')

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: heroSection?.title || '',
      ctaLabel: heroSection?.cta?.label || ''
    }
  })

  const onSubmit = async (data: any) => {
    await updateSection('hero', {
      title: data.title,
      cta: { ...heroSection?.cta, label: data.ctaLabel }
    })
  }

  return (
    <section className="bg-white p-10 rounded shadow-sm relative overflow-hidden group">
      <div className="flex items-center gap-4 mb-8">
        <span className="w-8 h-[1px] bg-[#6b5c46]"></span>
        <h3 className="font-['Manrope'] text-xs font-bold uppercase tracking-[0.2em] text-[#6b5c46]">
          Hero Section
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block font-['Manrope'] text-[10px] uppercase tracking-widest text-stone-500 mb-2">
              Hero Title
            </label>
            <input
              {...register('title')}
              className="w-full bg-transparent border-b border-stone-200 py-2 focus:border-[#6b5c46] focus:outline-none font-serif text-2xl italic text-[#2f3430] transition-colors"
              type="text"
            />
          </div>
          <div>
            <label className="block font-['Manrope'] text-[10px] uppercase tracking-widest text-stone-500 mb-2">
              CTA Label
            </label>
            <input
              {...register('ctaLabel')}
              className="w-full bg-transparent border-b border-stone-200 py-2 focus:border-[#6b5c46] focus:outline-none font-['Manrope'] text-sm tracking-wide text-[#2f3430] transition-colors"
              type="text"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#6b5c46] text-[#fff6ee] px-6 py-2 rounded text-xs font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50"
            >
              Update Hero
            </button>
          </div>
        </div>
        <div className="relative">
          <label className="block font-['Manrope'] text-[10px] uppercase tracking-widest text-stone-500 mb-4">
            Hero Imagery
          </label>
          <div className="aspect-[4/5] bg-[#f4f4f0] flex flex-col items-center justify-center border border-dashed border-stone-300 rounded group/upload hover:bg-[#edeeea] transition-all cursor-pointer overflow-hidden">
            {heroSection?.image?.url ? (
              <img
                src={heroSection.image.url}
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
              />
            ) : null}
            <span className="material-symbols-outlined text-[#6b5c46] mb-2 z-10">add_photo_alternate</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#6b5c46] z-10">Replace Media</span>
          </div>
        </div>
      </form>
    </section>
  )
}

export default HeroEditor
