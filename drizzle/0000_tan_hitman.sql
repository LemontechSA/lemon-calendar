CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"description" text,
	"startAt" timestamp NOT NULL,
	"endAt" timestamp NOT NULL,
	"allDay" boolean DEFAULT false NOT NULL
);
