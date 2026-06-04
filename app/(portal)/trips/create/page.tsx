"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTripPage() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [travelStyle, setTravelStyle] = useState("Adventure");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    setErrorMsg("");
    if (!destination || !budget || !days) {
      setErrorMsg("Please fill out all the fields before proceeding.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/itinerary/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          budget: Number(budget),
          days: Number(days),
          travelStyle,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("API RESPONSE:", data);
        // Redirect seamlessly to the new trip layout
        router.push(`/trips/${data.tripId}`);
      } else {
        setErrorMsg(data.error || "Failed to generate your trip plan.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 antialiased p-4 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 relative z-10">
        
        {/* Header Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            Plan Your Next Adventure 
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Fill in your preferences, and let our AI handle the routing.
          </p>
        </div>

        {/* Dynamic Native Error Message */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-xl font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        <div className="flex flex-col gap-4">
          
          {/* Destination input wrapper */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Where to?</label>
            <input
              type="text"
              disabled={loading}
              className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50"
              placeholder="e.g. Kyoto, Japan or Paris, France"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* Budget & Days side-by-side grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Budget ($)</label>
              <input
                type="number"
                disabled={loading}
                className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50"
                placeholder="e.g. 1500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Duration (Days)</label>
              <input
                type="number"
                disabled={loading}
                className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50"
                placeholder="e.g. 5"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </div>
          </div>

          {/* Travel Style Select Wrapper */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Travel Vibes</label>
            <select
              disabled={loading}
              className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all disabled:opacity-50 cursor-pointer"
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
            >
              <option value="Adventure">🧗 Adventure</option>
              <option value="Relax">🧘 Relaxing</option>
              <option value="Luxury">✨ Luxury</option>
              <option value="Budget">🎒 Backpacker / Budget</option>
            </select>
          </div>

          {/* Subtle Notice Banner */}
          <div className="bg-indigo-50/60 border border-indigo-100/50 p-3.5 rounded-xl text-xs text-indigo-800 leading-relaxed mt-1">
            🪄 <strong>AI Engine active:</strong> We'll compile dynamic locations, local dish recommendations, and curated tips perfectly calculated to your timeline.
          </div>

          {/* Custom Action Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white font-semibold p-3.5 rounded-xl shadow-md shadow-indigo-600/10 hover:from-indigo-700 hover:to-blue-700 transition-all disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Assembling Itinerary...</span>
              </>
            ) : (
              <span>Generate My Trip Plan</span>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}