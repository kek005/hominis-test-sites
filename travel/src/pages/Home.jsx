import { Link } from 'react-router-dom'
import { CITIES } from '../data/seed.js'
import SearchWidget from '../components/SearchWidget.jsx'
import Photo from '../components/Photo.jsx'

export default function Home() {
  return (
    <div>
      <section
        className="bg-brand-800 bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(8,51,68,0.7), rgba(8,51,68,0.75)), url('/img/dest/hero.jpg')" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-4xl font-bold text-white">Where to next?</h1>
          <p className="mt-2 max-w-xl text-brand-100">Compare flights and hotels across the world's best destinations — book in minutes.</p>
          <div className="mt-8"><SearchWidget /></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Popular destinations</h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {CITIES.map((c) => (
            <Link key={c.code} to={`/hotels?city=${c.code}`} data-testid="destination" className="group overflow-hidden rounded-2xl border border-gray-100">
              <Photo src={`/img/dest/${c.img}.jpg`} alt={c.city} label={c.city} className="h-32 w-full transition group-hover:scale-105" />
              <div className="p-3">
                <p className="font-semibold text-gray-900">{c.city}</p>
                <p className="text-xs text-gray-500">{c.country}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
