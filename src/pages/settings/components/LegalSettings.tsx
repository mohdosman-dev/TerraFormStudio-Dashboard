import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSettingsStore } from '../../../store/settingsStore'

const schema = z.object({
  termsAndConditions: z.object({
    content: z.string()
  }),
  privacyPolicy: z.object({
    content: z.string()
  })
})

type FormData = z.infer<typeof schema>

const LegalSettings: React.FC = () => {
  const { settings, updateSettings, isLoading } = useSettingsStore()

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      termsAndConditions: {
        content: settings?.legal.termsAndConditions.content || ''
      },
      privacyPolicy: {
        content: settings?.legal.privacyPolicy.content || ''
      }
    }
  })

  const onSubmit = async (data: FormData) => {
    await updateSettings({ legal: data })
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      <div>
        <h3 className="font-serif text-xl mb-2">Legal Agreements</h3>
        <p className="text-sm text-stone-500 leading-relaxed">
          Policy updates for transparency and artisan protection.
        </p>
      </div>
      <div className="md:col-span-2 space-y-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="group">
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
              Terms & Conditions
            </label>
            <textarea
              {...register('termsAndConditions.content')}
              className="w-full bg-[#f4f4f0] border-b border-stone-200 border-t-0 border-x-0 focus:ring-0 focus:border-[#6b5c46] px-4 py-4 rounded-t-lg font-serif italic text-stone-600 resize-none"
              rows={4}
              placeholder="Enter terms of service..."
            />
            <p className="text-[10px] text-stone-400 mt-2 italic text-right">
              Last updated: {formatDate(settings?.legal.termsAndConditions.lastUpdated)}
            </p>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
              Privacy Policy
            </label>
            <textarea
              {...register('privacyPolicy.content')}
              className="w-full bg-[#f4f4f0] border-b border-stone-200 border-t-0 border-x-0 focus:ring-0 focus:border-[#6b5c46] px-4 py-4 rounded-t-lg font-serif italic text-stone-600 resize-none"
              rows={4}
              placeholder="Enter privacy policy..."
            />
            <p className="text-[10px] text-stone-400 mt-2 italic text-right">
              Last updated: {formatDate(settings?.legal.privacyPolicy.lastUpdated)}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#6b5c46] text-[#fff6ee] px-8 py-2 rounded-full font-bold text-sm hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Legal Settings'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default LegalSettings
