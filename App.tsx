import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Instagram, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Check, 
  Sparkles, 
  Clock, 
  Heart, 
  Calendar,
  Send,
  Sliders,
  Award
} from 'lucide-react';

// Premium High-Resolution Cinematic Photography Dataset
interface PortfolioItem {
  id: string;
  url: string;
  category: 'wedding' | 'couple' | 'event' | 'portrait';
  title: string;
  description: string;
  location: string;
  photographer: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'w1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    category: 'wedding',
    title: 'The Golden Hour Promise',
    description: 'A breathtaking candid catch as the sun dipped below the Tuscany hills, framing the couple in pure gold.',
    location: 'Siena, Italy',
    photographer: 'Aura Fine Art'
  },
  {
    id: 'w2',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
    category: 'wedding',
    title: 'Ethereal Veil Whispers',
    description: 'Capturing the intricate details of the lace veil dancing in a light ocean breeze at sunset.',
    location: 'Amalfi Coast, Italy',
    photographer: 'Marcus Vance'
  },
  {
    id: 'c1',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200',
    category: 'couple',
    title: 'Autumnal Affection',
    description: 'Soft smiles and genuine warmth under the canopy of gold and rust maple leaves in Central Park.',
    location: 'New York, USA',
    photographer: 'Sasha Laurent'
  },
  {
    id: 'p1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    category: 'portrait',
    title: 'Monochrome Reflection',
    description: 'A deep, cinematic portrait exploring shadows, high contrast, and raw emotional intensity.',
    location: 'Studio Loft 4B',
    photographer: 'Aura Fine Art'
  },
  {
    id: 'e1',
    url: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=1200',
    category: 'event',
    title: 'The First Dance Waltz',
    description: 'Sparklers illuminate the dancefloor as the newly-weds share their initial steps of a lifetime journey.',
    location: 'Château de Vaux, France',
    photographer: 'Marcus Vance'
  },
  {
    id: 'p2',
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1200',
    category: 'portrait',
    title: 'Gilded Muse',
    description: 'An elegant composition combining golden light play, direct gaze, and dramatic structural shadows.',
    location: 'Studio Loft 4B',
    photographer: 'Sasha Laurent'
  },
  {
    id: 'c2',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200',
    category: 'couple',
    title: 'Sands of Devotion',
    description: 'Running barefoot along the dramatic tide pools of Oregon as the blue hour rolled in.',
    location: 'Cannon Beach, Oregon',
    photographer: 'Aura Fine Art'
  },
  {
    id: 'e2',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200',
    category: 'event',
    title: 'Candid Champagne Toasts',
    description: 'Capturing laughter in its truest form amidst crystal clinking, soft speeches, and ambient lights.',
    location: 'The Ritz Garden, London',
    photographer: 'Sasha Laurent'
  }
];

const PHOTOGRAPHY_QUOTES = [
  { text: "Every picture tells a story that words cannot express.", author: "Aura Creed" },
  { text: "We don’t take photos, we capture emotions.", author: "Sasha Laurent" },
  { text: "Your memories, our lens, forever preserved.", author: "Marcus Vance" },
  { text: "Photography is the story I fail to put into words.", author: "Destin Sparks" }
];

const PACKAGES = [
  {
    id: 'classic',
    name: 'Classic Portrait Session',
    price: '$350',
    features: ['1.5 Hours Studio Session', '20 Fully Edited HD Images', '1 Outfit Change', 'Online Delivery in 3 Days', 'Print Release License']
  },
  {
    id: 'cinematic',
    name: 'Cinematic Storytelling (Couple)',
    price: '$550',
    features: ['3 Hours Outdoor Shoot', '45 Artistically Edited Images', '2 Outfit Changes', 'Drone/Aerial Photography', 'Private Digital Gallery']
  },
  {
    id: 'wedding',
    name: 'Ethereal Wedding Day',
    price: '$2,200',
    features: ['8 Hours Continuous Coverage', '200+ Finely Curated Prints', 'Two Professional Photographers', 'Includes Pre-Wedding Session', 'Premium Linen Keepsake Box']
  }
];

