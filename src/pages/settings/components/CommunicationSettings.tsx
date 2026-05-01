import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSettingsStore } from '../../../store/settingsStore'

const templateSchema = z.object({
  subject: z.string(),
  body: z.string()
})

const schema = z.object({
  emailTemplates: z.object({
    orderConfirmation: templateSchema,
    shippingUpdate: templateSchema,
    welcomeEmail: templateSchema
  })
})

type FormData = z.infer<typeof schema>

const CommunicationSettings: React.FC = () => {
  const { settings, updateSettings, isLoading } = useSettingsStore()

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      emailTemplates: {
        orderConfirmation: settings?.communication.emailTemplates.orderConfirmation || { subject: '', body: '' },
        shippingUpdate: settings?.communication.emailTemplates.shippingUpdate || { subject: '', body: '' },
        welcomeEmail: settings?.communication.emailTemplates.welcomeEmail || { subject: '', body: '' }
      }
    }
  })

  const onSubmit = async (data: FormData) => {
    await updateSettings({ communication: data })
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-20">
      <div>
        <h3 className="font-serif text-xl mb-2">Communication</h3>
        <p className="text-sm text-stone-500 leading-relaxed">
          Automated touchpoints for the customer journey.
        </p>
      </div>
      <div className="md:col-span-2 space-y-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Order Confirmation */}
          <div className="bg-white p-8 rounded-xl shadow-sm border-b border-stone-200/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-lg">Order Confirmation</h4>
              <span className="material-symbols-outlined text-stone-300">mail</span>
            </div>
            <div className="space-y-4">
              <input
                {...register('emailTemplates.orderConfirmation.subject')}
                className="w-full bg-[#f4f4f0] border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-[#6b5c46]"
                placeholder="Subject"
              />
              <textarea
                {...register('emailTemplates.orderConfirmation.body')}
                className="w-full bg-[#f4f4f0] border-none rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-[#6b5c46] resize-none"
                rows={3}
                placeholder="Email body content..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#f4f4f0] p-6 rounded-xl border-b border-stone-200/50">
              <h4 className="font-bold mb-4">Shipping Update</h4>
              <div className="space-y-2">
                <input
                  {...register('emailTemplates.shippingUpdate.subject')}
                  className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#6b5c46]"
                  placeholder="Subject"
                />
                <textarea
                  {...register('emailTemplates.shippingUpdate.body')}
                  className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#6b5c46] resize-none"
                  rows={2}
                  placeholder="Content..."
                />
              </div>
            </div>
            <div className="bg-[#f4f4f0] p-6 rounded-xl border-b border-stone-200/50">
              <h4 className="font-bold mb-4">Welcome Email</h4>
              <div className="space-y-2">
                <input
                  {...register('emailTemplates.welcomeEmail.subject')}
                  className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#6b5c46]"
                  placeholder="Subject"
                />
                <textarea
                  {...register('emailTemplates.welcomeEmail.body')}
                  className="w-full bg-white border-none rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#6b5c46] resize-none"
                  rows={2}
                  placeholder="Content..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#6b5c46] text-[#fff6ee] px-8 py-2 rounded-full font-bold text-sm hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Communication Settings'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CommunicationSettings
