import LuxuryHero from "@/components/LuxuryHero";
import FeaturedCollection from "@/components/FeaturedCollection";
import BrandStory from "@/components/BrandStory";
import LuxuryFooter from "@/components/LuxuryFooter";

export default function Home() {
  return (
    <main className="bg-white">
      <LuxuryHero />
      <FeaturedCollection />
      <BrandStory />
      <div className="bg-white py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto border border-gold/20 p-24 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-8">
            <span className="text-gold text-2xl font-serif italic">Exclusive</span>
          </div>
          <h3 className="text-4xl font-serif text-black mb-8">Personalized Consultation</h3>
          <p className="text-black/50 font-light mb-12 tracking-wide leading-relaxed">
            Let our experts guide you through our collection and discover 
            the perfect products for your unique beauty needs.
          </p>
          <button className="bg-black text-white text-[10px] uppercase tracking-[0.4em] px-12 py-5 hover:bg-gold transition-all duration-700">
            Book an Appointment
          </button>
        </div>
      </div>
      <LuxuryFooter />
    </main>
  );
}

