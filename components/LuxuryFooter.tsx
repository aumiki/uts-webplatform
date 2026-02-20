"use client";

import Link from "next/link";

export default function LuxuryFooter() {
  return (
    <footer className="bg-white border-t border-black/5 pt-24 pb-12 px-6 md:px-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-serif tracking-[0.4em] text-black font-bold mb-8 block">
              MAISON<span className="font-light">LUXE</span>
            </Link>
            <p className="text-black/50 text-xs leading-loose tracking-wide font-light max-w-xs">
              The ultimate destination for luxury beauty. 
              Elevating the everyday into an extraordinary ritual.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">The Maison</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-black/60">
              <li><Link href="/" className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link href="/" className="hover:text-gold transition-colors">Sustainability</Link></li>
              <li><Link href="/" className="hover:text-gold transition-colors">Careers</Link></li>
              <li><Link href="/" className="hover:text-gold transition-colors">Ateliers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Customer Care</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-black/60">
              <li><Link href="/" className="hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/" className="hover:text-gold transition-colors">Delivery & Returns</Link></li>
              <li><Link href="/" className="hover:text-gold transition-colors">FAQ</Link></li>
              <li><Link href="/" className="hover:text-gold transition-colors">Book a Consultation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Newsletter</h4>
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-6">Join the inner circle</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-black/10 py-3 text-[10px] tracking-[0.2em] focus:outline-none focus:border-gold transition-colors"
              />
              <button className="absolute right-0 bottom-3 text-[10px] font-bold hover:text-gold transition-colors">JOIN</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-black/5 gap-6">
          <p className="text-[8px] tracking-[0.3em] text-black/30">© 2026 MAISON LUXE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 text-[8px] tracking-[0.3em] text-black/30 uppercase">
            <Link href="/" className="hover:text-black">Privacy Policy</Link>
            <Link href="/" className="hover:text-black">Terms of Service</Link>
            <Link href="/" className="hover:text-black">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
