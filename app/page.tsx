"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { MapMinus } from "lucide-react";
import { TilesDemo } from "@/components/tileback";

export default function HomePage() {
  const { data: session, status } = useSession();
  const isUserLoggedIn = status === "authenticated";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col justify-between relative overflow-hidden isolate">
      
      {/* Tiles background track wrapper */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <TilesDemo />
      </div>

      {/* Background radial soft light gradient layers */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32 z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32 z-0" />

      {/* Navigation Header */}
      <header className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tight">
          <span><MapMinus className="text-indigo-800"/></span> RoamAI
        </div>
        
        <div className="flex items-center gap-4">
          {/* DYNAMIC HEADER BUTTON: Adapts seamlessly to user status states */}
          {isUserLoggedIn ? (
            <Link
              href="/dashboard"
              className="text-sm font-bold border border-indigo-900 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 hover:shadow-lg hover:shadow-indigo-900/10 transition-all p-3 rounded-xl text-white cursor-pointer"
            >
              Dashboard 
            </Link>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-sm font-semibold border border-slate-300 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 hover:text-white transition-colors p-3 rounded-lg text-white cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-24 relative z-10 my-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100/80 text-xs font-semibold tracking-wider text-indigo-700 uppercase rounded-full mb-6">
          ✨ Next-Gen Travel Planning
        </span>
        
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-none max-w-3xl mx-auto">
          Plan your next journey in <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900">seconds, not weeks.</span>
        </h1>
        
        <p className="mt-6 text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Tell us your destination, travel style, and budget limits. Our advanced AI engine instantly curates a step-by-step custom itinerary packed with sights, local flavors, and handy tips.
        </p>

        {/* Dynamic Action Call Container */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {isUserLoggedIn ? (
            /* Logged-In User State Link Trigger Component */
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 hover:from-indigo-800 hover:to-indigo-950 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5 text-center cursor-pointer"
            >
               View Your Trips 
            </Link>
          ) : (
            /* Unauthenticated Anonymous Session State Trigger */
            <button
              onClick={() => signIn()}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Create Your AI Trip 
            </button>
          )}
        </div>

        




        {/* ================= HOW IT WORKS SECTION ================= */}
<section className="mt-28 mb-16 relative z-10">
  <div className="text-center max-w-xl mx-auto mb-14">
    <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
      How It Works
    </span>
    <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
      Three Steps to Your Next Horizon
    </h2>
    <p className="text-slate-500 text-sm mt-2 leading-relaxed">
      Our advanced agent bypasses hours of research by converting simple constraints into high-end contextual itineraries instantly.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8 relative">
    {/* Connecting Background Line for Desktop Viewports */}
    <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent z-0 hidden md:block -translate-y-12" />

    {/* Step 1 */}
    <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-slate-200/60 shadow-sm relative z-10 flex flex-col items-center md:items-start text-center md:text-left group hover:shadow-md transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-indigo-900 text-white font-mono font-bold flex items-center justify-center text-sm shadow-md shadow-indigo-900/20 group-hover:scale-105 transition-transform">
        01
      </div>
      <h3 className="font-extrabold text-slate-900 text-base mt-4">Input Parameters</h3>
      <p className="text-slate-500 text-xs mt-2 leading-relaxed">
        Specify your target destination, total calendar duration, specific travel style preference, and absolute budget allocation rules.
      </p>
    </div>

    {/* Step 2 */}
    <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-slate-200/60 shadow-sm relative z-10 flex flex-col items-center md:items-start text-center md:text-left group hover:shadow-md transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-indigo-800 text-white font-mono font-bold flex items-center justify-center text-sm shadow-md shadow-indigo-800/20 group-hover:scale-105 transition-transform">
        02
      </div>
      <h3 className="font-extrabold text-slate-900 text-base mt-4">AI Engine Processing</h3>
      <p className="text-slate-500 text-xs mt-2 leading-relaxed">
        Our automated model ingests your parameters, mapping curated sightseeing tracks, dining nodes, and real-time transit logic simultaneously.
      </p>
    </div>

    {/* Step 3 */}
    <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-slate-200/60 shadow-sm relative z-10 flex flex-col items-center md:items-start text-center md:text-left group hover:shadow-md transition-all duration-300">
      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-bold flex items-center justify-center text-sm shadow-md shadow-slate-900/20 group-hover:scale-105 transition-transform">
        03
      </div>
      <h3 className="font-extrabold text-slate-900 text-base mt-4">Execute Workspace</h3>
      <p className="text-slate-500 text-xs mt-2 leading-relaxed">
        Unlock a dynamic, step-by-step sequential timeline on your personal dashboard grid, packed with smart metrics and deep local insights.
      </p>
    </div>
  </div>
</section>

{/* ================= FINAL CALL TO ACTION ================= */}
<section className="mt-32 mb-10 relative z-10 max-w-4xl mx-auto w-full text-center">
  <div className="bg-gradient-to-b from-indigo-950 via-indigo-900 to-slate-950 rounded-3xl p-10 sm:p-14 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
    
    {/* Depth elements */}
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:14px_14px]" />
    <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

    <span className="text-[10px] font-black tracking-widest text-indigo-300 uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full relative z-10">
      Instant Provisioning
    </span>
    
    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4 max-w-xl mx-auto leading-tight relative z-10">
      Stop scheduling. Start exploring.
    </h2>
    
    <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto mt-4 font-light leading-relaxed relative z-10">
      Join thousands of travelers bypassing the browser tab nightmare. Deploy your personal AI agent today.
    </p>

    <div className="mt-8 relative z-10">
      {isUserLoggedIn ? (
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-950 font-bold text-sm rounded-xl shadow-xl hover:bg-slate-50 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          Open Dashboard Board →
        </Link>
      ) : (
        <button
          onClick={() => signIn()}
          className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-bold text-sm rounded-xl shadow-xl hover:bg-slate-50 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          Generate Your Free Itinerary
        </button>
      )}
    </div>
  </div>
</section>

      </main>

      {/* Mini Footer */}
      <footer className="border-t border-slate-100 py-6 text-center text-xs text-slate-400 relative z-10">
        &copy; {new Date().getFullYear()} RoamAI Planner. Built to simplify horizons.
      </footer>
    </div>
  );
}