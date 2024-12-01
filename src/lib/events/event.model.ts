import "server-cli-only";
import { eq } from "drizzle-orm";
import { IEvent } from "./interfaces";
import { db } from "../db";
import { events } from "../db/schema";
import { createEventSchema, ICreateEvent, IUpdateEvent, updateEventSchema } from "./event.validation";

export class Event implements IEvent {
  id: number;
  title: string;
  location: string;
  description: string | null;
  startAt: Date;
  endAt: Date;
  allDay: boolean;

  constructor(event?: Partial<IEvent>) {
    this.id = event?.id ?? 0;
    this.title = event?.title ?? "";
    this.location = event?.location ?? "";
    this.description = event?.description ?? null;
    this.allDay = event?.allDay ?? false;
    this.startAt = event?.startAt ?? new Date();
    this.endAt = event?.endAt ?? new Date();
    this.setAllDay();
  }

  static async findById(id: number) {
    const [found] = await db.select().from(events).where(eq(events.id, id)).execute();
    if (!found) return null;
    return new Event(found);
  }

  static async findAll() {
    const found = await db.select().from(events).orderBy(events.startAt).execute();
    return found.map((event) => new Event(event));
  }

  static async create(dto: ICreateEvent) {
    const data = await createEventSchema.parseAsync(dto);
    const event = new Event(data);
    console.log("INSERTING", event.values);
    const [inserted] = await db.insert(events).values(event.values).returning().execute();
    return new Event(inserted);
  }

  static async update(id: number, dto: IUpdateEvent) {
    const event = await Event.findById(id);
    if (!event) return null;

    const data = await updateEventSchema.parseAsync(dto);
    event.update(data);
    const [updated] = await db.update(events).set(event.values).where(eq(events.id, id)).returning().execute();

    return new Event(updated);
  }

  static async delete(id: number) {
    await db.delete(events).where(eq(events.id, id)).execute();
  }

  update(dto: IUpdateEvent) {
    Object.assign(this, dto);
    this.setAllDay();
  }

  get values() {
    return {
      title: this.title,
      location: this.location,
      description: this.description,
      startAt: this.startAt,
      endAt: this.endAt,
      allDay: this.allDay,
    };
  }

  private setAllDay() {
    if (this.allDay) {
      this.startAt.setHours(0, 0, 0, 0);
      this.endAt.setHours(23, 59, 59, 999);
    }
  }
}
