import { pgTable, serial, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  location: varchar({ length: 255 }).notNull(),
  description: text(),
  startAt: timestamp().notNull(),
  endAt: timestamp().notNull(),
  allDay: boolean().notNull().default(false),
});
