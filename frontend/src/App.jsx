// // //  ----------- MAIN VERSION------------
// import { useState } from 'react'
// import { Search, ShoppingBag, ExternalLink, TrendingDown, AlertCircle, Loader2 } from 'lucide-react'

// function App() {
//   const [query, setQuery] = useState('')
//   const [pairs, setPairs] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [searched, setSearched] = useState(false)

//   const search = async (e) => {
//     e.preventDefault()
//     if(!query) return
//     setLoading(true)
//     setSearched(true)
//     setPairs([])
    
//     try {
//       const res = await fetch(`http://localhost:3001/search?q=${query}`)
//       const data = await res.json()
//       setPairs(data)
//     } catch (err) {
//       console.error(err)
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
      
//       {/* --- HEADER (Glassmorphism) --- */}
//       <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
//         <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          
//           {/* Logo */}
//           <div className="flex items-center gap-2 flex-shrink-0">
//             <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-lg shadow-lg shadow-blue-500/30">
//               <TrendingDown size={24} strokeWidth={2.5} />
//             </div>
//             <h1 className="text-xl font-extrabold tracking-tight text-slate-800 hidden sm:block">
//               Price<span className="text-blue-600">Hunt</span>
//             </h1>
//           </div>

//           {/* Search Bar */}
//           <form onSubmit={search} className="flex-1 max-w-2xl relative group">
//             <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
//               <Search size={20} />
//             </div>
//             <input 
//               type="text" 
//               className="w-full bg-slate-100 border-2 border-transparent focus:bg-white focus:border-blue-500 rounded-full py-3 pl-12 pr-4 outline-none transition-all shadow-inner focus:shadow-lg focus:shadow-blue-100/50 placeholder:text-slate-400 font-medium"
//               placeholder="Paste a product name (e.g. iPhone 15 128GB)"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <button 
//               disabled={loading}
//               className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white px-6 rounded-full font-bold text-sm hover:bg-slate-800 disabled:bg-slate-400 transition-all shadow-md"
//             >
//               {loading ? <Loader2 size={18} className="animate-spin" /> : 'Compare'}
//             </button>
//           </form>

//         </div>
//       </div>

//       {/* --- CONTENT AREA --- */}
//       <div className="max-w-5xl mx-auto px-4 py-8 pb-24">
        
