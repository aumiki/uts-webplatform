import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-cream overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-soft-pink rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-soft-pink rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <span className="text-soft-pink uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">Premium Cosmetics</span>
        <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-6 leading-tight">
          Elegance in Every <br /> <span className="italic">Detail.</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-xl mx-auto mb-10 font-light leading-relaxed">
          Discover a collection curated for those who appreciate the finer things in life. 
          Minimalist, effective, and beautifully crafted.
        </p>
        <Link 
          href="#collection" 
          className="inline-block border border-foreground px-10 py-4 text-sm uppercase tracking-widest hover:bg-foreground hover:text-cream transition-all duration-300"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}
