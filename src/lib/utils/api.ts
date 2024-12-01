import { ZodError } from "zod";

export function handleError(err: unknown) {
  if (err instanceof ZodError) {
    return Response.json({ error: err.message, details: err.flatten() }, { status: 400 });
  } else if (err instanceof Error) {
    return Response.json({ error: err.message }, { status: 500 });
  } else {
    return Response.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