interface Booking {
  id: string;
  name: string;
  phone: string;
  eventType: string;
  date: string;
  packageId: string;
  message: string;
  createdAt: string;
  status: 'Received' | 'Consultation Scheduled' | 'Confirmed';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about-contact'>('home');
  const [heroIndex, setHeroIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'wedding' | 'couple' | 'event' | 'portrait'>('all');
  
  // Simulated WhatsApp State
  const [showWhatsAppChat, setShowWhatsAppChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'aura'; text: string; time: string }[]>([
    { sender: 'aura', text: 'Hello! Welcome to Aura Photo Studio. How can we help bring your dream photoshoot to life?', time: 'Just now' }
  ]);

  // Booking Form States
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingEventType, setBookingEventType] = useState('wedding');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingPackage, setBookingPackage] = useState('cinematic');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);

  // Load Bookings on Mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('aura_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Slide Hero Automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Slide Quotes Automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % PHOTOGRAPHY_QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle Booking Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingDate) {
      alert('Please fill in the required fields (Name, Phone, and Date).');
      return;
    }

    const newBooking: Booking = {
      id: 'AURA-' + Math.floor(100000 + Math.random() * 900000),
      name: bookingName,
      phone: bookingPhone,
      eventType: bookingEventType,
      date: bookingDate,
      packageId: bookingPackage,
      message: bookingMessage,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Received'
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('aura_bookings', JSON.stringify(updated));
    setLatestBooking(newBooking);
    setShowBookingSuccess(true);

    // Reset Form Fields
    setBookingName('');
    setBookingPhone('');
    setBookingDate('');
    setBookingMessage('');
  };

  // WhatsApp Message Simulation
  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = { sender: 'user' as const, text: chatMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatHistory((prev) => [...prev, userMsg]);
    const userPrompt = chatMessage;
    setChatMessage('');

    // Simulate Aura Studio response after 1 second
    setTimeout(() => {
      let responseText = "Thank you for reaching out! One of our lead photographers will confirm our availability soon. Would you like to schedule a 10-minute video consultation?";
      if (userPrompt.toLowerCase().includes('price') || userPrompt.toLowerCase().includes('cost') || userPrompt.toLowerCase().includes('package')) {
        responseText = "Our packages start from $350 for portrait sessions and $2,200 for full-day wedding coverage. I would love to send over our complete brochure. What is your email address?";
      } else if (userPrompt.toLowerCase().includes('wedding') || userPrompt.toLowerCase().includes('date') || userPrompt.toLowerCase().includes('book')) {
        responseText = "Beautiful choice! Wedding dates fill up quickly. If you have a date set, you can submit the booking inquiry form on our contact page, and we will block the date for your initial consultation!";
      }
      setChatHistory((prev) => [...prev, {
        sender: 'aura',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  const filteredPortfolio = portfolioFilter === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === portfolioFilter);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E8E2D6] font-sans antialiased selection:bg-[#C5A059] selection:text-black">
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#C5A059]/10">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          
          {/* Logo with wide branding */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex flex-col cursor-pointer group"
            id="brand-logo"
          >
            <span className="text-2xl font-light tracking-[0.4em] uppercase text-[#C5A059] transition-colors duration-300 group-hover:text-white">AURA</span>
            <span className="text-[8px] tracking-[0.61em] uppercase -mt-1 opacity-60 text-[#E8E2D6]">Photo Studio</span>
          </div>

          {/* Navigation Menu Links */}
          <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.25em] font-medium" id="main-nav">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`relative py-2 transition-colors ${currentPage === 'home' ? 'text-[#C5A059]' : 'text-[#E8E2D6]/70 hover:text-[#C5A059]'}`}
            >
              Home
              {currentPage === 'home' && (
                <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C5A059]" />
              )}
            </button>
            <button 
              onClick={() => setCurrentPage('about-contact')}
              className={`relative py-2 transition-colors ${currentPage === 'about-contact' ? 'text-[#C5A059]' : 'text-[#E8E2D6]/70 hover:text-[#C5A059]'}`}
            >
              About & Contact
              {currentPage === 'about-contact' && (
                <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C5A059]" />
              )}
            </button>
          </nav>

          {/* Quick Actions / Call to Action */}
          <div className="flex items-center gap-4">
            {bookings.length > 0 && (
              <button
                onClick={() => {
                  setCurrentPage('about-contact');
                  setTimeout(() => {
                    document.getElementById('booking-history-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="relative px-4 py-2 border border-white/10 hover:border-[#C5A059]/30 text-[10px] uppercase tracking-widest text-[#C5A059] flex items-center gap-2 transition-all"
                id="my-bookings-btn"
              >
                <Clock size={12} />
                <span>My Bookings ({bookings.length})</span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
              </button>
            )}

            <button 
              onClick={() => {
                setCurrentPage('about-contact');
                setTimeout(() => {
                  document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }}
              className="px-6 py-2.5 border border-[#C5A059] text-[#C5A059] text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-black transition-all duration-500 font-semibold"
              id="cta-book-shoot"
            >
              Book Your Shoot
            </button>
          </div>
        </div>
      </header>

      {/* RENDER PAGES */}
      <main className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              
              {/* SECTION 1: HERO SLIDESHOW */}
              <section className="relative h-[85vh] min-h-[550px] w-full overflow-hidden flex items-center justify-center border-b border-[#C5A059]/10" id="hero-slider">
                {/* Slideshow background photos */}
                <div className="absolute inset-0 z-0">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={heroIndex}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 0.45, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 1.8 }}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ 
                        backgroundImage: `url(${
                          heroIndex === 0 
                            ? PORTFOLIO_ITEMS[1].url 
                            : heroIndex === 1 
                              ? PORTFOLIO_ITEMS[0].url 
                              : PORTFOLIO_ITEMS[6].url
                        })` 
                      }}
                    />
                  </AnimatePresence>
                  {/* Luxury ambient dark overlay with warm radial gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0A0A0A_95%)]" />
                </div>

                {/* Hero Central Text Elements */}
                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-10 h-[1px] bg-[#C5A059]" />
                    <span className="text-[#C5A059] text-[11px] uppercase tracking-[0.4em] font-medium">Aura Photography Studio</span>
                    <div className="w-10 h-[1px] bg-[#C5A059]" />
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1.0 }}
                    className="text-4xl sm:text-6xl md:text-7xl font-light leading-tight tracking-wide mb-6 font-serif text-white"
                  >
                    Welcome to <span className="italic text-[#C5A059]">Aura</span> Photo Studio
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-base sm:text-lg opacity-85 max-w-xl text-[#E8E2D6] font-light tracking-wide mb-10 leading-relaxed"
                  >
                    “Capturing Your Beautiful Moments Forever”
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 items-center justify-center mt-6"
                  >
                    <button
                      onClick={() => {
                        setCurrentPage('about-contact');
                        setTimeout(() => {
                          document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="px-8 py-4 bg-[#C5A059] text-black font-semibold text-[11px] uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 flex items-center gap-3 shadow-lg shadow-[#C5A059]/10 hover:translate-y-[-2px]"
                      id="hero-book-shoot"
                    >
                      <span>Reserve a Session</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      onClick={() => {
                        setCurrentPage('about-contact');
                        setTimeout(() => {
                          const galleryElement = document.getElementById('full-portfolio');
                          galleryElement?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="px-8 py-4 bg-transparent border border-white/20 hover:border-[#C5A059] text-[#E8E2D6] hover:text-[#C5A059] text-[11px] uppercase tracking-[0.2em] transition-all duration-300"
                      id="hero-view-gallery"
                    >
                      <span>Explore Archives</span>
                    </button>
                  </motion.div>
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-3">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setHeroIndex(idx)}
                      className={`h-1.5 transition-all duration-500 rounded-full ${heroIndex === idx ? 'w-8 bg-[#C5A059]' : 'w-2 bg-white/30 hover:bg-white/60'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION 2: ABOUT PREVIEW SECTION */}
              <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-b border-[#C5A059]/10" id="about-preview">
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-semibold block">The Philosophy</span>
                  <h2 className="text-3xl sm:text-4xl font-light font-serif text-white leading-snug">
                    We specialize in wedding, couple, portrait and event photography with a <span className="italic text-[#C5A059]">cinematic touch</span>.
                  </h2>
                  <div className="w-16 h-[1px] bg-[#C5A059]" />
                </div>
                <div className="lg:col-span-7 space-y-6 text-[#E8E2D6]/80 text-sm font-light leading-relaxed">
                  <p>
                    At Aura Photo Studio, we believe that photography is far more than just light hitting a sensor. It is the art of pausing time, capturing the invisible magnetic fields of human emotion, and turning transient smiles into forever heirlooms.
                  </p>
                  <p>
                    Our approach is gentle, non-obtrusive, and deeply artistic. We seek the candid breath between poses, the sudden laugh, and the tears of absolute joy. Framed inside a high-contrast cinematic atmosphere, our works bring timeless luxury and raw storytelling directly to you.
                  </p>
                  <div className="pt-4 flex flex-wrap gap-8">
                    <div className="flex items-center gap-3">
                      <Award size={18} className="text-[#C5A059]" />
                      <span className="text-[11px] uppercase tracking-wider text-white">Award-Winning Editorial Style</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles size={18} className="text-[#C5A059]" />
                      <span className="text-[11px] uppercase tracking-wider text-white">Custom Tailored Retouching</span>
                    </div>
                  </div>

                  {/* Elegant Social/Contact Quick Connect Bar for First Page */}
                  <div className="pt-6 border-t border-white/5 flex flex-wrap gap-8 text-xs text-[#E8E2D6]/60">
                    <div className="flex items-center gap-2">
                      <Instagram size={14} className="text-[#C5A059]" />
                      <span>Instagram: <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#E8E2D6] hover:text-[#C5A059] transition-colors font-medium">@auraphotostudio</a></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-[#C5A059]" />
                      <span>WhatsApp/Call: <span className="text-[#E8E2D6] font-medium">1234567890</span></span>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: BEAUTIFUL QUOTES SECTION */}
              <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#0E0E0E] text-center px-6 relative border-b border-[#C5A059]/10 overflow-hidden" id="quotes-section">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
                <div className="max-w-3xl mx-auto space-y-8 relative z-10 py-8">
                  <div className="flex justify-center mb-2">
                    <Camera className="text-[#C5A059]/50 animate-pulse" size={28} />
                  </div>

                  <div className="min-h-[120px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={quoteIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                      >
                        <blockquote className="text-xl sm:text-2xl md:text-3xl font-light font-serif italic text-[#E8E2D6] leading-relaxed">
                          “{PHOTOGRAPHY_QUOTES[quoteIndex].text}”
                        </blockquote>
                        <cite className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium not-italic block mt-4">
                          — {PHOTOGRAPHY_QUOTES[quoteIndex].author}
                        </cite>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Manual quote selector dots */}
                  <div className="flex justify-center gap-2 mt-6">
                    {PHOTOGRAPHY_QUOTES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuoteIndex(idx)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${quoteIndex === idx ? 'bg-[#C5A059] w-4' : 'bg-white/20'}`}
                        aria-label={`Show quote ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </section>

            </motion.div>
          ) : (
            <motion.div
              key="about-contact-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              
              {/* PAGE 2 HEADER HERO */}
              <section className="relative h-[40vh] min-h-[280px] w-full flex items-center justify-center border-b border-[#C5A059]/10 bg-[#0C0C0C]">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-25" 
                  style={{ backgroundImage: `url(${PORTFOLIO_ITEMS[3].url})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                
                <div className="relative z-10 text-center space-y-4 px-6">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-semibold block">Aura Photo Studio</span>
                  <h1 className="text-4xl sm:text-5xl font-serif text-white font-light">Our Story & Booking Portal</h1>
                  <p className="text-xs max-w-md mx-auto text-[#E8E2D6]/70 tracking-widest uppercase">Connecting with your authentic light.</p>
                </div>
              </section>

              {/* ABOUT THE STUDIO */}
              <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 border-b border-[#C5A059]/10" id="about-studio">
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-semibold block">The Heart of Aura</span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-white font-light leading-snug">
                    Where passion meets <br />
                    <span className="italic text-[#C5A059]">technical perfection</span>.
                  </h2>
                  <div className="w-16 h-[1px] bg-[#C5A059]" />
                  
                  {/* Studio Stats Grid */}
                  <div className="grid grid-cols-3 gap-6 pt-6">
                    <div className="text-center border-r border-white/10 pr-4">
                      <span className="block text-2xl font-serif text-[#C5A059]">8+</span>
                      <span className="text-[8px] uppercase tracking-widest opacity-60">Years of Eye</span>
                    </div>
                    <div className="text-center border-r border-white/10 pr-4">
                      <span className="block text-2xl font-serif text-[#C5A059]">250+</span>
                      <span className="text-[8px] uppercase tracking-widest opacity-60">Weddings</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-2xl font-serif text-[#C5A059]">100%</span>
                      <span className="text-[8px] uppercase tracking-widest opacity-60">Happy Tears</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6 text-sm text-[#E8E2D6]/85 font-light leading-relaxed">
                  <p>
                    Aura Photo Studio was established in 2018 in the heart of New York with one single core mission: to reject generic posing and sterile photography in favor of true, cinematic, emotion-driven visual storytelling.
                  </p>
                  <p>
                    Our core team—consisting of founders Marcus Vance and Sasha Laurent—comes from fine art and editorial publishing backgrounds. This unique training allows us to sculpt soft shadows, frame stunning silhouettes, and balance warm, romantic tones in ways that make your photographs look like stills from an elegant film.
                  </p>
                  <p className="italic font-serif text-[#C5A059] text-base">
                    “We don’t just photograph how you look. We photograph how it felt.”
                  </p>
                </div>
              </section>

              {/* STUDIO DETAILS & CONTACT DETAILS BAR */}
              <section className="py-20 bg-[#0D0D0D] border-b border-[#C5A059]/10">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    
                    {/* Detail 1 */}
                    <div className="flex gap-5 items-start p-6 bg-black/40 border border-white/5 hover:border-[#C5A059]/30 transition-all duration-300">
                      <div className="p-3 bg-[#C5A059]/10 rounded-full text-[#C5A059]">
                        <MapPin size={20} />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-[#E8E2D6]/40 block">Studio Location</span>
                        <p className="text-sm font-medium text-white">Aura Photo Studio</p>
                        <p className="text-xs text-[#E8E2D6]/70">123 Artistry Lane, NY Studio 4B</p>
                      </div>
                    </div>

                    {/* Detail 2 */}
                    <div className="flex gap-5 items-start p-6 bg-black/40 border border-white/5 hover:border-[#C5A059]/30 transition-all duration-300">
                      <div className="p-3 bg-[#C5A059]/10 rounded-full text-[#C5A059]">
                        <Phone size={20} />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-[#E8E2D6]/40 block">Let's Talk</span>
                        <p className="text-sm font-medium text-white">1234567890</p>
                        <p className="text-xs text-[#E8E2D6]/70">Monday - Sunday, 9AM - 7PM</p>
                      </div>
                    </div>

                    {/* Detail 3 */}
                    <div className="flex gap-5 items-start p-6 bg-black/40 border border-white/5 hover:border-[#C5A059]/30 transition-all duration-300">
                      <div className="p-3 bg-[#C5A059]/10 rounded-full text-[#C5A059]">
                        <Instagram size={20} />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-[#E8E2D6]/40 block">Visual Socials</span>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-[#C5A059] transition-colors block">@auraphotostudio</a>
                        <p className="text-xs text-[#E8E2D6]/70">Direct Messages always open</p>
                      </div>
                    </div>

                  </div>

                  {/* Direct WhatsApp Action Bar */}
                  <div className="mt-10 p-6 bg-[#C5A059]/5 border border-[#C5A059]/20 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Phone size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-white font-semibold">Immediate Consultations?</h4>
                        <p className="text-[11px] text-[#E8E2D6]/70">Launch a live simulated conversation with Sash and Marcus right now.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowWhatsAppChat(true)}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[10px] uppercase tracking-widest transition-all inline-flex items-center gap-2"
                      id="whatsapp-chat-trigger"
                    >
                      <span>Simulate WhatsApp Chat</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* PRICING & PACKAGES (Optional helper before Booking) */}
              <section className="py-24 max-w-7xl mx-auto px-6 border-b border-[#C5A059]/10">
                <div className="text-center space-y-2 mb-16">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-medium block">Investment</span>
                  <h2 className="text-3xl font-serif text-white">Transparent Pricing Packages</h2>
                  <p className="text-xs text-[#E8E2D6]/60 max-w-md mx-auto leading-relaxed">No hidden fees, fully transparent art licensing. All packages include standard retouching.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PACKAGES.map((pkg) => (
                    <div 
                      key={pkg.id}
                      onClick={() => setBookingPackage(pkg.id)}
                      className={`p-8 bg-[#121212] border transition-all cursor-pointer flex flex-col justify-between min-h-[460px] ${
                        bookingPackage === pkg.id 
                          ? 'border-[#C5A059] ring-1 ring-[#C5A059]' 
                          : 'border-white/5 hover:border-[#C5A059]/40'
                      }`}
                    >
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm uppercase tracking-widest font-semibold text-[#E8E2D6]">{pkg.name}</h3>
                          {bookingPackage === pkg.id && (
                            <span className="bg-[#C5A059] text-black text-[7px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">Selected</span>
                          )}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-serif text-[#C5A059] font-light">{pkg.price}</span>
                          <span className="text-[10px] text-[#E8E2D6]/50 uppercase tracking-widest">/ flat rate</span>
                        </div>
                        
                        <ul className="space-y-3 pt-6 border-t border-white/5">
                          {pkg.features.map((feat, fidx) => (
                            <li key={fidx} className="flex items-start gap-3 text-xs text-[#E8E2D6]/80">
                              <Check size={14} className="text-[#C5A059] mt-0.5 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button 
                        type="button"
                        className={`w-full py-3 text-[9px] uppercase tracking-widest font-bold border mt-8 ${
                          bookingPackage === pkg.id
                            ? 'bg-[#C5A059] text-black border-[#C5A059]'
                            : 'bg-transparent text-[#C5A059] border-[#C5A059]/30 hover:border-[#C5A059]'
                        } transition-colors`}
                      >
                        Select This Package
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* CONTACT & BOOKING FORM SECTION */}
              <section className="py-24 bg-[#0A0A0A] relative" id="contact-form-section">
                <div className="max-w-4xl mx-auto px-6">
                  <div className="text-center space-y-3 mb-16">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-semibold block">Inquiry Portal</span>
                    <h2 className="text-3xl sm:text-4xl font-serif text-white font-light">Book Your Custom Session</h2>
                    <p className="text-xs text-[#E8E2D6]/60 max-w-sm mx-auto leading-relaxed">
                      Fill out our secure calendar form to block a physical date on our schedule. We will respond within 12 hours.
                    </p>
                    <div className="w-12 h-[1px] bg-[#C5A059] mx-auto" />
                  </div>

                  {/* Main Booking Form */}
                  <form onSubmit={handleBookingSubmit} className="bg-[#121212] border border-[#C5A059]/10 p-8 sm:p-12 space-y-8 shadow-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label htmlFor="form-name" className="text-[10px] uppercase tracking-widest text-[#E8E2D6]/60 block font-medium">Your Full Name *</label>
                        <input
                          id="form-name"
                          type="text"
                          required
                          placeholder="Elizabeth Bennet"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A059] transition-colors"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="space-y-2">
                        <label htmlFor="form-phone" className="text-[10px] uppercase tracking-widest text-[#E8E2D6]/60 block font-medium">Phone Number *</label>
                        <input
                          id="form-phone"
                          type="tel"
                          required
                          placeholder="+1 (555) 019-2834"
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C5A059] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                      {/* Event Type */}
                      <div className="space-y-2">
                        <label htmlFor="form-event" className="text-[10px] uppercase tracking-widest text-[#E8E2D6]/60 block font-medium">Session / Event Type</label>
                        <select
                          id="form-event"
                          value={bookingEventType}
                          onChange={(e) => setBookingEventType(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 px-3 py-3.5 text-xs text-[#E8E2D6] focus:outline-none focus:border-[#C5A059] transition-colors"
                        >
                          <option value="wedding">Wedding Shoot</option>
                          <option value="couple">Couple Session</option>
                          <option value="portrait">Creative Portrait</option>
                          <option value="event">Corporate or Event</option>
                        </select>
                      </div>

                      {/* Date selection */}
                      <div className="space-y-2">
                        <label htmlFor="form-date" className="text-[10px] uppercase tracking-widest text-[#E8E2D6]/60 block font-medium">Preferred Date *</label>
                        <input
                          id="form-date"
                          type="date"
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A059] transition-colors"
                        />
                      </div>

                      {/* Package selection */}
                      <div className="space-y-2">
                        <label htmlFor="form-package" className="text-[10px] uppercase tracking-widest text-[#E8E2D6]/60 block font-medium">Package Tier</label>
                        <select
                          id="form-package"
                          value={bookingPackage}
                          onChange={(e) => setBookingPackage(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 px-3 py-3.5 text-xs text-[#E8E2D6] focus:outline-none focus:border-[#C5A059] transition-colors"
                        >
                          <option value="classic">Classic Session ($350)</option>
                          <option value="cinematic">Cinematic Storytelling ($550)</option>
                          <option value="wedding">Ethereal Wedding Day ($2,200)</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="form-message" className="text-[10px] uppercase tracking-widest text-[#E8E2D6]/60 block font-medium">Tell us your vision (optional)</label>
                      <textarea
                        id="form-message"
                        rows={4}
                        placeholder="Tell us about your theme, location ideas, or preferred lighting styling..."
                        value={bookingMessage}
                        onChange={(e) => setBookingMessage(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 p-4 text-sm text-white focus:outline-none focus:border-[#C5A059] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#C5A059] hover:bg-white text-black font-semibold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:translate-y-[-1px]"
                      id="form-submit-btn"
                    >
                      <Sparkles size={14} />
                      <span>Request Booking Reservation</span>
                    </button>
                  </form>
                </div>
              </section>

              {/* LOCAL BOOKING HISTORY / DASHBOARD */}
              {bookings.length > 0 && (
                <section className="py-24 bg-[#0D0D0D] border-t border-[#C5A059]/10" id="booking-history-section">
                  <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-10">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium block">Tracking Center</span>
                        <h3 className="text-xl font-serif text-white">Your Sent Booking Requests</h3>
                      </div>
                      <button
                        onClick={() => {
                          if(confirm('Are you sure you want to clear your local booking history?')) {
                            setBookings([]);
                            localStorage.removeItem('aura_bookings');
                          }
                        }}
                        className="text-[9px] uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
                      >
                        Clear History
                      </button>
                    </div>

                    <div className="space-y-4">
                      {bookings.map((b) => (
                        <div key={b.id} className="bg-black/80 border border-white/5 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono text-[#C5A059] font-semibold">{b.id}</span>
                              <span className="text-[9px] uppercase tracking-wider text-[#E8E2D6]/40">• {b.createdAt}</span>
                            </div>
                            <h4 className="text-sm font-semibold text-white">{b.name}</h4>
                            <p className="text-xs text-[#E8E2D6]/70">
                              <span className="text-[#C5A059] capitalize">{b.eventType} shoot</span> scheduled for <strong className="text-white">{b.date}</strong>
                            </p>
                            {b.message && (
                              <p className="text-[11px] text-[#E8E2D6]/50 italic">" {b.message} "</p>
                            )}
                          </div>

                          <div className="flex flex-col items-start sm:items-end gap-2">
                            <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 rounded-full flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                              {b.status}
                            </span>
                            <span className="text-[9px] text-[#E8E2D6]/40">Lead Assigned: Marcus V.</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* PORTFOLIO / WORK SECTION (Relocated to the end of the page) */}
              <section className="py-24 max-w-7xl mx-auto px-6 border-t border-[#C5A059]/10" id="full-portfolio">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#C5A059] font-medium block">Visual Archive</span>
                    <h2 className="text-3xl font-serif text-white">Full Gallery & Creative Edits</h2>
                  </div>

                  {/* Category switcher */}
                  <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-widest mt-6 md:mt-0">
                    {(['all', 'wedding', 'couple', 'portrait', 'event'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setPortfolioFilter(cat)}
                        className={`px-4 py-2 border ${
                          portfolioFilter === cat 
                            ? 'bg-[#C5A059] text-black border-[#C5A059]' 
                            : 'bg-transparent text-[#E8E2D6] border-white/10 hover:border-[#C5A059]/40'
                        } transition-colors`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid of All Work */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredPortfolio.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden bg-[#161616] aspect-[3/4] border border-white/5 cursor-pointer"
                      onClick={() => setSelectedImage(item)}
                    >
                      <img 
                        src={item.url} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
                        <span className="text-[8px] uppercase tracking-widest text-[#C5A059] mb-1">{item.category}</span>
                        <h4 className="text-sm font-serif text-white">{item.title}</h4>
                        <p className="text-[9px] text-[#E8E2D6]/60 mt-1">{item.location}</p>
                      </div>
                      <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-[7px] uppercase tracking-widest text-[#C5A059] border border-white/5">
                        {item.id.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#050505] border-t border-[#C5A059]/10 py-12 text-[#E8E2D6]/60">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          
          <div className="text-center md:text-left">
            <span className="text-lg font-light tracking-[0.4em] uppercase text-[#C5A059]">AURA</span>
            <span className="text-[8px] tracking-[0.5em] uppercase block opacity-50">© 2026 Aura Design Collective</span>
          </div>

          <div className="flex justify-center gap-6 text-[9px] uppercase tracking-[0.3em]">
            <span className="hover:text-[#C5A059] transition-colors cursor-pointer">Luxurious</span>
            <span className="hover:text-[#C5A059] transition-colors cursor-pointer">Cinematic</span>
            <span className="hover:text-[#C5A059] transition-colors cursor-pointer">Timeless</span>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-[#C5A059]">123 Artistry Lane, NY Studio 4B</p>
            <p className="text-[9px] opacity-40">Crafted with pristine layout and aesthetic devotion.</p>
          </div>

        </div>
      </footer>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-[#121212] border border-[#C5A059]/20 max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/10 hover:border-[#C5A059] hover:text-[#C5A059] transition-all flex items-center justify-center text-white"
                id="close-lightbox"
              >
                <X size={16} />
              </button>

              {/* Lightbox Image left pane */}
              <div className="md:col-span-7 bg-[#0A0A0A] aspect-[4/3] md:aspect-auto md:h-[550px]">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lightbox Content right pane */}
              <div className="md:col-span-5 p-8 flex flex-col justify-between bg-gradient-to-b from-[#121212] to-black">
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.4em] text-[#C5A059] font-semibold">{selectedImage.category}</span>
                    <h3 className="text-2xl font-serif text-white font-light mt-1">{selectedImage.title}</h3>
                    <div className="w-10 h-[1px] bg-[#C5A059] mt-3" />
                  </div>

                  <p className="text-xs text-[#E8E2D6]/80 leading-relaxed font-light">
                    {selectedImage.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-xs">
                      <MapPin size={12} className="text-[#C5A059]" />
                      <span className="text-[#E8E2D6]/70">{selectedImage.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <Camera size={12} className="text-[#C5A059]" />
                      <span className="text-[#E8E2D6]/70">Captured by {selectedImage.photographer}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.2em] opacity-40">Portfolio Collection 2026</span>
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setCurrentPage('about-contact');
                      setTimeout(() => {
                        setBookingEventType(selectedImage.category);
                        document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
                      }, 200);
                    }}
                    className="text-[10px] uppercase tracking-widest text-[#C5A059] hover:text-white transition-colors font-semibold flex items-center gap-2"
                  >
                    <span>Request Similar Shoot</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESS RESERVATION MODAL */}
      <AnimatePresence>
        {showBookingSuccess && latestBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95 }}
              className="bg-[#121212] border border-[#C5A059] max-w-lg w-full p-8 relative shadow-2xl space-y-6"
            >
              <button
                onClick={() => setShowBookingSuccess(false)}
                className="absolute top-4 right-4 text-white/50 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h3 className="text-xl font-serif text-white font-semibold">Reservation Request Sent!</h3>
                <p className="text-xs text-[#E8E2D6]/60">We have temporarily blocked out your preferred date on our studio calendar.</p>
              </div>

              {/* Beautiful Luxury Ticket Layout */}
              <div className="bg-black/60 border border-white/5 p-5 space-y-4 font-mono text-[11px] text-left">
                <div className="flex justify-between pb-3 border-b border-[#C5A059]/20">
                  <span className="text-[#C5A059]">TICKET REF:</span>
                  <span className="text-white font-bold">{latestBooking.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#E8E2D6]/40 block">CLIENT NAME:</span>
                    <span className="text-white block font-medium">{latestBooking.name}</span>
                  </div>
                  <div>
                    <span className="text-[#E8E2D6]/40 block">SHOOT DATE:</span>
                    <span className="text-white block font-medium">{latestBooking.date}</span>
                  </div>
                  <div>
                    <span className="text-[#E8E2D6]/40 block">EVENT TYPE:</span>
                    <span className="text-white block font-medium uppercase">{latestBooking.eventType}</span>
                  </div>
                  <div>
                    <span className="text-[#E8E2D6]/40 block">STATUS:</span>
                    <span className="text-amber-400 block font-bold">RESERVED</span>
                  </div>
                </div>
                <div className="pt-2 text-[10px] text-center text-[#C5A059]/80 border-t border-white/5">
                  Our coordinator will phone you at {latestBooking.phone} shortly.
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowBookingSuccess(false)}
                  className="flex-1 py-3 bg-[#C5A059] text-black text-[10px] uppercase tracking-widest font-bold"
                >
                  Return to Studio
                </button>
                <button
                  onClick={() => {
                    setShowBookingSuccess(false);
                    setShowWhatsAppChat(true);
                  }}
                  className="flex-1 py-3 bg-transparent border border-white/20 hover:border-emerald-500 hover:text-emerald-400 text-xs text-white"
                >
                  WhatsApp Support
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING SIMULATED WHATSAPP CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {showWhatsAppChat ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-[#121212] border border-[#C5A059]/20 w-80 h-96 flex flex-col shadow-2xl overflow-hidden"
              id="whatsapp-chat-box"
            >
              {/* Header */}
              <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-black/30 flex items-center justify-center text-xs font-bold text-[#C5A059]">
                      AURA
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-800 rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold">Aura Photo Studio</h4>
                    <span className="text-[9px] opacity-70">Usually replies within minutes</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowWhatsAppChat(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Chat Message Window */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-contain bg-slate-900 bg-opacity-95">
                {chatHistory.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <div 
                      className={`p-3 text-xs rounded-lg ${
                        msg.sender === 'user' 
                          ? 'bg-[#C5A059] text-black rounded-tr-none' 
                          : 'bg-zinc-800 text-white rounded-tl-none border border-white/5'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[8px] opacity-40 mt-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Input Footer Form */}
              <form onSubmit={handleSendWhatsApp} className="p-3 bg-zinc-950 border-t border-white/5 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a WhatsApp message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-white/10 px-3 py-2 text-xs text-white rounded focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded flex items-center justify-center transition-colors shrink-0"
                >
                  <Send size={14} />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setShowWhatsAppChat(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center relative group"
              id="whatsapp-chat-badge"
              aria-label="Simulate WhatsApp Chat"
            >
              <Phone size={22} className="animate-pulse" />
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/85 text-white border border-[#C5A059]/20 text-[8px] uppercase tracking-widest px-2.5 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                WhatsApp Studio Chat
              </span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0A0A0A]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
