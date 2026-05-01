import React from 'react'
import { useSettingsStore } from '../../../store/settingsStore'

const PaymentSettings: React.FC = () => {
  const { settings, updateSettings, isLoading } = useSettingsStore()

  const handleToggleStripe = async () => {
    if (!settings) return
    await updateSettings({
      payments: {
        ...settings.payments,
        stripe: {
          ...settings.payments.stripe,
          isActive: !settings.payments.stripe.isActive
        }
      }
    })
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      <div>
        <h3 className="font-serif text-xl mb-2">Payment Gateways</h3>
        <p className="text-sm text-stone-500 leading-relaxed">
          Secure transaction processing and wallet integrations.
        </p>
      </div>
      <div className="md:col-span-2 space-y-4">
        {/* Stripe */}
        <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border-b border-stone-200/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#edeeea] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#6b5c46]">credit_card</span>
            </div>
            <div>
              <p className="font-bold">Stripe</p>
              <p className="text-xs text-stone-500">
                {settings?.payments.stripe.connectedAccount || 'Not connected'}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleStripe}
            disabled={isLoading}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors ${
              settings?.payments.stripe.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-stone-100 text-stone-600'
            }`}
          >
            {settings?.payments.stripe.isActive ? 'Active' : 'Inactive'}
          </button>
        </div>

        {/* PayPal */}
        <div className="flex items-center justify-between bg-[#f4f4f0] p-6 rounded-xl hover:bg-[#edeeea] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#e0e4de] flex items-center justify-center">
              <span className="material-symbols-outlined text-stone-400">account_balance_wallet</span>
            </div>
            <div>
              <p className="font-bold">PayPal</p>
              <p className="text-xs text-stone-500">
                {settings?.payments.paypal.email || 'Not configured'}
              </p>
            </div>
          </div>
          <button className="text-[#6b5c46] font-bold text-xs uppercase tracking-widest">
            Connect
          </button>
        </div>

        {/* Apple Pay */}
        <div className="flex items-center justify-between bg-[#f4f4f0] p-6 rounded-xl hover:bg-[#edeeea] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#e0e4de] flex items-center justify-center">
              <span className="material-symbols-outlined text-stone-400">apple</span>
            </div>
            <div>
              <p className="font-bold">Apple Pay</p>
              <p className="text-xs text-stone-500">
                {settings?.payments.applePay.isVerified ? 'Verified' : 'Requires domain verification'}
              </p>
            </div>
          </div>
          <button className="text-[#6b5c46] font-bold text-xs uppercase tracking-widest">
            {settings?.payments.applePay.isVerified ? 'Manage' : 'Verify'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default PaymentSettings
