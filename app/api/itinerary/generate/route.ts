import { generateTripPlan } from "@/lib/gemini";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getPlaceImage } from "@/lib/pexels";



export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { destination, budget, days, travelStyle } = await req.json();

  const prompt = `
Generate a ${days}-day trip itinerary of ${destination} and please include local attractions, restaurants, and travel tips and not include any neighboring cities/countries.

Return ONLY valid JSON.

{
  "itinerary": [
    {
      "day": 1,
      "title": "Day title",
      "places": ["Place 1", "Place 2"],
      "food": ["Food 1"],
      "tips": ["Tip 1"]
    }
  ]
}

No markdown.
No explanations.
No extra text.
`;


const aiResponse = await generateTripPlan(prompt);

const itineraryData = JSON.parse(aiResponse);

console.log("AI Response:", aiResponse);
console.log("Parsed:", itineraryData);
console.log("Type:", typeof itineraryData);
console.log("Is Array:", Array.isArray(itineraryData));


  const trip = await prisma.trip.create({
    data: {
      destination,
      budget,
      days,
      travelStyle,
      userId: session.user.id,
    },
  });




const Days = Array.isArray(itineraryData)
  ? itineraryData
  : itineraryData.itinerary;

console.log("Days:", Days);

if (!Array.isArray(Days)) {
  throw new Error(
    `Expected itinerary array but got: ${JSON.stringify(itineraryData)}`
  );
}


const enrichedDays = await Promise.all(
  Days.map(async (day: any) => {
    const placesWithImages = await Promise.all(
      day.places.map(async (place: string) => ({
        name: place,
        image: await getPlaceImage(place),
      }))
    );

    return {
      tripId: trip.id,
      dayNumber: day.day,
      activities: {
        places: placesWithImages,
        food: day.food,
        tips: day.tips,
      },
      notes: day.title,
    };
  })
);


await prisma.itinerary.createMany({
  data: enrichedDays,
});

return Response.json({ success: true, tripId: trip.id });

  }

    

    catch (error) {
        console.error(error);
        return Response.json({ error: "Failed to generate itinerary" }, { status: 500 });
    }
   
}