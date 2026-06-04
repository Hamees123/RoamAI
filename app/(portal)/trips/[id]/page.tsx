import { prisma } from "@/lib/prisma";

export default async function TripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="text-center text-rose-500 font-medium tracking-wide">Invalid trip ID</div>
      </div>
    );
  }

  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      itinerary: true,
    },
  });

  if (!trip) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="text-center text-slate-500 font-medium tracking-wide">Trip not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased pb-16">
      {/* Premium Hero Banner */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 py-16 px-4 sm:px-6 lg:px-8 text-white shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sky-400/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wider uppercase rounded-full mb-4 border border-white/10 text-sky-200">
            ✨ AI Crafted Journey
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-sm">
            {trip.destination}
          </h1>
          <p className="mt-3 text-slate-300 text-base md:text-lg max-w-xl font-light leading-relaxed">
            Your customized itinerary is ready. Explore your daily schedule, handpicked stays, and local flavors below.
          </p>
        </div>
      </div>

      {/* Main Content Dashboard */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Floating Quick Stats Panel */}
        <div className="grid grid-cols-3 gap-4 bg-white p-4 md:p-6 rounded-2xl  border-2 border-slate-100 mb-10">
          <div className="text-center border-r border-slate-100 last:border-0 py-2">
            <span className="block text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Budget</span>
            <span className="block text-base md:text-2xl font-black text-slate-800 mt-1">${trip.budget}</span>
          </div>
          <div className="text-center border-r border-slate-100 last:border-0 py-2">
            <span className="block text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</span>
            <span className="block text-base md:text-2xl font-black text-slate-800 mt-1">{trip.days} Days</span>
          </div>
          <div className="text-center border-r border-slate-100 last:border-0 py-2">
            <span className="block text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Style</span>
            <span className="block text-sm md:text-xl font-extrabold text-indigo-700 mt-1.5 capitalize truncate px-1">{trip.travelStyle}</span>
          </div>
        </div>

        {/* Itinerary Container */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              Detailed Route Plan
            </h2>
            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
              {trip.itinerary?.length || 0} PHASES
            </span>
          </div>

          {trip.itinerary && trip.itinerary.length > 0 ? (
            <div className="relative border-l-2 border-slate-200/80 ml-4 md:ml-6 space-y-10 group">
              {trip.itinerary.map((day) => {
                const activities = day.activities as {
                  places: { name: string; image?: string }[];
                  food: string[];
                  tips: string[];
                };

                return (
                  <div key={day.id} className="relative pl-6 md:pl-10 transition-all duration-300">
                    
                    {/* Animated Timeline Node */}
                    <span className="absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-slate-300 ring-4 ring-slate-50 group-hover:border-indigo-500 transition-colors duration-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-500 transition-colors" />
                    </span>

                    {/* Main Day Card */}
                    <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100/80 hover:shadow-md hover:border-slate-200/60 transition-all duration-300">
                      
                      {/* Day Header */}
                      <div className="mb-4">
                        <h3 className="text-xl font-black text-slate-950 tracking-tight">
                          Day {day.dayNumber}
                        </h3>
                        {day.notes && (
                          <p className="mt-2 text-white text-sm leading-relaxed italic bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-3.5 rounded-xl border border-slate-100/50">
                            "{day.notes}"
                          </p>
                        )}
                      </div>

                      {/* Places to Visit Breakdown */}
<div className="mb-8">
  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
     Places to Explore
  </h4>
  
  {activities?.places?.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
      {activities.places.map((place: any, i: number) => (
        <div 
          key={i} 
          className="group flex items-center gap-4 p-2.5 bg-slate-100 border border-slate-100/90 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100/80 transition-all duration-300 relative overflow-hidden"
        >
          {/* Left Panel: Image Wrapper with uniform dimension handling */}
          <div className="w-30 h-30 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative shadow-inner">
            {place.image ? (
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl bg-slate-100 text-slate-400">
                🗺️
              </div>
            )}
          </div>
          
          {/* Right Panel: Content with visual hierarchy and clean truncation safeguards */}
          <div className="flex-1 min-w-0 pr-2">
            <span className="block text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1 opacity-70">
              Spot {i + 1}
            </span>
            <h5 className="font-extrabold text-slate-900 text-base leading-snug tracking-tight break-words line-clamp-2 group-hover:text-indigo-950 transition-colors">
              {place.name}
            </h5>
            
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-slate-100/50">
      No specific spots outlined for today.
    </p>
  )}
</div>

                      {/* Food & Tips Split Layout */}
                      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-sm">
                        
                        {/* Food Info */}
                        <div className="space-y-1.5">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-600">
                             Culinary Picks
                          </span>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {activities?.food?.length > 0 ? (
                              activities.food.map((dish, idx) => (
                                <span key={idx} className="bg-amber-50/60 text-amber-800 px-2.5 py-1 rounded-lg text-1xl font-medium border border-amber-100/60">
                                  {dish}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-slate-400 italic">No dining suggestions logged.</span>
                            )}
                          </div>
                        </div>

                        {/* Tips Info */}
                        <div className="space-y-1.5">
                          <span className="font-bold text-slate-800 flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-600">
                            Local Insights
                          </span>
                          {activities?.tips?.length > 0 ? (
                            <ul className="space-y-1.5 text-slate-600 pt-1">
                              {activities.tips.map((tip, idx) => (
                                <li key={idx} className="text-1xl leading-relaxed flex items-start gap-1.5">
                                  <span className="text-emerald-500 mt-0.5">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-slate-400 italic pt-1">No tips for this leg of the trip.</p>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 shadow-inner">
              <span className="text-4xl block mb-2">📭</span>
              <p className="text-slate-400 text-sm font-medium">No itinerary data could be retrieved.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}