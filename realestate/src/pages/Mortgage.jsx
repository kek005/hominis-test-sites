import { useState } from 'react'
import { monthlyPI } from '../data/seed.js'
import { money } from '../lib/format.js'

export default function Mortgage() {
  const [price, setPrice] = useState(650000)
  const [downPct, setDownPct] = useState(20)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(30)
  const [taxRate, setTaxRate] = useState(1.3)

  const pi = monthlyPI(price, downPct, rate, years)
  const taxes = (price * (taxRate / 100)) / 12
  const insurance = (price * 0.0035) / 12
  const total = pi + taxes + insurance
  const downAmount = price * (downPct / 100)

  const input = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Mortgage calculator</h1>
      <p className="mt-1 text-sm text-gray-500">Estimate your monthly payment, including taxes and insurance.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Home price</span>
            <input type="number" min="0" step="10000" className={input} value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Down payment ({downPct}% = {money(downAmount)})</span>
            <input type="range" min="0" max="50" value={downPct} onChange={(e) => setDownPct(Number(e.target.value))} className="w-full accent-brand-600" aria-label="Down payment" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Interest rate ({rate}%)</span>
            <input type="range" min="3" max="10" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-brand-600" aria-label="Interest rate" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Loan term</span>
            <select className={input} value={years} onChange={(e) => setYears(Number(e.target.value))}>
              <option value={15}>15 years</option><option value={20}>20 years</option><option value={30}>30 years</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Property tax rate ({taxRate}% / year)</span>
            <input type="range" min="0" max="3" step="0.1" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full accent-brand-600" aria-label="Property tax rate" />
          </label>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white">
          <p className="text-sm text-brand-100">Estimated monthly payment</p>
          <p className="mt-1 text-4xl font-bold" data-testid="mortgage-monthly">{money(total)}</p>
          <dl className="mt-6 space-y-2 text-sm">
            <Row label="Principal & interest" value={money(pi)} />
            <Row label="Property tax" value={money(taxes)} />
            <Row label="Homeowners insurance" value={money(insurance)} />
          </dl>
          <p className="mt-6 border-t border-white/20 pt-4 text-xs text-brand-100">For illustration only. Actual payments depend on your loan, taxes, and insurance.</p>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return <div className="flex justify-between"><dt className="text-brand-100">{label}</dt><dd className="font-medium">{value}</dd></div>
}
