import {prisma} from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

 if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }


    const body = await request.json();

    const trip = await prisma.trip.create({
        data : {
            destination : body.destination,
             budget: body.budget,
      days: body.days,
      travelStyle: body.travelStyle,
      userId: session.user.id, 
        }
    })

    return new Response(JSON.stringify(trip));
}



export async function GET() {

   try {
    // 1. Get the current active session on the server side
    const session = await getServerSession(authOptions);

    // 2.  If no user is logged in, block the request immediately
    if (!session || !session.user?.email) {
      return Response.json(
        { success: false, error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // 3. Find the user record in your database using their session email
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!dbUser) {
      return Response.json(
        { success: false, error: "User database profile not found" },
        { status: 404 }
      );
    }

    // 4.  Only fetch trips where the userId matches this logged-in user
    const userTrips = await prisma.trip.findMany({
      where: {
        userId: dbUser.id, 
      },
      orderBy: {
        createdAt: "desc", // Shows the newest trips first
      },
    });

    return Response.json({ success: true, trips: userTrips });
  }
   catch (error) {
    console.error("Database error fetching filtered trips:", error);
    return Response.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }


  }

   

  export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tripId } = await request.json();




    try {

await prisma.itinerary.deleteMany({
    where: {
      tripId: tripId, // Or whatever foreign key field name you have in your schema
    },
  });


      await prisma.trip.delete({
        where: {
          id: tripId,
        },
      });
      return Response.json({ success: true });
    } catch (error) {
      console.error("Error deleting trip:", error);
      return Response.json({ success: false, error: "Failed to delete trip" }, { status: 500 });
    }

  }