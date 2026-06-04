"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AuroraText } from "@/components/ui/aurora-text"
import { Trash2, MapMinus, Compass, Layers, Wallet, CalendarRange } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Trip {
  id: string;
  destination: string;
  budget: number;
  days: number;
  travelStyle: string;
  createdAt: string;
}

function getCardThemeStyles(index: number) {
  const themes = [
    {
      card: "from-slate-950 via-indigo-950 to-blue-950 border-indigo-900/40 hover:border-blue-500 hover:shadow-blue-950/30 text-slate-100",
      tag: "bg-blue-500/20 text-sky-200 border-blue-500/30",
      statsText: "text-sky-300"
    },
    {
      card: "from-zinc-950 via-slate-900 to-emerald-950 border-emerald-900/40 hover:border-emerald-400 hover:shadow-emerald-950/20 text-slate-100",
      tag: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30",
      statsText: "text-emerald-400 font-bold"
    },
    {
      card: "from-slate-950 via-purple-950 to-rose-950 border-rose-900/30 hover:border-rose-500 hover:shadow-rose-950/20 text-slate-100",
      tag: "bg-rose-500/20 text-rose-200 border-rose-500/30",
      statsText: "text-rose-300"
    },
    {
      card: "from-neutral-950 via-neutral-900 to-red-950 border-red-900/40 hover:border-red-500 hover:shadow-red-950/30 text-slate-100",
      tag: "bg-red-500/20 text-red-200 border-red-500/30",
      statsText: "text-red-400"
    },
    {
      card: "from-stone-950 via-neutral-900 to-amber-950 border-amber-900/40 hover:border-amber-500 hover:shadow-amber-950/20 text-slate-100",
      tag: "bg-amber-500/20 text-amber-200 border-amber-500/30",
      statsText: "text-amber-300"
    },
    {
      card: "from-slate-950 via-slate-900 to-cyan-950 border-cyan-900/40 hover:border-cyan-400 hover:shadow-cyan-950/20 text-slate-100",
      tag: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30",
      statsText: "text-cyan-300"
    },
    {
      card: "from-neutral-950 via-teal-950 to-green-950 border-teal-900/40 hover:border-teal-400 hover:shadow-teal-950/20 text-slate-100",
      tag: "bg-teal-500/20 text-teal-200 border-teal-500/30",
      statsText: "text-green-400"
    },
    {
      card: "from-stone-950 via-stone-900 to-fuchsia-950 border-fuchsia-900/30 hover:border-fuchsia-500 hover:shadow-fuchsia-950/20 text-slate-100",
      tag: "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-500/30",
      statsText: "text-fuchsia-300"
    },
    {
      card: "from-violet-950 via-slate-900 to-orange-950 border-orange-900/40 hover:border-orange-500 hover:shadow-orange-950/20 text-slate-100",
      tag: "bg-orange-500/20 text-orange-200 border-orange-500/30",
      statsText: "text-orange-300"
    },
    {
      card: "from-zinc-950 via-zinc-900 to-stone-900 border-stone-800 hover:border-zinc-400 hover:shadow-white/5 text-slate-100",
      tag: "bg-white/10 text-zinc-200 border-white/5",
      statsText: "text-slate-300"
    }
  ];

  return themes[index % themes.length];
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  const handleDeleteTrip = async (tripId: string) => {
    try {   
      const res = await fetch("/api/trips", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",     
        },
        body: JSON.stringify({ tripId }),
      });
      const data = await res.json();
      if (data.success) {
        setTrips((prev) => prev.filter((trip) => trip.id !== tripId));
      } else {
        alert(data.error || "Failed to delete the trip. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("An error occurred while deleting the trip.");
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchTrips = async () => {
        try {
          const res = await fetch("/api/trips");
          const data = await res.json();
          if (data.success) {
            setTrips(data.trips);
          }
        } catch (err) {
          console.error("Error loading trips:", err);
        } finally {
          setLoadingTrips(false);
        }
      };
      fetchTrips();
    }
  }, [status]);

  if (status === "loading" || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-500 animate-pulse">Verifying session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col justify-between">
      
      {/* 
        BRAND NAVIGATION HEADER BAR 
        Introduces a cohesive brand layer matching the layout framework of the HomePage 
      */}
      <header className="w-full bg-slate-50 border-b border-slate-200/80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tight cursor-pointer group hover:opacity-90 transition-opacity"
          >
            <span><MapMinus className="text-indigo-800 h-5 w-5" /></span> RoamAI
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
              DASHBOARD
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        
        {/* Dashboard Welcome Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Hey,{" "}
              <AuroraText>
                {session.user?.name?.toUpperCase() || session.user?.email?.split("@")[0]} 
              </AuroraText>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Welcome back to your travel dashboard.</p>
          </div>
          <div className="flex flex-col items-end justify-center">
            <Link
              href="/trips/create"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white font-semibold text-sm rounded-xl shadow-md hover:bg-indigo-700 transition-all text-center cursor-pointer"
            >
              + Plan New Trip
            </Link>
          </div>
        </header>

        {/* Trips Board section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-slate-400" /> Your Saved Itineraries
            </h2>
            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-200/50 px-2.5 py-0.5 rounded flex items-center gap-1">
              <Layers className="h-3 w-3" /> {trips.length} TOTAL
            </span>
          </div>

          {loadingTrips ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="aspect-square bg-slate-200/60 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : trips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {trips.map((trip, i) => {
                const theme = getCardThemeStyles(i);
                
                return (
                  <div
                    key={trip.id}
                    className={`group p-6 border aspect-square flex flex-col justify-between bg-gradient-to-br rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden ${theme.card}`}
                  >
                    {/* Subtle ambient lighting layer */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sky-400/10 via-transparent to-transparent pointer-events-none" />

                    {/* TOP BAR HOUSING INDEPENDENT TRIGGERS */}
                    <div className="relative z-20 w-full flex items-center justify-between gap-2 mb-2">
                      <div className="w-8 h-8 shrink-0 invisible" />

                      <span className={`inline-block px-2.5 py-0.5 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/5 ${theme.tag}`}>
                        ✨ {trip.travelStyle}
                      </span>

                      {/* ISOLATED ALERT DIALOG */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-slate-300 hover:bg-rose-600 hover:text-white hover:border-rose-500 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 cursor-pointer shrink-0"
                            title="Delete Itinerary"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="bg-white border border-slate-100 rounded-2xl max-w-md p-6 shadow-2xl text-slate-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                              🗑️ Delete Journey to {trip.destination}?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-slate-500 text-sm leading-relaxed mt-2">
                              This will permanently discard your customized AI itinerary plans, mapped local hot spots, and dining logs. This action cannot be reversed.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                            <AlertDialogCancel className="rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs tracking-wide uppercase px-4 py-2 hover:bg-slate-50 transition-colors">
                              Keep Itinerary
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteTrip(trip.id)}
                              className="rounded-xl bg-rose-600 text-white font-semibold text-xs tracking-wide uppercase px-4 py-2 hover:bg-rose-700 shadow-md transition-colors"
                            >
                              Confirm Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    {/* INTERIOR CONTENT WRAPPER */}
                    <Link 
                      href={`/trips/${trip.id}`} 
                      className="absolute inset-0 pt-16 px-6 pb-6 flex flex-col justify-between z-10 select-none cursor-pointer"
                    >
                      {/* Main Destination Text */}
                      <div className="flex flex-col items-center text-center flex-1 justify-center pb-4">
                        <h3 className="text-4xl font-black tracking-tight leading-snug line-clamp-2 px-1">
                          {trip.destination}
                        </h3>
                      </div>

                      {/* Bottom Split Info Panel */}
                      <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-2 text-xs font-medium text-slate-300/90">
                        <div className="space-y-1 text-left">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1"><CalendarRange className="h-3 w-3" /> Duration</span>
                          <span className="text-sm font-extrabold text-white block">{trip.days} Days</span>
                        </div>
                        <div className="space-y-1 text-right">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide flex items-center justify-end gap-1"><Wallet className="h-3 w-3" /> Budget</span>
                          <span className={`text-sm font-extrabold block ${theme.statsText}`}>${trip.budget}</span>
                        </div>
                      </div>
                    </Link>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm">
              <span className="text-4xl block mb-2">📭</span>
              <p className="text-slate-400 text-sm font-medium mb-4">Your travel board is empty.</p>
              <Link
                href="/trips/create"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4 cursor-pointer"
              >
                Let's generate your first itinerary
              </Link>
            </div>
          )}
        </section>
      </div>

      {/* Persistent Sticky Bottom Mini Footer */}
      <footer className="border-t border-slate-200 py-4 text-center text-[11px] text-slate-400 bg-white w-full">
        &copy; {new Date().getFullYear()} RoamAI Planner. Built to simplify horizons.
      </footer>

    </div>
  );
}