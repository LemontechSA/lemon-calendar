This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Lemon Calendar

## Project setup

1. Copy the environment file

```bash
cp .env.sample .env
```

2. Spin up the docker containers

```bash
docker compose up -d
```

3. Run database migrations (inside the container)

```bash
docker exec web sh
> npm run db:migrate
```

## Database Client

This projects comes with Drizzle Studio installed. You can access the client UI from the following url: https://local.drizzle.studio/?host=127.0.0.1&port=3001

## API Docs

### List all events

```bash
curl http://localhost:3000/api/events
```

### Get event details

```bash
curl http://localhost:3000/api/events/1
```

### Create a new event

```bash
curl -d '{"title":"My event", "location":"Santiago", "startAt": "2024-12-01T08:00:00", "endAt": "2024-12-01T10:00:00"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/events
```

### Update an existing event

```bash
curl -d '{"description":"My event description"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/events/1
```

### Delete an event

```bash
curl -X DELETE http://localhost:3000/api/events/1
```
