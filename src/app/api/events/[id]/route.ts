import { Event } from "@/lib/events/event.model";
import { handleError } from "@/lib/utils/api";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id);
    const event = await Event.findById(id);

    if (event) {
      return Response.json({ data: event });
    } else {
      return Response.json({ error: "Event not found" }, { status: 404 });
    }
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id);
    const body = await request.json();
    const event = await Event.update(id, body);

    if (event) {
      return Response.json({ data: event });
    } else {
      return Response.json({ error: "Event not found" }, { status: 404 });
    }
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id);
    await Event.delete(id);

    return Response.json({ data: null });
  } catch (err) {
    return handleError(err);
  }
}
