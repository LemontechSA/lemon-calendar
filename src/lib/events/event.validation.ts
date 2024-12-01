import { z } from "zod";

const eventSchema = z.object({
  title: z.string().max(255),
  location: z.string().max(255),
  description: z.string().optional(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  allDay: z.boolean().optional(),
});

export const createEventSchema = eventSchema.refine((data) => data.startAt < data.endAt, {
  message: "End date cannot be after start date",
  path: ["endAt"],
});

export const updateEventSchema = eventSchema
  .partial()
  .refine((data) => !data.startAt || !data.endAt || data.startAt < data.endAt, {
    message: "End date cannot be after start date",
    path: ["endAt"],
  });

export type ICreateEvent = z.infer<typeof createEventSchema>;
export type IUpdateEvent = z.infer<typeof updateEventSchema>;
