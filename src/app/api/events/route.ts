import { Event } from "@/lib/events/event.model";
import { handleError } from "@/lib/utils/api";

export async function GET() {
  try {
    const events = await Event.findAll();

    return Response.json({ data: events });
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = await Event.create(body);

    return Response.json({ data: event });
  } catch (err) {
    return handleError(err);
  }
}