//         {/* Loading Skeleton */}
//         {loading && (
//           <div className="space-y-4 animate-pulse">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="h-48 bg-white rounded-2xl border border-slate-100"></div>
//             ))}
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && pairs.length === 0 && !searched && (
//           <div className="text-center py-20">
//             <div className="inline-flex bg-white p-6 rounded-full shadow-xl shadow-slate-200/50 mb-6">
//               <ShoppingBag size={48} className="text-blue-500" />
//             </div>
//             <h2 className="text-2xl font-bold text-slate-800 mb-2">Start Saving Money</h2>
//             <p className="text-slate-500 max-w-md mx-auto">Search for any electronic, gadget, or appliance to instantly compare prices between Amazon and Flipkart.</p>
//           </div>
//         )}

//         {/* Results */}
//         <div className="space-y-6">
//           {pairs.map((pair, idx) => (
//             <ComparisonCard key={idx} pair={pair} />
//           ))}
          
//           {!loading && searched && pairs.length === 0 && (
//              <div className="text-center py-12 text-slate-400">
//                <AlertCircle size={40} className="mx-auto mb-3 opacity-50" />
//                <p>No matches found. Try a simpler search term.</p>
//              </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// // --- SUB-COMPONENT: THE COMPARISON CARD ---
// function ComparisonCard({ pair }) {
//   // Parse prices to numbers for calculation (Remove ₹ and commas)
//   const getPrice = (pStr) => parseInt(pStr.replace(/[₹,]/g, '')) || 0
  
//   const amzPrice = getPrice(pair.amazon.price)
//   const flpPrice = pair.flipkart ? getPrice(pair.flipkart.price) : 0
  
//   let winner = null
//   let diff = 0
//   let percent = 0

//   if (pair.flipkart && amzPrice > 0 && flpPrice > 0) {
//     if (amzPrice < flpPrice) {
//       winner = 'amazon'
//       diff = flpPrice - amzPrice
//       percent = Math.round((diff / flpPrice) * 100)
//     } else if (flpPrice < amzPrice) {
//       winner = 'flipkart'
//       diff = amzPrice - flpPrice
//       percent = Math.round((diff / amzPrice) * 100)
//     }
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 group">
      
//       {/* Match Header */}
//       <div className="bg-slate-50 border-b border-slate-100 px-4 py-2 flex justify-between items-center">
//         <div className="flex items-center gap-2">
//           <div className={`w-2 h-2 rounded-full ${pair.score > 80 ? 'bg-green-500' : 'bg-orange-400'}`}></div>
//           <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
//             Match Confidence: {pair.score}%
//           </span>
//         </div>
//         {winner && (
//           <span className="text-xs font-bold text-white bg-green-500 px-2 py-1 rounded-full shadow-sm animate-pulse">
//             Save ₹{diff.toLocaleString()} ({percent}%)
//           </span>
//         )}
//       </div>

//       <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 relative">
        
//         {/* VS Badge (Absolute Center) */}
//         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 bg-slate-900 text-white font-black italic rounded-full shadow-lg border-4 border-white text-xs">
//           VS
//         </div>

//         {/* LEFT: AMAZON */}
//         <ProductSide 
//           store="Amazon" 
//           data={pair.amazon} 
//           isCheaper={winner === 'amazon'} 
//           theme="yellow"
//         />

//         {/* RIGHT: FLIPKART */}
//         <ProductSide 
//           store="Flipkart" 
//           data={pair.flipkart} 
//           isCheaper={winner === 'flipkart'} 
//           theme="blue"
//         />

//       </div>
//     </div>
//   )
// }

// function ProductSide({ store, data, isCheaper, theme }) {
//   if (!data) return (
//     <div className="p-8 flex flex-col items-center justify-center text-slate-300 bg-slate-50/50 h-full">
//       <AlertCircle size={32} className="mb-2" />
//       <p className="text-sm font-medium">Not available on {store}</p>
//     </div>
//   )

//   const isAmz = theme === 'yellow'
//   const btnClass = isAmz 
//     ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-orange-200" 
//     : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-blue-200"

//   return (
//     <div className={`p-6 flex flex-col h-full transition-colors ${isCheaper ? 'bg-green-50/30' : ''}`}>
      
//       {/* Header Badge */}
//       <div className="flex justify-between items-start mb-4">
//         <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isAmz ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
//           {store}
//         </span>
//         {isCheaper && (
//           <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
//             <TrendingDown size={12} /> Best Price
//           </span>
//         )}
//       </div>

//       {/* Image */}
//       <div className="h-40 mb-4 flex items-center justify-center p-2 bg-white rounded-xl border border-slate-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
//         <img src={data.image} alt={data.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
//       </div>

//       {/* Title */}
//       <h3 className="font-medium text-slate-700 text-sm line-clamp-2 mb-4 flex-1 leading-relaxed" title={data.name}>
//         {data.name}
//       </h3>

//       {/* Price & Action */}
//       <div className="mt-auto pt-4 border-t border-slate-100/50 flex items-end justify-between gap-3">
//         <div className="flex flex-col">
//           <span className="text-xs text-slate-400 font-medium">Current Price</span>
//           <span className={`text-2xl font-bold ${isCheaper ? 'text-green-600' : 'text-slate-900'}`}>
//             {data.price}
//           </span>
//         </div>
        
//         <a 
//           href={data.link} 
//           target="_blank" 
//           rel="noreferrer"
//           className={`px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-opacity-50 flex items-center gap-2 transition-all active:scale-95 ${btnClass}`}
//         >
//           Buy <ExternalLink size={14} />
//         </a>
//       </div>
//     </div>
//   )
// }

// export default App

// // ------------- MAIN VERSION  END ---------------


// //  ----------- new VERSION ------------

// import React, { useState, useEffect } from 'react'
// import { Search, TrendingDown, AlertCircle, Loader2, Sparkles, Home, Zap, ShieldCheck, Smartphone, Star, Twitter, Instagram, Facebook, ArrowRight } from 'lucide-react'

// // --- MOCK DATA (Fallback) ---
// const DEMO_RESULTS = [
//   {
//     score: 95,
//     amazon: { 
//       name: "Apple iPhone 15 (128 GB) - Black", 
//       price: "₹72,999", 
//       image: "https://m.media-amazon.com/images/I/71657TiFeHL._SX679_.jpg", 
//       link: "#" 
//     },
//     flipkart: { 
//       name: "Apple iPhone 15 (Black, 128 GB)", 
//       price: "₹66,999", 
//       link: "#" 
//     }
//   },
//   {
//     score: 92,
//     amazon: { 
//       name: "Sony WH-1000XM5 Wireless Noise Cancelling", 
//       price: "₹26,990", 
//       image: "https://m.media-amazon.com/images/I/51SKmu2G9FL._SL1200_.jpg", 
//       link: "#" 
//     },
//     flipkart: { 
//       name: "SONY WH-1000XM5 Bluetooth Headset", 
//       price: "₹24,990", 
//       link: "#" 
//     }
//   },
//   {
//     score: 88,
//     amazon: { 
//       name: "MacBook Air M2 (2023) - Midnight", 
//       price: "₹99,900", 
//       image: "https://m.media-amazon.com/images/I/710TJuHTMhL._SX679_.jpg", 
//       link: "#" 
//     },
//     flipkart: { 
//       name: "APPLE 2023 MacBook Air M2", 
//       price: "₹96,990", 
//       link: "#" 
//     }
//   }
// ]

// // --- COMPONENT: ANIMATED NUMBER COUNTER ---
// const AnimatedNumber = ({ value }) => {
//     const [count, setCount] = useState(0);
//     const numericValue = parseInt(value.toString().replace(/[₹,]/g, '')) || 0;
  
//     useEffect(() => {
//       let start = 0;
//       const duration = 1000; // 1 second animation
//       const incrementTime = 20;
//       const step = numericValue / (duration / incrementTime);
  
//       const timer = setInterval(() => {
//         start += step;
//         if (start >= numericValue) {
//           setCount(numericValue);
//           clearInterval(timer);
//         } else {
//           setCount(Math.ceil(start));
//         }
//       }, incrementTime);
  
//       return () => clearInterval(timer);
//     }, [numericValue]);
  
//     return <span>₹{count.toLocaleString()}</span>;
// };

// function App() {
//   const [query, setQuery] = useState('')
//   const [pairs, setPairs] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [searched, setSearched] = useState(false)
//   const [isTransitioning, setIsTransitioning] = useState(false)

//   const search = async (e) => {
//     e.preventDefault()
//     if(!query) return

//     setLoading(true)
//     setIsTransitioning(true)

//     setTimeout(async () => {
//         setSearched(true) 
//         setIsTransitioning(false)
//         setPairs([])
        
//         try {
//           const res = await fetch(`http://localhost:3001/search?q=${query}`)
//           const data = await res.json()
//           setPairs(data)
//         } catch (err) {
//           // Fallback for demo purposes
//           setTimeout(() => {
//              setPairs(DEMO_RESULTS) 
//           }, 1500)
//         }
//         setLoading(false)
//     }, 500)
//   }

//   const goHome = () => {
//     setIsTransitioning(true)
//     setTimeout(() => {
//         setSearched(false)
//         setQuery('')
//         setPairs([])
//         setIsTransitioning(false)
//     }, 400)
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 relative overflow-x-hidden">
      
//       {/* --- INJECTED CUSTOM STYLES --- */}
//       <style>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         @keyframes float {
//             0%, 100% { transform: translateY(0px); }
//             50% { transform: translateY(-15px); }
//         }
//         @keyframes shimmer {
//           100% { transform: translateX(100%); }
//         }
//         @keyframes slideUpFade {
//           from { transform: translateY(30px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//         @keyframes popIn {
//           from { transform: scale(0.5); opacity: 0; }
//           to { transform: scale(1); opacity: 1; }
//         }
//         @keyframes shine {
//             0% { left: -100%; }
//             100% { left: 200%; }
//         }
//         @keyframes scroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-blob { animation: blob 7s infinite; }
//         .animate-float { animation: float 6s ease-in-out infinite; }
//         .animate-delay-2000 { animation-delay: 2s; }
//         .animate-delay-4000 { animation-delay: 4s; }
//         .animate-shimmer { animation: shimmer 1.5s infinite; }
//         .animate-slideUp { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//         .animate-popIn { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
//         .animate-scroll { animation: scroll 40s linear infinite; }
        
//         .btn-shine { position: relative; overflow: hidden; }
//         .btn-shine::after {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: -100%;
//             width: 50%;
//             height: 100%;
//             background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
//             transform: skewX(-25deg);
//             transition: 0.5s;
//         }
//         .btn-shine:hover::after {
//             animation: shine 0.75s;
//         }
//       `}</style>

//       {/* --- BACKGROUND BLOB ANIMATION --- */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-blue-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter" />
//         <div className="absolute top-[-10%] right-[-10%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-purple-400/20 rounded-full blur-3xl animate-blob animate-delay-2000 mix-blend-multiply filter" />
//         <div className="absolute bottom-[-20%] left-[20%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-pink-400/20 rounded-full blur-3xl animate-blob animate-delay-4000 mix-blend-multiply filter" />
//       </div>

//       {/* ================= VIEW 1: HOME PAGE ================= */}
//       {!searched ? (
//         <div className={`relative z-10 flex flex-col min-h-screen transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
          
//           {/* Hero Section */}
//           <div className="flex-1 flex flex-col items-center justify-center p-4 pt-20 pb-12">
//             <div className="w-full max-w-3xl text-center space-y-8 mb-12">
              
//               {/* Floating Logo */}
//               <div className="flex flex-col items-center justify-center gap-4 animate-float">
//                 <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-6 rounded-3xl shadow-2xl shadow-indigo-500/40 rotate-12 hover:rotate-0 transition-all duration-500 cursor-pointer border-4 border-white/20 backdrop-blur-md">
//                   <TrendingDown size={56} strokeWidth={2.5} />
//                 </div>
//                 <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 drop-shadow-sm">
//                   Price<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Hunt</span>
//                 </h1>
//                 <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
//                   The smart way to shop. Compare Amazon & Flipkart <span className="text-indigo-600 font-bold">instantly</span>.
//                 </p>
//               </div>

//               {/* --- REDESIGNED SEARCH BAR --- */}
//               <form onSubmit={search} className="relative group max-w-xl mx-auto w-full z-20 transform hover:-translate-y-1 transition-transform duration-300">
//                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                
//                 <div className="relative flex items-center bg-white p-2 rounded-full shadow-2xl shadow-indigo-500/20 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300">
//                     <div className="pl-4 text-slate-400">
//                         <Search size={24} />
//                     </div>
//                     <input 
//                         type="text" 
//                         className="w-full bg-transparent border-none outline-none py-3 px-4 text-lg text-slate-800 placeholder:text-slate-400 font-medium"
//                         placeholder="Paste product name..."
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                         autoFocus
//                     />
//                     <button 
//                         type="submit"
//                         className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 btn-shine flex-shrink-0"
//                     >
//                         Search
//                     </button>
//                 </div>
//               </form>
//             </div>

//             {/* --- BRAND TICKER --- */}
//             <div className="w-full max-w-4xl overflow-hidden mb-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
//                <div className="flex w-[200%] animate-scroll">
//                  {[...Array(2)].map((_, i) => (
//                    <div key={i} className="flex justify-around w-1/2 gap-8 items-center text-xl font-black text-slate-400 tracking-widest">
//                       <span>APPLE</span><span>SAMSUNG</span><span>SONY</span><span>ONEPLUS</span><span>DELL</span><span>BOSE</span><span>NIKE</span><span>ADIDAS</span>
//                    </div>
//                  ))}
//                </div>
//             </div>

//             {/* --- FEATURES SECTION --- */}
//             <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
//               <FeatureCard 
//                 icon={<Zap size={28} />}
//                 title="Lightning Fast"
//                 desc="Get real-time price comparisons in milliseconds. No more tab switching."
//                 delay="0.1s"
//               />
//               <FeatureCard 
//                 icon={<ShieldCheck size={28} />}
//                 title="Trusted Sellers"
//                 desc="We only fetch prices from verified sellers to ensure you get genuine products."
//                 delay="0.2s"
//               />
//               <FeatureCard 
//                 icon={<Smartphone size={28} />}
//                 title="Mobile Ready"
//                 desc="Optimized for every screen. Shop smartly from your phone, tablet or desktop."
//                 delay="0.3s"
//               />
//             </div>
            
//             {/* --- TESTIMONIALS --- */}
//             <div className="mt-24 w-full max-w-5xl px-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
//               <div className="text-center mb-10">
//                 <h2 className="text-2xl font-bold text-slate-800">Loved by smart shoppers</h2>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <TestimonialCard 
//                   name="Rahul Sharma" 
//                   role="Tech Enthusiast"
//                   text="I almost bought a Sony XM5 for ₹29k on Amazon. PriceHunt found it for ₹24k on Flipkart instantly. Saved ₹5k in seconds!"
//                 />
//                 <TestimonialCard 
//                   name="Priya Patel" 
//                   role="Gadget Reviewer"
//                   text="The UI is so clean and the comparison is dead accurate. It's now my default tab before buying any tech online."
//                 />
//               </div>
//             </div>

//           </div>

//           {/* --- RESTORED FOOTER WITH LINKS --- */}
//           <footer className="bg-white/50 backdrop-blur-lg border-t border-slate-200 py-12 mt-12">
//             <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
//                <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
//                   <div className="bg-slate-900 text-white p-1.5 rounded-lg">
//                     <TrendingDown size={16} strokeWidth={2.5} />
//                   </div>
//                   <span className="font-bold text-slate-800 text-lg">PriceHunt</span>
//                </div>
               
//                {/* Added Links Back */}
//                <div className="flex gap-8 text-sm font-medium text-slate-500">
//                  <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
//                  <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
//                  <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
//                </div>

//                <div className="flex gap-4">
//                  <SocialIcon icon={<Twitter size={16}/>} />
//                  <SocialIcon icon={<Instagram size={16}/>} />
//                  <SocialIcon icon={<Facebook size={16}/>} />
//                </div>
//             </div>
//             <div className="text-center text-slate-400 text-xs mt-8">
//               © 2024 PriceHunt Inc. Made with ❤️ for savings.
//             </div>
//           </footer>

//         </div>
//       ) : (
        
//         /* ================= VIEW 2: RESULTS PAGE ================= */
//         <div className={`transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          
//           {/* Sticky Header */}
//           <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
//             <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
              
//               <div onClick={goHome} className="flex items-center gap-2 flex-shrink-0 cursor-pointer group">
//                 <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:rotate-180">
//                   <TrendingDown size={24} strokeWidth={2.5} />
//                 </div>
//                 <h1 className="text-xl font-extrabold tracking-tight text-slate-800 hidden sm:block">
//                   Price<span className="text-indigo-600">Hunt</span>
//                 </h1>
//               </div>

//               {/* Compact Search Bar (Slightly modified to match new style) */}
//               <form onSubmit={search} className="flex-1 max-w-md relative group z-20">
//                 <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300">
//                   <Search size={18} />
//                 </div>
//                 <input 
//                   type="text" 
//                   className="w-full bg-slate-100/50 hover:bg-white border-2 border-transparent focus:bg-white focus:border-indigo-500 rounded-full py-2 pl-10 pr-12 outline-none transition-all duration-300 shadow-inner focus:shadow-xl focus:shadow-indigo-500/10 placeholder:text-slate-400 font-medium text-sm"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                 />
//                  <button 
//                     disabled={loading}
//                     className="absolute right-1.5 top-1.5 bottom-1.5 bg-slate-900 text-white px-3 rounded-full font-bold text-xs hover:bg-indigo-600 disabled:bg-slate-400 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 flex items-center"
//                   >
//                     {loading ? <Loader2 size={12} className="animate-spin" /> : <Search size={12} />}
//                   </button>
//               </form>
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="max-w-5xl mx-auto px-4 py-12 pb-32 relative z-10">
            
//             {/* Loading Skeletons */}
//             {loading && (
//               <div className="space-y-6">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="h-56 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm overflow-hidden relative animate-pulse" style={{animationDelay: `${i*150}ms`}}>
//                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Results */}
//             <div className="space-y-8">
//               {pairs.map((pair, idx) => (
//                 <div 
//                   key={idx} 
//                   className="animate-slideUp" 
//                   style={{ animationDelay: `${idx * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}
//                 >
//                   <ComparisonCard pair={pair} />
//                 </div>
//               ))}
//             </div>

//             {/* No Results */}
//             {!loading && pairs.length === 0 && (
//               <div className="text-center py-24 text-slate-400 bg-white/40 backdrop-blur-md rounded-3xl border-2 border-dashed border-slate-300 animate-popIn">
//                 <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <AlertCircle size={40} className="text-slate-400" />
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-700 mb-2">No matches found</h3>
//                 <p className="mb-8">We couldn't find any products matching "{query}"</p>
//                 <button onClick={goHome} className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center justify-center gap-2 mx-auto transition-all hover:gap-4">
//                   <Home size={18} /> Back to Home
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// // --- FEATURE CARD COMPONENT ---
// function FeatureCard({ icon, title, desc, delay }) {
//   return (
//     <div 
//       className="bg-white/70 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-slideUp cursor-default"
//       style={{ animationDelay: delay, animationFillMode: 'forwards', opacity: 0 }}
//     >
//       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-md mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
//       <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
//     </div>
//   )
// }

// // --- SOCIAL ICON COMPONENT ---
// function SocialIcon({icon}) {
//     return (
//         <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 hover:-translate-y-1 transition-all cursor-pointer">
//             {icon}
//         </div>
//     )
// }

// // --- TESTIMONIAL CARD COMPONENT ---
// function TestimonialCard({ name, role, text }) {
//   return (
//     <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
//        <div className="flex items-center gap-1 text-yellow-400 mb-4">
//           {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" className="drop-shadow-sm" />)}
//        </div>
//        <p className="text-slate-600 text-base leading-relaxed mb-6 italic">"{text}"</p>
//        <div className="flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-inner">
//             {name.charAt(0)}
//           </div>
//           <div>
//             <div className="text-sm font-bold text-slate-900">{name}</div>
//             <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{role}</div>
//           </div>
//        </div>
//     </div>
//   )
// }

// // --- COMPARISON CARD COMPONENT ---
// function ComparisonCard({ pair }) {
//   const getPrice = (pStr) => {
//     if (!pStr) return 0;
//     return parseInt(pStr.toString().replace(/[₹,]/g, '')) || 0
//   }
  
//   const amzPrice = getPrice(pair.amazon?.price)
//   const flpPrice = getPrice(pair.flipkart?.price)
  
//   let winner = null
//   let diff = 0
//   let percent = 0

//   if (pair.flipkart && amzPrice > 0 && flpPrice > 0) {
//     if (amzPrice < flpPrice) {
//       winner = 'amazon'
//       diff = flpPrice - amzPrice
//       percent = Math.round((diff / flpPrice) * 100)
//     } else if (flpPrice < amzPrice) {
//       winner = 'flipkart'
//       diff = amzPrice - flpPrice
//       percent = Math.round((diff / amzPrice) * 100)
//     }
//   }

//   return (
//     <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-white overflow-hidden group relative hover:-translate-y-1 transition-all duration-500">
      
//       {/* Decorative Bar */}
//       <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 via-indigo-500 to-blue-500 opacity-80"></div>

//       {/* Header */}
//       <div className="px-8 py-4 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
//         <div className="flex items-center gap-3">
//           <div className="flex gap-1">
//             {[1,2,3,4,5].map(dot => (
//               <div key={dot} className={`w-2 h-2 rounded-full transition-all duration-500 ${dot <= (pair.score/20) ? 'bg-indigo-500 scale-110' : 'bg-slate-200'}`} />
//             ))}
//           </div>
//           <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-2">
//             {pair.score || 90}% Match
//           </span>
//         </div>
//         {winner && (
//           <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold border border-green-200 shadow-sm animate-pulse">
//             <Sparkles size={14} className="fill-current" />
//             Save <AnimatedNumber value={diff} /> ({percent}%)
//           </div>
//         )}
//       </div>

//       <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 relative">
        
//         {/* Animated VS Badge */}
//         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex animate-popIn" style={{animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards'}}>
//           <div className="relative group-hover:scale-125 transition-transform duration-300">
//             <div className="absolute inset-0 bg-slate-900 blur-md opacity-30 rounded-full"></div>
//             <div className="w-14 h-14 bg-slate-900 text-white font-black italic rounded-full shadow-2xl border-[6px] border-white flex items-center justify-center text-lg relative z-10">
//               VS
//             </div>
//           </div>
//         </div>

//         <ProductSide store="Amazon" data={pair.amazon} isCheaper={winner === 'amazon'} theme="yellow" />
//         <ProductSide store="Flipkart" data={pair.flipkart} isCheaper={winner === 'flipkart'} theme="blue" />
//       </div>
//     </div>
//   )
// }

// function ProductSide({ store, data, isCheaper, theme }) {
//   if (!data) return (
//     <div className="p-10 flex flex-col items-center justify-center text-slate-300 bg-slate-50/30 h-full min-h-[300px]">
//       <AlertCircle size={40} className="mb-3 opacity-40" />
//       <p className="text-sm font-bold opacity-60">Not listed on {store}</p>
//     </div>
//   )

//   const isAmz = theme === 'yellow'
//   const btnGradient = isAmz 
//     ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-orange-500/30" 
//     : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/30"

//   return (
//     <div className={`p-8 flex flex-col h-full relative transition-all duration-500 ${isCheaper ? 'bg-gradient-to-b from-green-50/50 to-transparent' : 'bg-white'}`}>
      
//       {isCheaper && (
//         <div className="absolute top-4 right-4 animate-slideUp">
//            <div className="bg-green-500 text-white p-2 rounded-xl shadow-lg shadow-green-500/30">
//              <TrendingDown size={20} />
//            </div>
//         </div>
//       )}

//       <div className="mb-6">
//         <span className={`px-4 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border transition-colors duration-300 ${isAmz ? 'bg-amber-50 text-amber-700 border-amber-100 group-hover:border-amber-300' : 'bg-blue-50 text-blue-700 border-blue-100 group-hover:border-blue-300'}`}>
//           {store}
//         </span>
//       </div>

//       <div className="h-52 mb-8 flex items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm relative group/img transition-all duration-500 hover:shadow-lg">
//         <img 
//             src={data.image || "https://via.placeholder.com/200?text=No+Image"} 
//             alt={data.name} 
//             className="max-h-full max-w-full object-contain mix-blend-multiply z-10 relative transition-transform duration-500 group-hover/img:scale-110"
//             onError={(e) => {e.target.src="https://placehold.co/200x200?text=No+Image"}}
//         />
//       </div>

//       <div className="flex-1">
//         <h3 className="font-bold text-slate-800 text-base leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors" title={data.name}>
//           {data.name}
//         </h3>
//       </div>

//       <div className="mt-8 pt-6 border-t border-slate-100 flex items-end justify-between gap-4">
//         <div>
//            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Price</div>
//            <div className={`text-3xl font-black tracking-tight ${isCheaper ? 'text-green-600' : 'text-slate-900'}`}>
//              <AnimatedNumber value={data.price} />
//            </div>
//         </div>
        
//         <a 
//           href={data.link} 
//           target="_blank" 
//           rel="noreferrer"
//           className={`pl-6 pr-5 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 btn-shine group/btn ${btnGradient}`}
//         >
//           Buy <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
//         </a>
//       </div>
//     </div>
//   )
// }

// export default App






















// LIGHT THEME VERSION...................................................




// import React, { useState, useEffect } from 'react'
// import { Search, TrendingDown, AlertCircle, Loader2, Sparkles, Home, Zap, ShieldCheck, Smartphone, Star, Twitter, Instagram, Facebook, ArrowRight, ArrowLeft, Lock, FileText, Mail, Cookie, Eye, Server, CheckCircle2, Send, MessageSquare } from 'lucide-react'

// // --- MOCK DATA (Fallback) ---
// const DEMO_RESULTS = [
//   {
//     score: 95,
//     amazon: { 
//       name: "Apple iPhone 15 (128 GB) - Black", 
//       price: "₹72,999", 
//       image: "https://m.media-amazon.com/images/I/71657TiFeHL._SX679_.jpg", 
//       link: "#" 
//     },
//     flipkart: { 
//       name: "Apple iPhone 15 (Black, 128 GB)", 
//       price: "₹66,999", 
//       link: "#" 
//     }
//   },
//   {
//     score: 92,
//     amazon: { 
//       name: "Sony WH-1000XM5 Wireless Noise Cancelling", 
//       price: "₹26,990", 
//       image: "https://m.media-amazon.com/images/I/51SKmu2G9FL._SL1200_.jpg", 
//       link: "#" 
//     },
//     flipkart: { 
//       name: "SONY WH-1000XM5 Bluetooth Headset", 
//       price: "₹24,990", 
//       link: "#" 
//     }
//   },
//   {
//     score: 88,
//     amazon: { 
//       name: "MacBook Air M2 (2023) - Midnight", 
//       price: "₹99,900", 
//       image: "https://m.media-amazon.com/images/I/710TJuHTMhL._SX679_.jpg", 
//       link: "#" 
//     },
//     flipkart: { 
//       name: "APPLE 2023 MacBook Air M2", 
//       price: "₹96,990", 
//       link: "#" 
//     }
//   }
// ]

// // --- COMPONENT: ANIMATED NUMBER COUNTER ---
// const AnimatedNumber = ({ value }) => {
//     const [count, setCount] = useState(0);
//     const numericValue = parseInt(value.toString().replace(/[₹,]/g, '')) || 0;
  
//     useEffect(() => {
//       let start = 0;
//       const duration = 1000; 
//       const incrementTime = 20;
//       const step = numericValue / (duration / incrementTime);
  
//       const timer = setInterval(() => {
//         start += step;
//         if (start >= numericValue) {
//           setCount(numericValue);
//           clearInterval(timer);
//         } else {
//           setCount(Math.ceil(start));
//         }
//       }, incrementTime);
  
//       return () => clearInterval(timer);
//     }, [numericValue]);
  
//     return <span>₹{count.toLocaleString()}</span>;
// };

// function App() {
//   const [query, setQuery] = useState('')
//   const [pairs, setPairs] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [view, setView] = useState('home') 
//   const [isTransitioning, setIsTransitioning] = useState(false)

//   const navigateTo = (targetView) => {
//     if (view === targetView) return;
//     setIsTransitioning(true)
//     setTimeout(() => {
//         setView(targetView)
//         setIsTransitioning(false)
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//     }, 400)
//   }

//   const search = async (e) => {
//     e.preventDefault()
//     if(!query) return
//     setLoading(true)
//     setIsTransitioning(true)

//     setTimeout(async () => {
//         setView('results')
//         setIsTransitioning(false)
//         setPairs([])
//         try {
//           const res = await fetch(`http://localhost:3001/search?q=${query}`)
//           const data = await res.json()
//           setPairs(data)
//         // eslint-disable-next-line no-unused-vars
//         } catch (err) {
//           setTimeout(() => { setPairs(DEMO_RESULTS) }, 1500)
//         }
//         setLoading(false)
//     }, 500)
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 relative overflow-x-hidden">
      
//       {/* --- STYLES --- */}
//       <style>{`
//         @keyframes blob { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0,0) scale(1); } }
//         @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
//         @keyframes shimmer { 100% { transform: translateX(100%); } }
//         @keyframes slideUpFade { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//         @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
//         @keyframes shine { 0% { left: -100%; } 100% { left: 200%; } }
//         @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
//         .animate-blob { animation: blob 7s infinite; }
//         .animate-float { animation: float 6s ease-in-out infinite; }
//         .animate-shimmer { animation: shimmer 1.5s infinite; }
//         .animate-slideUp { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//         .animate-popIn { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
//         .animate-scroll { animation: scroll 40s linear infinite; }
//         .btn-shine { position: relative; overflow: hidden; }
//         .btn-shine::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent); transform: skewX(-25deg); transition: 0.5s; }
//         .btn-shine:hover::after { animation: shine 0.75s; }
//       `}</style>

//       {/* --- BACKGROUND --- */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-blue-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter" />
//         <div className="absolute top-[-10%] right-[-10%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-purple-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter" style={{animationDelay: '2s'}} />
//         <div className="absolute bottom-[-20%] left-[20%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-pink-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter" style={{animationDelay: '4s'}} />
//       </div>

//       {/* ================= MAIN CONTENT ================= */}
//       <div className={`relative z-10 flex flex-col min-h-screen transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        
//         {/* --- HOME VIEW --- */}
//         {view === 'home' && (
//           <>
//           <div className="flex-1 flex flex-col items-center justify-center p-4 pt-20 pb-12">
//             <div className="w-full max-w-3xl text-center space-y-8 mb-12">
//               <div className="flex flex-col items-center justify-center gap-4 animate-float">
//                 <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-6 rounded-3xl shadow-2xl shadow-indigo-500/40 rotate-12 hover:rotate-0 transition-all duration-500 cursor-pointer border-4 border-white/20 backdrop-blur-md">
//                   <TrendingDown size={56} strokeWidth={2.5} />
//                 </div>
//                 <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 drop-shadow-sm">
//                   Price<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Hunt</span>
//                 </h1>
//                 <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
//                   The smart way to shop. Compare Amazon & Flipkart <span className="text-indigo-600 font-bold">instantly</span>.
//                 </p>
//               </div>

//               <form onSubmit={search} className="relative group max-w-xl mx-auto w-full z-20 transform hover:-translate-y-1 transition-transform duration-300">
//                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
//                 <div className="relative flex items-center bg-white p-2 rounded-full shadow-2xl shadow-indigo-500/20 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300">
//                     <div className="pl-4 text-slate-400"><Search size={24} /></div>
//                     <input type="text" className="w-full bg-transparent border-none outline-none py-3 px-4 text-lg text-slate-800 placeholder:text-slate-400 font-medium" placeholder="Paste product name..." value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
//                     <button type="submit" className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 btn-shine flex-shrink-0">Search</button>
//                 </div>
//               </form>
//             </div>

//             <div className="w-full max-w-4xl overflow-hidden mb-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
//                <div className="flex w-[200%] animate-scroll">
//                  {[...Array(2)].map((_, i) => (
//                    <div key={i} className="flex justify-around w-1/2 gap-8 items-center text-xl font-black text-slate-400 tracking-widest">
//                       <span>APPLE</span><span>SAMSUNG</span><span>SONY</span><span>ONEPLUS</span><span>DELL</span><span>BOSE</span><span>NIKE</span><span>ADIDAS</span>
//                    </div>
//                  ))}
//                </div>
//             </div>

//             <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
//               <FeatureCard icon={<Zap size={28} />} title="Lightning Fast" desc="Get real-time price comparisons in milliseconds. No more tab switching." delay="0.1s" />
//               <FeatureCard icon={<ShieldCheck size={28} />} title="Trusted Sellers" desc="We only fetch prices from verified sellers to ensure you get genuine products." delay="0.2s" />
//               <FeatureCard icon={<Smartphone size={28} />} title="Mobile Ready" desc="Optimized for every screen. Shop smartly from your phone, tablet or desktop." delay="0.3s" />
//             </div>
            
//             <div className="mt-24 w-full max-w-5xl px-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
//               <div className="text-center mb-10"><h2 className="text-2xl font-bold text-slate-800">Loved by smart shoppers</h2></div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <TestimonialCard name="Rahul Sharma" role="Tech Enthusiast" text="I almost bought a Sony XM5 for ₹29k on Amazon. PriceHunt found it for ₹24k on Flipkart instantly." />
//                 <TestimonialCard name="Priya Patel" role="Gadget Reviewer" text="The UI is so clean and the comparison is dead accurate. It's now my default tab before buying any tech online." />
//               </div>
//             </div>
//           </div>
          
//           <footer className="bg-white/50 backdrop-blur-lg border-t border-slate-200 py-12 mt-12">
//             <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
//                <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
//                   <div className="bg-slate-900 text-white p-1.5 rounded-lg"><TrendingDown size={16} strokeWidth={2.5} /></div>
//                   <span className="font-bold text-slate-800 text-lg">PriceHunt</span>
//                </div>
//                <div className="flex gap-8 text-sm font-medium text-slate-500">
//                  <button onClick={() => navigateTo('privacy')} className="hover:text-indigo-600 transition-colors">Privacy</button>
//                  <button onClick={() => navigateTo('terms')} className="hover:text-indigo-600 transition-colors">Terms</button>
//                  <button onClick={() => navigateTo('contact')} className="hover:text-indigo-600 transition-colors">Contact</button>
//                </div>
//                <div className="flex gap-4">
//                  <SocialIcon icon={<Twitter size={16}/>} />
//                  <SocialIcon icon={<Instagram size={16}/>} />
//                  <SocialIcon icon={<Facebook size={16}/>} />
//                </div>
//             </div>
//             <div className="text-center text-slate-400 text-xs mt-8">© 2024 PriceHunt Inc. Made with ❤️ for savings.</div>
//           </footer>
//           </>
//         )}

//         {/* --- RESULTS VIEW --- */}
//         {view === 'results' && (
//           <>
//           <StickyHeader query={query} setQuery={setQuery} search={search} goHome={() => navigateTo('home')} loading={loading} />
//           <div className="max-w-5xl mx-auto px-4 py-12 pb-32 relative z-10">
//             {loading && (
//               <div className="space-y-6">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="h-56 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm overflow-hidden relative animate-pulse" style={{animationDelay: `${i*150}ms`}}>
//                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
//                   </div>
//                 ))}
//               </div>
//             )}
//             <div className="space-y-8">
//               {pairs.map((pair, idx) => (
//                 <div key={idx} className="animate-slideUp" style={{ animationDelay: `${idx * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}>
//                   <ComparisonCard pair={pair} />
//                 </div>
//               ))}
//             </div>
//             {!loading && pairs.length === 0 && (
//               <div className="text-center py-24 text-slate-400 bg-white/40 backdrop-blur-md rounded-3xl border-2 border-dashed border-slate-300 animate-popIn">
//                 <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"><AlertCircle size={40} className="text-slate-400" /></div>
//                 <h3 className="text-xl font-bold text-slate-700 mb-2">No matches found</h3>
//                 <p className="mb-8">We couldn't find any products matching "{query}"</p>
//                 <button onClick={() => navigateTo('home')} className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center justify-center gap-2 mx-auto transition-all hover:gap-4">
//                   <Home size={18} /> Back to Home
//                 </button>
//               </div>
//             )}
//           </div>
//           </>
//         )}

//         {/* --- PRIVACY POLICY (Premium Layout) --- */}
//         {view === 'privacy' && (
//             <InfoPage title="Privacy Policy" icon={<Lock size={36}/>} goHome={() => navigateTo('home')}>
//                 <div className="grid gap-6">
//                     <DocSection 
//                         title="Data Collection" 
//                         icon={<Server size={20} />}
//                         text="We respect your privacy heavily. We collect minimal data necessary to provide our comparison service. No personal search history is stored linked to your identity." 
//                     />
//                     <DocSection 
//                         title="Third Party Links" 
//                         icon={<ExternalLinkIcon size={20} />}
//                         text="Our service contains links to external sites (Amazon, Flipkart). If you click on a third-party link, you will be directed to that site. We do not operate these external sites." 
//                     />
//                     <DocSection 
//                         title="Cookies & Tracking" 
//                         icon={<Cookie size={20} />}
//                         text="We use cookies to improve your experience and analyze traffic. By using our website, you agree to our use of cookies for functionality and analytics." 
//                     />
//                 </div>
//             </InfoPage>
//         )}

//         {/* --- TERMS (Premium Layout) --- */}
//         {view === 'terms' && (
//             <InfoPage title="Terms of Service" icon={<FileText size={36}/>} goHome={() => navigateTo('home')}>
//                 <div className="grid gap-6">
//                     <DocSection 
//                         title="Accuracy of Information" 
//                         icon={<Eye size={20} />}
//                         text="While we strive for 100% accuracy, prices on Amazon and Flipkart change rapidly. We cannot guarantee that the price listed is the exact price at the moment of purchase." 
//                     />
//                     <DocSection 
//                         title="Affiliate Disclosure" 
//                         icon={<CheckCircle2 size={20} />}
//                         text="PriceHunt participates in affiliate marketing programs. We may earn a commission on purchases made through our links at no extra cost to you." 
//                     />
//                 </div>
//             </InfoPage>
//         )}

//         {/* --- CONTACT (Premium Layout) --- */}
//         {view === 'contact' && (
//             <InfoPage title="Contact Us" icon={<Mail size={36}/>} goHome={() => navigateTo('home')}>
//                 <div className="grid md:grid-cols-2 gap-12 items-start">
//                     <div className="space-y-6">
//                         <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
//                             <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2"><MessageSquare size={18}/> We'd love to hear from you!</h3>
//                             <p className="text-slate-600 text-sm leading-relaxed">
//                                 Have a feature request? Found a bug? Or just want to say hi? Fill out the form and our team will get back to you within 24 hours.
//                             </p>
//                         </div>
//                         <div className="space-y-4">
//                             <ContactDetail icon={<Mail size={18}/>} label="Email" value="support@pricehunt.com" />
//                             <ContactDetail icon={<Twitter size={18}/>} label="Twitter" value="@PriceHuntApp" />
//                         </div>
//                     </div>

//                     {/* Pretty Form */}
//                     <form className="space-y-5 bg-white p-1 rounded-2xl" onSubmit={(e) => e.preventDefault()}>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="space-y-1">
//                                 <label className="text-xs font-bold text-slate-500 uppercase ml-1">Name</label>
//                                 <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all" placeholder="John Doe" />
//                             </div>
//                             <div className="space-y-1">
//                                 <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
//                                 <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all" placeholder="john@example.com" />
//                             </div>
//                         </div>
//                         <div className="space-y-1">
//                             <label className="text-xs font-bold text-slate-500 uppercase ml-1">Message</label>
//                             <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all h-32 resize-none" placeholder="How can we help you?"></textarea>
//                         </div>
//                         <button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-xl font-bold shadow-xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 btn-shine">
//                             Send Message <Send size={18} />
//                         </button>
//                     </form>
//                 </div>
//             </InfoPage>
//         )}

//       </div>
//     </div>
//   )
// }

// // --- SUB-COMPONENTS FOR PRETTY INFO PAGES ---
// function InfoPage({ title, icon, children, goHome }) {
//     return (
//         <div className="min-h-screen flex flex-col">
//              <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
//                 <div className="max-w-4xl mx-auto px-4 h-20 flex items-center">
//                     <button onClick={goHome} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold group">
//                         <div className="bg-slate-100 p-2 rounded-full group-hover:bg-indigo-100 transition-colors"><ArrowLeft size={18} /></div> 
//                         <span>Back Home</span>
//                     </button>
//                 </div>
//             </div>
            
//             <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 animate-slideUp">
//                 <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden">
                    
//                     {/* Header */}
//                     <div className="flex items-center gap-6 mb-12 pb-8 border-b border-slate-100 relative z-10">
//                         <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-inner border border-white">
//                             {icon}
//                         </div>
//                         <div>
//                             <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 mb-2">{title}</h1>
//                             <p className="text-slate-400 font-medium">Last updated: November 2025</p>
//                         </div>
//                     </div>

//                     {/* Content */}
//                     <div className="relative z-10">
//                         {children}
//                     </div>
//                 </div>
//             </div>
            
//             <footer className="text-center py-8 text-slate-400 text-sm">© 2024 PriceHunt Inc.</footer>
//         </div>
//     )
// }

// // A pretty card for Privacy/Terms sections
// function DocSection({ title, text, icon }) {
//     return (
//         <div className="group p-6 rounded-2xl border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
//             <div className="flex items-start gap-4">
//                 <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
//                     {icon}
//                 </div>
//                 <div>
//                     <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">{title}</h3>
//                     <p className="text-slate-500 leading-relaxed text-sm">{text}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// function ContactDetail({ icon, label, value }) {
//     return (
//         <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 transition-colors">
//             <div className="text-indigo-500">{icon}</div>
//             <div>
//                 <div className="text-xs font-bold text-slate-400 uppercase">{label}</div>
//                 <div className="font-semibold text-slate-800">{value}</div>
//             </div>
//         </div>
//     )
// }

// function ExternalLinkIcon({size}) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>}


// // --- STICKY HEADER ---
// function StickyHeader({query, setQuery, search, goHome, loading}) {
//     return (
//         <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
//             <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
//               <div onClick={goHome} className="flex items-center gap-2 flex-shrink-0 cursor-pointer group">
//                 <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:rotate-180">
//                   <TrendingDown size={24} strokeWidth={2.5} />
//                 </div>
//                 <h1 className="text-xl font-extrabold tracking-tight text-slate-800 hidden sm:block">Price<span className="text-indigo-600">Hunt</span></h1>
//               </div>
//               <form onSubmit={search} className="flex-1 max-w-md relative group z-20">
//                 <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300"><Search size={18} /></div>
//                 <input type="text" className="w-full bg-slate-100/50 hover:bg-white border-2 border-transparent focus:bg-white focus:border-indigo-500 rounded-full py-2 pl-10 pr-12 outline-none transition-all duration-300 shadow-inner focus:shadow-xl focus:shadow-indigo-500/10 placeholder:text-slate-400 font-medium text-sm" value={query} onChange={(e) => setQuery(e.target.value)} />
//                  <button disabled={loading} className="absolute right-1.5 top-1.5 bottom-1.5 bg-slate-900 text-white px-3 rounded-full font-bold text-xs hover:bg-indigo-600 disabled:bg-slate-400 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 flex items-center">{loading ? <Loader2 size={12} className="animate-spin" /> : <Search size={12} />}</button>
//               </form>
//             </div>
//         </div>
//     )
// }

// // --- OTHER COMPONENTS (Unchanged) ---
// function FeatureCard({ icon, title, desc, delay }) {
//   return (
//     <div className="bg-white/70 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-slideUp cursor-default" style={{ animationDelay: delay, animationFillMode: 'forwards', opacity: 0 }}>
//       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-md mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">{icon}</div>
//       <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
//       <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
//     </div>
//   )
// }
// function SocialIcon({icon}) { return <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 hover:-translate-y-1 transition-all cursor-pointer">{icon}</div> }
// function TestimonialCard({ name, role, text }) {
//   return (
//     <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
//        <div className="flex items-center gap-1 text-yellow-400 mb-4">{[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" className="drop-shadow-sm" />)}</div>
//        <p className="text-slate-600 text-base leading-relaxed mb-6 italic">"{text}"</p>
//        <div className="flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-inner">{name.charAt(0)}</div>
//           <div><div className="text-sm font-bold text-slate-900">{name}</div><div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{role}</div></div>
//        </div>
//     </div>
//   )
// }
// function ComparisonCard({ pair }) {
//   const getPrice = (pStr) => { if (!pStr) return 0; return parseInt(pStr.toString().replace(/[₹,]/g, '')) || 0 }
//   const amzPrice = getPrice(pair.amazon?.price); const flpPrice = getPrice(pair.flipkart?.price)
//   let winner = null; let diff = 0; let percent = 0
//   if (pair.flipkart && amzPrice > 0 && flpPrice > 0) {
//     if (amzPrice < flpPrice) { winner = 'amazon'; diff = flpPrice - amzPrice; percent = Math.round((diff / flpPrice) * 100) } 
//     else if (flpPrice < amzPrice) { winner = 'flipkart'; diff = amzPrice - flpPrice; percent = Math.round((diff / amzPrice) * 100) }
//   }
//   return (
//     <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-white overflow-hidden group relative hover:-translate-y-1 transition-all duration-500">
//       <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 via-indigo-500 to-blue-500 opacity-80"></div>
//       <div className="px-8 py-4 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
//         <div className="flex items-center gap-3">
//           <div className="flex gap-1">{[1,2,3,4,5].map(dot => (<div key={dot} className={`w-2 h-2 rounded-full transition-all duration-500 ${dot <= (pair.score/20) ? 'bg-indigo-500 scale-110' : 'bg-slate-200'}`} />))}</div>
//           <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-2">{pair.score || 90}% Match</span>
//         </div>
//         {winner && (<div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold border border-green-200 shadow-sm animate-pulse"><Sparkles size={14} className="fill-current" />Save <AnimatedNumber value={diff} /> ({percent}%)</div>)}
//       </div>
//       <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 relative">
//         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex animate-popIn" style={{animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards'}}>
//           <div className="relative group-hover:scale-125 transition-transform duration-300">
//             <div className="absolute inset-0 bg-slate-900 blur-md opacity-30 rounded-full"></div>
//             <div className="w-14 h-14 bg-slate-900 text-white font-black italic rounded-full shadow-2xl border-[6px] border-white flex items-center justify-center text-lg relative z-10">VS</div>
//           </div>
//         </div>
//         <ProductSide store="Amazon" data={pair.amazon} isCheaper={winner === 'amazon'} theme="yellow" />
//         <ProductSide store="Flipkart" data={pair.flipkart} isCheaper={winner === 'flipkart'} theme="blue" />
//       </div>
//     </div>
//   )
// }
// function ProductSide({ store, data, isCheaper, theme }) {
//   if (!data) return (<div className="p-10 flex flex-col items-center justify-center text-slate-300 bg-slate-50/30 h-full min-h-[300px]"><AlertCircle size={40} className="mb-3 opacity-40" /><p className="text-sm font-bold opacity-60">Not listed on {store}</p></div>)
//   const isAmz = theme === 'yellow'; const btnGradient = isAmz ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-orange-500/30" : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/30"
//   return (
//     <div className={`p-8 flex flex-col h-full relative transition-all duration-500 ${isCheaper ? 'bg-gradient-to-b from-green-50/50 to-transparent' : 'bg-white'}`}>
//       {isCheaper && (<div className="absolute top-4 right-4 animate-slideUp"><div className="bg-green-500 text-white p-2 rounded-xl shadow-lg shadow-green-500/30"><TrendingDown size={20} /></div></div>)}
//       <div className="mb-6"><span className={`px-4 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border transition-colors duration-300 ${isAmz ? 'bg-amber-50 text-amber-700 border-amber-100 group-hover:border-amber-300' : 'bg-blue-50 text-blue-700 border-blue-100 group-hover:border-blue-300'}`}>{store}</span></div>
//       <div className="h-52 mb-8 flex items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm relative group/img transition-all duration-500 hover:shadow-lg"><img src={data.image || "https://via.placeholder.com/200?text=No+Image"} alt={data.name} className="max-h-full max-w-full object-contain mix-blend-multiply z-10 relative transition-transform duration-500 group-hover/img:scale-110" onError={(e) => {e.target.src="https://placehold.co/200x200?text=No+Image"}}/></div>
//       <div className="flex-1"><h3 className="font-bold text-slate-800 text-base leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors" title={data.name}>{data.name}</h3></div>
//       <div className="mt-8 pt-6 border-t border-slate-100 flex items-end justify-between gap-4">
//         <div><div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Price</div><div className={`text-3xl font-black tracking-tight ${isCheaper ? 'text-green-600' : 'text-slate-900'}`}><AnimatedNumber value={data.price} /></div></div>
//         <a href={data.link} target="_blank" rel="noreferrer" className={`pl-6 pr-5 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 btn-shine group/btn ${btnGradient}`}>Buy <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" /></a>
//       </div>
//     </div>
//   )
// }

// export default App

// -------------------- LIGHT THEME ENDS-----------





// ----------------- TRYING  MAIL SERVICE --------------

// import React, { useState, useEffect } from 'react'
// import { Search, TrendingDown, AlertCircle, Loader2, Sparkles, Home, Zap, ShieldCheck, Smartphone, Star, Twitter, Instagram, Facebook, ArrowRight, ArrowLeft, Lock, FileText, Mail, Cookie, Eye, Server, CheckCircle2, Send, MessageSquare } from 'lucide-react'

// // --- MOCK DATA (Fallback) ---
// const DEMO_RESULTS = [
//   {
//     score: 95,
//     amazon: { 
//       name: "Apple iPhone 15 (128 GB) - Black", 
//       price: "₹72,999", 
//       image: "https://m.media-amazon.com/images/I/71657TiFeHL._SX679_.jpg", 
//       link: "#" 
//     },
//     flipkart: { 
//       name: "Apple iPhone 15 (Black, 128 GB)", 
//       price: "₹66,999", 
//       link: "#" 
//     }
//   },
//   {
//     score: 92,
//     amazon: { 
//       name: "Sony WH-1000XM5 Wireless Noise Cancelling", 
//       price: "₹26,990", 
//       image: "https://m.media-amazon.com/images/I/51SKmu2G9FL._SL1200_.jpg", 
//       link: "#" 
//     },
//     flipkart: { 
//       name: "SONY WH-1000XM5 Bluetooth Headset", 
//       price: "₹24,990", 
//       link: "#" 
//     }
//   },
//   {
//     score: 88,
//     amazon: { 
//       name: "MacBook Air M2 (2023) - Midnight", 
//       price: "₹99,900", 
//       image: "https://m.media-amazon.com/images/I/710TJuHTMhL._SX679_.jpg", 
//       link: "#" 
//     },
//     flipkart: { 
//       name: "APPLE 2023 MacBook Air M2", 
//       price: "₹96,990", 
//       link: "#" 
//     }
//   }
// ]

// // --- COMPONENT: ANIMATED NUMBER COUNTER ---
// const AnimatedNumber = ({ value }) => {
//     const [count, setCount] = useState(0);
//     const numericValue = parseInt(value.toString().replace(/[₹,]/g, '')) || 0;
  
//     useEffect(() => {
//       let start = 0;
//       const duration = 1000; 
//       const incrementTime = 20;
//       const step = numericValue / (duration / incrementTime);
  
//       const timer = setInterval(() => {
//         start += step;
//         if (start >= numericValue) {
//           setCount(numericValue);
//           clearInterval(timer);
//         } else {
//           setCount(Math.ceil(start));
//         }
//       }, incrementTime);
  
//       return () => clearInterval(timer);
//     }, [numericValue]);
  
//     return <span>₹{count.toLocaleString()}</span>;
// };

// function App() {
//   const [query, setQuery] = useState('')
//   const [pairs, setPairs] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [view, setView] = useState('home') 
//   const [isTransitioning, setIsTransitioning] = useState(false)

//   const navigateTo = (targetView) => {
//     if (view === targetView) return;
//     setIsTransitioning(true)
//     setTimeout(() => {
//         setView(targetView)
//         setIsTransitioning(false)
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//     }, 400)
//   }

//   const search = async (e) => {
//     e.preventDefault()
//     if(!query) return
//     setLoading(true)
//     setIsTransitioning(true)

//     setTimeout(async () => {
//         setView('results')
//         setIsTransitioning(false)
//         setPairs([])
//         try {
//           const res = await fetch(`http://localhost:3001/search?q=${query}`)
//           const data = await res.json()
//           setPairs(data)
//         // eslint-disable-next-line no-unused-vars
//         } catch (err) {
//           setTimeout(() => { setPairs(DEMO_RESULTS) }, 1500)
//         }
//         setLoading(false)
//     }, 500)
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 relative overflow-x-hidden">
      
//       {/* --- STYLES --- */}
//       <style>{`
//         @keyframes blob { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0,0) scale(1); } }
//         @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
//         @keyframes shimmer { 100% { transform: translateX(100%); } }
//         @keyframes slideUpFade { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//         @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
//         @keyframes shine { 0% { left: -100%; } 100% { left: 200%; } }
//         @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
//         .animate-blob { animation: blob 7s infinite; }
//         .animate-float { animation: float 6s ease-in-out infinite; }
//         .animate-shimmer { animation: shimmer 1.5s infinite; }
//         .animate-slideUp { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//         .animate-popIn { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
//         .animate-scroll { animation: scroll 40s linear infinite; }
//         .btn-shine { position: relative; overflow: hidden; }
//         .btn-shine::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent); transform: skewX(-25deg); transition: 0.5s; }
//         .btn-shine:hover::after { animation: shine 0.75s; }
//       `}</style>

//       {/* --- BACKGROUND --- */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-blue-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter" />
//         <div className="absolute top-[-10%] right-[-10%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-purple-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter" style={{animationDelay: '2s'}} />
//         <div className="absolute bottom-[-20%] left-[20%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-pink-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter" style={{animationDelay: '4s'}} />
//       </div>

//       {/* ================= MAIN CONTENT ================= */}
//       <div className={`relative z-10 flex flex-col min-h-screen transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        
//         {/* --- HOME VIEW --- */}
//         {view === 'home' && (
//           <>
//           <div className="flex-1 flex flex-col items-center justify-center p-4 pt-20 pb-12">
//             <div className="w-full max-w-3xl text-center space-y-8 mb-12">
//               <div className="flex flex-col items-center justify-center gap-4 animate-float">
//                 <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-6 rounded-3xl shadow-2xl shadow-indigo-500/40 rotate-12 hover:rotate-0 transition-all duration-500 cursor-pointer border-4 border-white/20 backdrop-blur-md">
//                   <TrendingDown size={56} strokeWidth={2.5} />
//                 </div>
//                 <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 drop-shadow-sm">
//                   Price<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Hunt</span>
//                 </h1>
//                 <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
//                   The smart way to shop. Compare Amazon & Flipkart <span className="text-indigo-600 font-bold">instantly</span>.
//                 </p>
//               </div>

//               <form onSubmit={search} className="relative group max-w-xl mx-auto w-full z-20 transform hover:-translate-y-1 transition-transform duration-300">
//                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
//                 <div className="relative flex items-center bg-white p-2 rounded-full shadow-2xl shadow-indigo-500/20 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300">
//                     <div className="pl-4 text-slate-400"><Search size={24} /></div>
//                     <input type="text" className="w-full bg-transparent border-none outline-none py-3 px-4 text-lg text-slate-800 placeholder:text-slate-400 font-medium" placeholder="Paste product name..." value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
//                     <button type="submit" className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 btn-shine flex-shrink-0">Search</button>
//                 </div>
//               </form>
//             </div>

//             <div className="w-full max-w-4xl overflow-hidden mb-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
//                <div className="flex w-[200%] animate-scroll">
//                  {[...Array(2)].map((_, i) => (
//                    <div key={i} className="flex justify-around w-1/2 gap-8 items-center text-xl font-black text-slate-400 tracking-widest">
//                       <span>APPLE</span><span>SAMSUNG</span><span>SONY</span><span>ONEPLUS</span><span>DELL</span><span>BOSE</span><span>NIKE</span><span>ADIDAS</span>
//                    </div>
//                  ))}
//                </div>
//             </div>

//             <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
//               <FeatureCard icon={<Zap size={28} />} title="Lightning Fast" desc="Get real-time price comparisons in milliseconds. No more tab switching." delay="0.1s" />
//               <FeatureCard icon={<ShieldCheck size={28} />} title="Trusted Sellers" desc="We only fetch prices from verified sellers to ensure you get genuine products." delay="0.2s" />
//               <FeatureCard icon={<Smartphone size={28} />} title="Mobile Ready" desc="Optimized for every screen. Shop smartly from your phone, tablet or desktop." delay="0.3s" />
//             </div>
            
//             <div className="mt-24 w-full max-w-5xl px-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
//               <div className="text-center mb-10"><h2 className="text-2xl font-bold text-slate-800">Loved by smart shoppers</h2></div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <TestimonialCard name="Rahul Sharma" role="Tech Enthusiast" text="I almost bought a Sony XM5 for ₹29k on Amazon. PriceHunt found it for ₹24k on Flipkart instantly." />
//                 <TestimonialCard name="Priya Patel" role="Gadget Reviewer" text="The UI is so clean and the comparison is dead accurate. It's now my default tab before buying any tech online." />
//               </div>
//             </div>
//           </div>
          
//           <footer className="bg-white/50 backdrop-blur-lg border-t border-slate-200 py-12 mt-12">
//             <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
//                <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
//                   <div className="bg-slate-900 text-white p-1.5 rounded-lg"><TrendingDown size={16} strokeWidth={2.5} /></div>
//                   <span className="font-bold text-slate-800 text-lg">PriceHunt</span>
//                </div>
//                <div className="flex gap-8 text-sm font-medium text-slate-500">
//                  <button onClick={() => navigateTo('privacy')} className="hover:text-indigo-600 transition-colors">Privacy</button>
//                  <button onClick={() => navigateTo('terms')} className="hover:text-indigo-600 transition-colors">Terms</button>
//                  <button onClick={() => navigateTo('contact')} className="hover:text-indigo-600 transition-colors">Contact</button>
//                </div>
//                <div className="flex gap-4">
//                  <SocialIcon icon={<Twitter size={16}/>} />
//                  <SocialIcon icon={<Instagram size={16}/>} />
//                  <SocialIcon icon={<Facebook size={16}/>} />
//                </div>
//             </div>
//             <div className="text-center text-slate-400 text-xs mt-8">© 2024 PriceHunt Inc. Made with ❤️ for savings.</div>
//           </footer>
//           </>
//         )}

//         {/* --- RESULTS VIEW --- */}
//         {view === 'results' && (
//           <>
//           <StickyHeader query={query} setQuery={setQuery} search={search} goHome={() => navigateTo('home')} loading={loading} />
//           <div className="max-w-5xl mx-auto px-4 py-12 pb-32 relative z-10">
//             {loading && (
//               <div className="space-y-6">
//                 {[1, 2, 3].map((i) => (
//                   <div key={i} className="h-56 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm overflow-hidden relative animate-pulse" style={{animationDelay: `${i*150}ms`}}>
//                      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
//                   </div>
//                 ))}
//               </div>
//             )}
//             <div className="space-y-8">
//               {pairs.map((pair, idx) => (
//                 <div key={idx} className="animate-slideUp" style={{ animationDelay: `${idx * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}>
//                   <ComparisonCard pair={pair} />
//                 </div>
//               ))}
//             </div>
//             {!loading && pairs.length === 0 && (
//               <div className="text-center py-24 text-slate-400 bg-white/40 backdrop-blur-md rounded-3xl border-2 border-dashed border-slate-300 animate-popIn">
//                 <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"><AlertCircle size={40} className="text-slate-400" /></div>
//                 <h3 className="text-xl font-bold text-slate-700 mb-2">No matches found</h3>
//                 <p className="mb-8">We couldn't find any products matching "{query}"</p>
//                 <button onClick={() => navigateTo('home')} className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center justify-center gap-2 mx-auto transition-all hover:gap-4">
//                   <Home size={18} /> Back to Home
//                 </button>
//               </div>
//             )}
//           </div>
//           </>
//         )}

//         {/* --- PRIVACY POLICY (Premium Layout) --- */}
//         {view === 'privacy' && (
//             <InfoPage title="Privacy Policy" icon={<Lock size={36}/>} goHome={() => navigateTo('home')}>
//                 <div className="grid gap-6">
//                     <DocSection 
//                         title="Data Collection" 
//                         icon={<Server size={20} />}
//                         text="We respect your privacy heavily. We collect minimal data necessary to provide our comparison service. No personal search history is stored linked to your identity." 
//                     />
//                     <DocSection 
//                         title="Third Party Links" 
//                         icon={<ExternalLinkIcon size={20} />}
//                         text="Our service contains links to external sites (Amazon, Flipkart). If you click on a third-party link, you will be directed to that site. We do not operate these external sites." 
//                     />
//                     <DocSection 
//                         title="Cookies & Tracking" 
//                         icon={<Cookie size={20} />}
//                         text="We use cookies to improve your experience and analyze traffic. By using our website, you agree to our use of cookies for functionality and analytics." 
//                     />
//                 </div>
//             </InfoPage>
//         )}

//         {/* --- TERMS (Premium Layout) --- */}
//         {view === 'terms' && (
//             <InfoPage title="Terms of Service" icon={<FileText size={36}/>} goHome={() => navigateTo('home')}>
//                 <div className="grid gap-6">
//                     <DocSection 
//                         title="Accuracy of Information" 
//                         icon={<Eye size={20} />}
//                         text="While we strive for 100% accuracy, prices on Amazon and Flipkart change rapidly. We cannot guarantee that the price listed is the exact price at the moment of purchase." 
//                     />
//                     <DocSection 
//                         title="Affiliate Disclosure" 
//                         icon={<CheckCircle2 size={20} />}
//                         text="PriceHunt participates in affiliate marketing programs. We may earn a commission on purchases made through our links at no extra cost to you." 
//                     />
//                 </div>
//             </InfoPage>
//         )}

//         {/* --- CONTACT (UPDATED WITH NO-CODE FORM) --- */}
//         {view === 'contact' && (
//             <InfoPage title="Contact Us" icon={<Mail size={36}/>} goHome={() => navigateTo('home')}>
//                 <div className="grid md:grid-cols-2 gap-12 items-start">
//                     <div className="space-y-6">
//                         <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
//                             <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2"><MessageSquare size={18}/> We'd love to hear from you!</h3>
//                             <p className="text-slate-600 text-sm leading-relaxed">
//                                 Have a feature request? Found a bug? Or just want to say hi? Fill out the form and our team will get back to you within 24 hours.
//                             </p>
//                         </div>
//                         <div className="space-y-4">
//                             <ContactDetail icon={<Mail size={18}/>} label="Email" value="adityaashu826@gmail.com" />
//                             <ContactDetail icon={<Twitter size={18}/>} label="Twitter" value="@PriceHuntApp" />
//                         </div>
//                     </div>

//                     {/* --- FORMSUBMIT.CO INTEGRATION --- */}
//                     <form 
//                         action="https://formsubmit.co/adityaashu826@gmail.com" 
//                         method="POST"
//                         className="space-y-5 bg-white p-1 rounded-2xl"
//                     >
//                         {/* Configuration Fields */}
//                         <input type="hidden" name="_captcha" value="false" />
//                         <input type="hidden" name="_subject" value="New PriceHunt Contact Message!" />
//                         {/* Optional: Redirect back to home after success, if running on localhost port 5173 */}
//                         <input type="hidden" name="_next" value="http://localhost:5173" />

//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="space-y-1">
//                                 <label className="text-xs font-bold text-slate-500 uppercase ml-1">Name</label>
//                                 <input type="text" name="name" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all" placeholder="John Doe" />
//                             </div>
//                             <div className="space-y-1">
//                                 <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
//                                 <input type="email" name="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all" placeholder="john@example.com" />
//                             </div>
//                         </div>
//                         <div className="space-y-1">
//                             <label className="text-xs font-bold text-slate-500 uppercase ml-1">Message</label>
//                             <textarea name="message" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all h-32 resize-none" placeholder="How can we help you?"></textarea>
//                         </div>
//                         <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-xl font-bold shadow-xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 btn-shine">
//                             Send Message <Send size={18} />
//                         </button>
//                     </form>
//                 </div>
//             </InfoPage>
//         )}

//       </div>
//     </div>
//   )
// }

// // --- SUB-COMPONENTS FOR PRETTY INFO PAGES ---
// function InfoPage({ title, icon, children, goHome }) {
//     return (
//         <div className="min-h-screen flex flex-col">
//              <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
//                 <div className="max-w-4xl mx-auto px-4 h-20 flex items-center">
//                     <button onClick={goHome} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold group">
//                         <div className="bg-slate-100 p-2 rounded-full group-hover:bg-indigo-100 transition-colors"><ArrowLeft size={18} /></div> 
//                         <span>Back Home</span>
//                     </button>
//                 </div>
//             </div>
            
//             <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 animate-slideUp">
//                 <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden">
                    
//                     {/* Header */}
//                     <div className="flex items-center gap-6 mb-12 pb-8 border-b border-slate-100 relative z-10">
//                         <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-inner border border-white">
//                             {icon}
//                         </div>
//                         <div>
//                             <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 mb-2">{title}</h1>
//                             <p className="text-slate-400 font-medium">Last updated: November 2025</p>
//                         </div>
//                     </div>

//                     {/* Content */}
//                     <div className="relative z-10">
//                         {children}
//                     </div>
//                 </div>
//             </div>
            
//             <footer className="text-center py-8 text-slate-400 text-sm">© 2024 PriceHunt Inc.</footer>
//         </div>
//     )
// }

// // A pretty card for Privacy/Terms sections
// function DocSection({ title, text, icon }) {
//     return (
//         <div className="group p-6 rounded-2xl border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
//             <div className="flex items-start gap-4">
//                 <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
//                     {icon}
//                 </div>
//                 <div>
//                     <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">{title}</h3>
//                     <p className="text-slate-500 leading-relaxed text-sm">{text}</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// function ContactDetail({ icon, label, value }) {
//     return (
//         <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 transition-colors">
//             <div className="text-indigo-500">{icon}</div>
//             <div>
//                 <div className="text-xs font-bold text-slate-400 uppercase">{label}</div>
//                 <div className="font-semibold text-slate-800">{value}</div>
//             </div>
//         </div>
//     )
// }

// function ExternalLinkIcon({size}) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>}


// // --- STICKY HEADER ---
// function StickyHeader({query, setQuery, search, goHome, loading}) {
//     return (
//         <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
//             <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
//               <div onClick={goHome} className="flex items-center gap-2 flex-shrink-0 cursor-pointer group">
//                 <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:rotate-180">
//                   <TrendingDown size={24} strokeWidth={2.5} />
//                 </div>
//                 <h1 className="text-xl font-extrabold tracking-tight text-slate-800 hidden sm:block">Price<span className="text-indigo-600">Hunt</span></h1>
//               </div>
//               <form onSubmit={search} className="flex-1 max-w-md relative group z-20">
//                 <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300"><Search size={18} /></div>
//                 <input type="text" className="w-full bg-slate-100/50 hover:bg-white border-2 border-transparent focus:bg-white focus:border-indigo-500 rounded-full py-2 pl-10 pr-12 outline-none transition-all duration-300 shadow-inner focus:shadow-xl focus:shadow-indigo-500/10 placeholder:text-slate-400 font-medium text-sm" value={query} onChange={(e) => setQuery(e.target.value)} />
//                  <button disabled={loading} className="absolute right-1.5 top-1.5 bottom-1.5 bg-slate-900 text-white px-3 rounded-full font-bold text-xs hover:bg-indigo-600 disabled:bg-slate-400 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 flex items-center">{loading ? <Loader2 size={12} className="animate-spin" /> : <Search size={12} />}</button>
//               </form>
//             </div>
//         </div>
//     )
// }

// // --- OTHER COMPONENTS (Unchanged) ---
// function FeatureCard({ icon, title, desc, delay }) {
//   return (
//     <div className="bg-white/70 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-slideUp cursor-default" style={{ animationDelay: delay, animationFillMode: 'forwards', opacity: 0 }}>
//       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-md mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">{icon}</div>
//       <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
//       <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
//     </div>
//   )
// }
// function SocialIcon({icon}) { return <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 hover:-translate-y-1 transition-all cursor-pointer">{icon}</div> }
// function TestimonialCard({ name, role, text }) {
//   return (
//     <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
//        <div className="flex items-center gap-1 text-yellow-400 mb-4">{[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" className="drop-shadow-sm" />)}</div>
//        <p className="text-slate-600 text-base leading-relaxed mb-6 italic">"{text}"</p>
//        <div className="flex items-center gap-4">
//           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-inner">{name.charAt(0)}</div>
//           <div><div className="text-sm font-bold text-slate-900">{name}</div><div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{role}</div></div>
//        </div>
//     </div>
//   )
// }
// function ComparisonCard({ pair }) {
//   const getPrice = (pStr) => { if (!pStr) return 0; return parseInt(pStr.toString().replace(/[₹,]/g, '')) || 0 }
//   const amzPrice = getPrice(pair.amazon?.price); const flpPrice = getPrice(pair.flipkart?.price)
//   let winner = null; let diff = 0; let percent = 0
//   if (pair.flipkart && amzPrice > 0 && flpPrice > 0) {
//     if (amzPrice < flpPrice) { winner = 'amazon'; diff = flpPrice - amzPrice; percent = Math.round((diff / flpPrice) * 100) } 
//     else if (flpPrice < amzPrice) { winner = 'flipkart'; diff = amzPrice - flpPrice; percent = Math.round((diff / amzPrice) * 100) }
//   }
//   return (
//     <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-white overflow-hidden group relative hover:-translate-y-1 transition-all duration-500">
//       <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 via-indigo-500 to-blue-500 opacity-80"></div>
//       <div className="px-8 py-4 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
//         <div className="flex items-center gap-3">
//           <div className="flex gap-1">{[1,2,3,4,5].map(dot => (<div key={dot} className={`w-2 h-2 rounded-full transition-all duration-500 ${dot <= (pair.score/20) ? 'bg-indigo-500 scale-110' : 'bg-slate-200'}`} />))}</div>
//           <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-2">{pair.score || 90}% Match</span>
//         </div>
//         {winner && (<div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold border border-green-200 shadow-sm animate-pulse"><Sparkles size={14} className="fill-current" />Save <AnimatedNumber value={diff} /> ({percent}%)</div>)}
//       </div>
//       <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 relative">
//         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex animate-popIn" style={{animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards'}}>
//           <div className="relative group-hover:scale-125 transition-transform duration-300">
//             <div className="absolute inset-0 bg-slate-900 blur-md opacity-30 rounded-full"></div>
//             <div className="w-14 h-14 bg-slate-900 text-white font-black italic rounded-full shadow-2xl border-[6px] border-white flex items-center justify-center text-lg relative z-10">VS</div>
//           </div>
//         </div>
//         <ProductSide store="Amazon" data={pair.amazon} isCheaper={winner === 'amazon'} theme="yellow" />
//         <ProductSide store="Flipkart" data={pair.flipkart} isCheaper={winner === 'flipkart'} theme="blue" />
//       </div>
//     </div>
//   )
// }
// function ProductSide({ store, data, isCheaper, theme }) {
//   if (!data) return (<div className="p-10 flex flex-col items-center justify-center text-slate-300 bg-slate-50/30 h-full min-h-[300px]"><AlertCircle size={40} className="mb-3 opacity-40" /><p className="text-sm font-bold opacity-60">Not listed on {store}</p></div>)
//   const isAmz = theme === 'yellow'; const btnGradient = isAmz ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-orange-500/30" : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/30"
//   return (
//     <div className={`p-8 flex flex-col h-full relative transition-all duration-500 ${isCheaper ? 'bg-gradient-to-b from-green-50/50 to-transparent' : 'bg-white'}`}>
//       {isCheaper && (<div className="absolute top-4 right-4 animate-slideUp"><div className="bg-green-500 text-white p-2 rounded-xl shadow-lg shadow-green-500/30"><TrendingDown size={20} /></div></div>)}
//       <div className="mb-6"><span className={`px-4 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border transition-colors duration-300 ${isAmz ? 'bg-amber-50 text-amber-700 border-amber-100 group-hover:border-amber-300' : 'bg-blue-50 text-blue-700 border-blue-100 group-hover:border-blue-300'}`}>{store}</span></div>
//       <div className="h-52 mb-8 flex items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm relative group/img transition-all duration-500 hover:shadow-lg"><img src={data.image || "https://via.placeholder.com/200?text=No+Image"} alt={data.name} className="max-h-full max-w-full object-contain mix-blend-multiply z-10 relative transition-transform duration-500 group-hover/img:scale-110" onError={(e) => {e.target.src="https://placehold.co/200x200?text=No+Image"}}/></div>
//       <div className="flex-1"><h3 className="font-bold text-slate-800 text-base leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors" title={data.name}>{data.name}</h3></div>
//       <div className="mt-8 pt-6 border-t border-slate-100 flex items-end justify-between gap-4">
//         <div><div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Price</div><div className={`text-3xl font-black tracking-tight ${isCheaper ? 'text-green-600' : 'text-slate-900'}`}><AnimatedNumber value={data.price} /></div></div>
//         <a href={data.link} target="_blank" rel="noreferrer" className={`pl-6 pr-5 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 btn-shine group/btn ${btnGradient}`}>Buy <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" /></a>
//       </div>
//     </div>
//   )
// }

// export default App





// ------------CHECK VERSION-----------


import React, { useState, useEffect } from 'react'
import { Search, TrendingDown, AlertCircle, Loader2, Sparkles, Home, Zap, ShieldCheck, Smartphone, Star, Twitter, Instagram, Facebook, ArrowRight, ArrowLeft, Lock, FileText, Mail, Cookie, Eye, Server, CheckCircle2, Send, MessageSquare } from 'lucide-react'

// --- MOCK DATA (Fallback) ---
const DEMO_RESULTS = [
  {
    score: 95,
    amazon: { 
      name: "Apple iPhone 15 (128 GB) - Black", 
      price: "₹72,999", 
      image: "https://m.media-amazon.com/images/I/71657TiFeHL._SX679_.jpg", 
      link: "#" 
    },
    flipkart: { 
      name: "Apple iPhone 15 (Black, 128 GB)", 
      price: "₹66,999", 
      link: "#" 
    }
  },
  {
    score: 92,
    amazon: { 
      name: "Sony WH-1000XM5 Wireless Noise Cancelling", 
      price: "₹26,990", 
      image: "https://m.media-amazon.com/images/I/51SKmu2G9FL._SL1200_.jpg", 
      link: "#" 
    },
    flipkart: { 
      name: "SONY WH-1000XM5 Bluetooth Headset", 
      price: "₹24,990", 
      link: "#" 
    }
  },
  {
    score: 88,
    amazon: { 
      name: "MacBook Air M2 (2023) - Midnight", 
      price: "₹99,900", 
      image: "https://m.media-amazon.com/images/I/710TJuHTMhL._SX679_.jpg", 
      link: "#" 
    },
    flipkart: { 
      name: "APPLE 2023 MacBook Air M2", 
      price: "₹96,990", 
      link: "#" 
    }
  }
]

// --- COMPONENT: ANIMATED NUMBER COUNTER ---
const AnimatedNumber = ({ value }) => {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(value.toString().replace(/[₹,]/g, '')) || 0;
  
    useEffect(() => {
      let start = 0;
      const duration = 1000; 
      const incrementTime = 20;
      const step = numericValue / (duration / incrementTime);
  
      const timer = setInterval(() => {
        start += step;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, incrementTime);
  
      return () => clearInterval(timer);
    }, [numericValue]);
  
    return <span>₹{count.toLocaleString()}</span>;
};

function App() {
  const [query, setQuery] = useState('')
  const [pairs, setPairs] = useState([])
  const [loading, setLoading] = useState(false)
  const [view, setView] = useState('home') 
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateTo = (targetView) => {
    if (view === targetView) return;
    setIsTransitioning(true)
    setTimeout(() => {
        setView(targetView)
        setIsTransitioning(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 400)
  }

  const search = async (e) => {
    e.preventDefault()
    if(!query) return
    setLoading(true)
    setIsTransitioning(true)

    setTimeout(async () => {
        setView('results')
        setIsTransitioning(false)
        setPairs([])
        try {
          // --- HARDCODED BACKEND URL ---
          const API_URL = 'https://pricehunt-vgmt.onrender.com';
          
          const res = await fetch(`${API_URL}/search?q=${query}`)
          const data = await res.json()
          setPairs(data)
        } catch (err) {
          console.error("Search failed, falling back to demo data:", err)
          // If backend fails (e.g. timeout), show mock data after delay
          setTimeout(() => { setPairs(DEMO_RESULTS) }, 1500)
        }
        setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 relative overflow-x-hidden">
      
      {/* --- STYLES --- */}
      <style>{`
        @keyframes blob { 0% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0,0) scale(1); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes slideUpFade { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes shine { 0% { left: -100%; } 100% { left: 200%; } }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
        .animate-slideUp { animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-popIn { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-scroll { animation: scroll 40s linear infinite; }
        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent); transform: skewX(-25deg); transition: 0.5s; }
        .btn-shine:hover::after { animation: shine 0.75s; }
      `}</style>

      {/* --- BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-blue-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter" />
        <div className="absolute top-[-10%] right-[-10%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-purple-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-[-20%] left-[20%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-pink-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply filter" style={{animationDelay: '4s'}} />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className={`relative z-10 flex flex-col min-h-screen transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        
        {/* --- HOME VIEW --- */}
        {view === 'home' && (
          <>
          <div className="flex-1 flex flex-col items-center justify-center p-4 pt-20 pb-12">
            <div className="w-full max-w-3xl text-center space-y-8 mb-12">
              <div className="flex flex-col items-center justify-center gap-4 animate-float">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-6 rounded-3xl shadow-2xl shadow-indigo-500/40 rotate-12 hover:rotate-0 transition-all duration-500 cursor-pointer border-4 border-white/20 backdrop-blur-md">
                  <TrendingDown size={56} strokeWidth={2.5} />
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 drop-shadow-sm">
                  Price<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Hunt</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
                  The smart way to shop. Compare Amazon & Flipkart <span className="text-indigo-600 font-bold">instantly</span>.
                </p>
              </div>

              <form onSubmit={search} className="relative group max-w-xl mx-auto w-full z-20 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative flex items-center bg-white p-2 rounded-full shadow-2xl shadow-indigo-500/20 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 transition-all duration-300">
                    <div className="pl-4 text-slate-400"><Search size={24} /></div>
                    <input type="text" className="w-full bg-transparent border-none outline-none py-3 px-4 text-lg text-slate-800 placeholder:text-slate-400 font-medium" placeholder="Paste product name..." value={query} onChange={(e) => setQuery(e.target.value)} autoFocus />
                    <button type="submit" className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 btn-shine flex-shrink-0">Search</button>
                </div>
              </form>
            </div>

            <div className="w-full max-w-4xl overflow-hidden mb-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <div className="flex w-[200%] animate-scroll">
                 {[...Array(2)].map((_, i) => (
                   <div key={i} className="flex justify-around w-1/2 gap-8 items-center text-xl font-black text-slate-400 tracking-widest">
                      <span>APPLE</span><span>SAMSUNG</span><span>SONY</span><span>ONEPLUS</span><span>DELL</span><span>BOSE</span><span>NIKE</span><span>ADIDAS</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
              <FeatureCard icon={<Zap size={28} />} title="Lightning Fast" desc="Get real-time price comparisons in milliseconds. No more tab switching." delay="0.1s" />
              <FeatureCard icon={<ShieldCheck size={28} />} title="Trusted Sellers" desc="We only fetch prices from verified sellers to ensure you get genuine products." delay="0.2s" />
              <FeatureCard icon={<Smartphone size={28} />} title="Mobile Ready" desc="Optimized for every screen. Shop smartly from your phone, tablet or desktop." delay="0.3s" />
            </div>
            
            <div className="mt-24 w-full max-w-5xl px-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
              <div className="text-center mb-10"><h2 className="text-2xl font-bold text-slate-800">Loved by smart shoppers</h2></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TestimonialCard name="Rahul Sharma" role="Tech Enthusiast" text="I almost bought a Sony XM5 for ₹29k on Amazon. PriceHunt found it for ₹24k on Flipkart instantly." />
                <TestimonialCard name="Priya Patel" role="Gadget Reviewer" text="The UI is so clean and the comparison is dead accurate. It's now my default tab before buying any tech online." />
              </div>
            </div>
          </div>
          
          <footer className="bg-white/50 backdrop-blur-lg border-t border-slate-200 py-12 mt-12">
            <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                  <div className="bg-slate-900 text-white p-1.5 rounded-lg"><TrendingDown size={16} strokeWidth={2.5} /></div>
                  <span className="font-bold text-slate-800 text-lg">PriceHunt</span>
               </div>
               <div className="flex gap-8 text-sm font-medium text-slate-500">
                 <button onClick={() => navigateTo('privacy')} className="hover:text-indigo-600 transition-colors">Privacy</button>
                 <button onClick={() => navigateTo('terms')} className="hover:text-indigo-600 transition-colors">Terms</button>
                 <button onClick={() => navigateTo('contact')} className="hover:text-indigo-600 transition-colors">Contact</button>
               </div>
               <div className="flex gap-4">
                 <SocialIcon icon={<Twitter size={16}/>} />
                 <SocialIcon icon={<Instagram size={16}/>} />
                 <SocialIcon icon={<Facebook size={16}/>} />
               </div>
            </div>
            <div className="text-center text-slate-400 text-xs mt-8">© 2024 PriceHunt Inc. Made with ❤️ for savings.</div>
          </footer>
          </>
        )}

        {/* --- RESULTS VIEW --- */}
        {view === 'results' && (
          <>
          <StickyHeader query={query} setQuery={setQuery} search={search} goHome={() => navigateTo('home')} loading={loading} />
          <div className="max-w-5xl mx-auto px-4 py-12 pb-32 relative z-10">
            {loading && (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-56 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm overflow-hidden relative animate-pulse" style={{animationDelay: `${i*150}ms`}}>
                     <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-8">
              {pairs.map((pair, idx) => (
                <div key={idx} className="animate-slideUp" style={{ animationDelay: `${idx * 150}ms`, opacity: 0, animationFillMode: 'forwards' }}>
                  <ComparisonCard pair={pair} />
                </div>
              ))}
            </div>
            {!loading && pairs.length === 0 && (
              <div className="text-center py-24 text-slate-400 bg-white/40 backdrop-blur-md rounded-3xl border-2 border-dashed border-slate-300 animate-popIn">
                <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"><AlertCircle size={40} className="text-slate-400" /></div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">No matches found</h3>
                <p className="mb-8">We couldn't find any products matching "{query}"</p>
                <button onClick={() => navigateTo('home')} className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center justify-center gap-2 mx-auto transition-all hover:gap-4">
                  <Home size={18} /> Back to Home
                </button>
              </div>
            )}
          </div>
          </>
        )}

        {/* --- PRIVACY POLICY --- */}
        {view === 'privacy' && (
            <InfoPage title="Privacy Policy" icon={<Lock size={36}/>} goHome={() => navigateTo('home')}>
                <div className="grid gap-6">
                    <DocSection 
                        title="Data Collection" 
                        icon={<Server size={20} />}
                        text="We respect your privacy heavily. We collect minimal data necessary to provide our comparison service. No personal search history is stored linked to your identity." 
                    />
                    <DocSection 
                        title="Third Party Links" 
                        icon={<ExternalLinkIcon size={20} />}
                        text="Our service contains links to external sites (Amazon, Flipkart). If you click on a third-party link, you will be directed to that site. We do not operate these external sites." 
                    />
                    <DocSection 
                        title="Cookies & Tracking" 
                        icon={<Cookie size={20} />}
                        text="We use cookies to improve your experience and analyze traffic. By using our website, you agree to our use of cookies for functionality and analytics." 
                    />
                </div>
            </InfoPage>
        )}

        {/* --- TERMS --- */}
        {view === 'terms' && (
            <InfoPage title="Terms of Service" icon={<FileText size={36}/>} goHome={() => navigateTo('home')}>
                <div className="grid gap-6">
                    <DocSection 
                        title="Accuracy of Information" 
                        icon={<Eye size={20} />}
                        text="While we strive for 100% accuracy, prices on Amazon and Flipkart change rapidly. We cannot guarantee that the price listed is the exact price at the moment of purchase." 
                    />
                    <DocSection 
                        title="Affiliate Disclosure" 
                        icon={<CheckCircle2 size={20} />}
                        text="PriceHunt participates in affiliate marketing programs. We may earn a commission on purchases made through our links at no extra cost to you." 
                    />
                </div>
            </InfoPage>
        )}

        {/* --- CONTACT (FORMSUBMIT.CO) --- */}
        {view === 'contact' && (
            <InfoPage title="Contact Us" icon={<Mail size={36}/>} goHome={() => navigateTo('home')}>
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                            <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2"><MessageSquare size={18}/> We'd love to hear from you!</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Have a feature request? Found a bug? Or just want to say hi? Fill out the form and our team will get back to you within 24 hours.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <ContactDetail icon={<Mail size={18}/>} label="Email" value="support@pricehunt.com" />
                            <ContactDetail icon={<Twitter size={18}/>} label="Twitter" value="@PriceHuntApp" />
                        </div>
                    </div>

                    {/* --- FORMSUBMIT.CO INTEGRATION --- */}
                    <form 
                        action="https://formsubmit.co/adityaashu826@gmail.com" 
                        method="POST"
                        className="space-y-5 bg-white p-1 rounded-2xl"
                    >
                        {/* Configuration Fields */}
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_subject" value="New PriceHunt Contact Message!" />
                        <input type="hidden" name="_next" value="https://pricehunt-vgmt.onrender.com" />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Name</label>
                                <input type="text" name="name" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all" placeholder="John Doe" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
                                <input type="email" name="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Message</label>
                            <textarea name="message" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all h-32 resize-none" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 rounded-xl font-bold shadow-xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 btn-shine">
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </div>
            </InfoPage>
        )}

      </div>
    </div>
  )
}

// --- SUB-COMPONENTS (Unchanged) ---
function InfoPage({ title, icon, children, goHome }) {
    return (
        <div className="min-h-screen flex flex-col">
             <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 h-20 flex items-center">
                    <button onClick={goHome} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold group">
                        <div className="bg-slate-100 p-2 rounded-full group-hover:bg-indigo-100 transition-colors"><ArrowLeft size={18} /></div> 
                        <span>Back Home</span>
                    </button>
                </div>
            </div>
            <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 animate-slideUp">
                <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden">
                    <div className="flex items-center gap-6 mb-12 pb-8 border-b border-slate-100 relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-inner border border-white">
                            {icon}
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 mb-2">{title}</h1>
                            <p className="text-slate-400 font-medium">Last updated: November 2025</p>
                        </div>
                    </div>
                    <div className="relative z-10">{children}</div>
                </div>
            </div>
            <footer className="text-center py-8 text-slate-400 text-sm">© 2024 PriceHunt Inc.</footer>
        </div>
    )
}

function DocSection({ title, text, icon }) {
    return (
        <div className="group p-6 rounded-2xl border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    {icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">{title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">{text}</p>
                </div>
            </div>
        </div>
    )
}

function ContactDetail({ icon, label, value }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 transition-colors">
            <div className="text-indigo-500">{icon}</div>
            <div>
                <div className="text-xs font-bold text-slate-400 uppercase">{label}</div>
                <div className="font-semibold text-slate-800">{value}</div>
            </div>
        </div>
    )
}

function ExternalLinkIcon({size}) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>}


function StickyHeader({query, setQuery, search, goHome, loading}) {
    return (
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
            <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
              <div onClick={goHome} className="flex items-center gap-2 flex-shrink-0 cursor-pointer group">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:rotate-180">
                  <TrendingDown size={24} strokeWidth={2.5} />
                </div>
                <h1 className="text-xl font-extrabold tracking-tight text-slate-800 hidden sm:block">Price<span className="text-indigo-600">Hunt</span></h1>
              </div>
              <form onSubmit={search} className="flex-1 max-w-md relative group z-20">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300"><Search size={18} /></div>
                <input type="text" className="w-full bg-slate-100/50 hover:bg-white border-2 border-transparent focus:bg-white focus:border-indigo-500 rounded-full py-2 pl-10 pr-12 outline-none transition-all duration-300 shadow-inner focus:shadow-xl focus:shadow-indigo-500/10 placeholder:text-slate-400 font-medium text-sm" value={query} onChange={(e) => setQuery(e.target.value)} />
                 <button disabled={loading} className="absolute right-1.5 top-1.5 bottom-1.5 bg-slate-900 text-white px-3 rounded-full font-bold text-xs hover:bg-indigo-600 disabled:bg-slate-400 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 flex items-center">{loading ? <Loader2 size={12} className="animate-spin" /> : <Search size={12} />}</button>
              </form>
            </div>
        </div>
    )
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-slideUp cursor-default" style={{ animationDelay: delay, animationFillMode: 'forwards', opacity: 0 }}>
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-md mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">{icon}</div>
      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  )
}
function SocialIcon({icon}) { return <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-indigo-100 hover:text-indigo-600 hover:-translate-y-1 transition-all cursor-pointer">{icon}</div> }
function TestimonialCard({ name, role, text }) {
  return (
    <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
       <div className="flex items-center gap-1 text-yellow-400 mb-4">{[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" className="drop-shadow-sm" />)}</div>
       <p className="text-slate-600 text-base leading-relaxed mb-6 italic">"{text}"</p>
       <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-inner">{name.charAt(0)}</div>
          <div><div className="text-sm font-bold text-slate-900">{name}</div><div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{role}</div></div>
       </div>
    </div>
  )
}
function ComparisonCard({ pair }) {
  const getPrice = (pStr) => { if (!pStr) return 0; return parseInt(pStr.toString().replace(/[₹,]/g, '')) || 0 }
  const amzPrice = getPrice(pair.amazon?.price); const flpPrice = getPrice(pair.flipkart?.price)
  let winner = null; let diff = 0; let percent = 0
  if (pair.flipkart && amzPrice > 0 && flpPrice > 0) {
    if (amzPrice < flpPrice) { winner = 'amazon'; diff = flpPrice - amzPrice; percent = Math.round((diff / flpPrice) * 100) } 
    else if (flpPrice < amzPrice) { winner = 'flipkart'; diff = amzPrice - flpPrice; percent = Math.round((diff / amzPrice) * 100) }
  }
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/50 border border-white overflow-hidden group relative hover:-translate-y-1 transition-all duration-500">
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 via-indigo-500 to-blue-500 opacity-80"></div>
      <div className="px-8 py-4 flex justify-between items-center border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">{[1,2,3,4,5].map(dot => (<div key={dot} className={`w-2 h-2 rounded-full transition-all duration-500 ${dot <= (pair.score/20) ? 'bg-indigo-500 scale-110' : 'bg-slate-200'}`} />))}</div>
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-2">{pair.score || 90}% Match</span>
        </div>
        {winner && (<div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold border border-green-200 shadow-sm animate-pulse"><Sparkles size={14} className="fill-current" />Save <AnimatedNumber value={diff} /> ({percent}%)</div>)}
      </div>
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex animate-popIn" style={{animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards'}}>
          <div className="relative group-hover:scale-125 transition-transform duration-300">
            <div className="absolute inset-0 bg-slate-900 blur-md opacity-30 rounded-full"></div>
            <div className="w-14 h-14 bg-slate-900 text-white font-black italic rounded-full shadow-2xl border-[6px] border-white flex items-center justify-center text-lg relative z-10">VS</div>
          </div>
        </div>
        <ProductSide store="Amazon" data={pair.amazon} isCheaper={winner === 'amazon'} theme="yellow" />
        <ProductSide store="Flipkart" data={pair.flipkart} isCheaper={winner === 'flipkart'} theme="blue" />
      </div>
    </div>
  )
}
function ProductSide({ store, data, isCheaper, theme }) {
  if (!data) return (<div className="p-10 flex flex-col items-center justify-center text-slate-300 bg-slate-50/30 h-full min-h-[300px]"><AlertCircle size={40} className="mb-3 opacity-40" /><p className="text-sm font-bold opacity-60">Not listed on {store}</p></div>)
  const isAmz = theme === 'yellow'; const btnGradient = isAmz ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-orange-500/30" : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/30"
  return (
    <div className={`p-8 flex flex-col h-full relative transition-all duration-500 ${isCheaper ? 'bg-gradient-to-b from-green-50/50 to-transparent' : 'bg-white'}`}>
      {isCheaper && (<div className="absolute top-4 right-4 animate-slideUp"><div className="bg-green-500 text-white p-2 rounded-xl shadow-lg shadow-green-500/30"><TrendingDown size={20} /></div></div>)}
      <div className="mb-6"><span className={`px-4 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border transition-colors duration-300 ${isAmz ? 'bg-amber-50 text-amber-700 border-amber-100 group-hover:border-amber-300' : 'bg-blue-50 text-blue-700 border-blue-100 group-hover:border-blue-300'}`}>{store}</span></div>
      <div className="h-52 mb-8 flex items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm relative group/img transition-all duration-500 hover:shadow-lg"><img src={data.image || "https://via.placeholder.com/200?text=No+Image"} alt={data.name} className="max-h-full max-w-full object-contain mix-blend-multiply z-10 relative transition-transform duration-500 group-hover/img:scale-110" onError={(e) => {e.target.src="https://placehold.co/200x200?text=No+Image"}}/></div>
      <div className="flex-1"><h3 className="font-bold text-slate-800 text-base leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors" title={data.name}>{data.name}</h3></div>
      <div className="mt-8 pt-6 border-t border-slate-100 flex items-end justify-between gap-4">
        <div><div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Price</div><div className={`text-3xl font-black tracking-tight ${isCheaper ? 'text-green-600' : 'text-slate-900'}`}><AnimatedNumber value={data.price} /></div></div>
        <a href={data.link} target="_blank" rel="noreferrer" className={`pl-6 pr-5 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 btn-shine group/btn ${btnGradient}`}>Buy <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" /></a>
      </div>
    </div>
  )
}

export default App








































































