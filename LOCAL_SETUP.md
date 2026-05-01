# Local Setup Guide - BioTechVet

This guide will help you set up the development environment on your local machine.

## Prerequisites

- **Node.js**: 20.x or higher
- **pnpm**: 10.x or higher
- **Docker & Docker Desktop**: Required for running the database locally.

## 1. Setup Infrastructure (Database)

We use Docker Compose to run PostgreSQL easily.

```bash
# Start the database (PostgreSQL)
docker-compose up -d
```

- **PostgreSQL**: Accessible at `localhost:5434` (User: `postgres`, Pass: `123456`, DB: `biotechvet`).

## 2. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env .env.local
   ```
2. Verify the following variables in `.env.local`:
   ```env
   DATABASE_URL="postgresql://postgres:123456@127.0.0.1:5434/biotechvet?schema=public"
   
   # Storage (Using local public/uploads)
   NEXT_PUBLIC_STORAGE_URL="/uploads"
   ```

## 3. Install & Initialize Application

```bash
# 1. Install dependencies
pnpm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Push schema to database
npx prisma db push

# 4. Seed initial data (Crucial!)
pnpm run db:seed
```

## 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 5. Troubleshooting

### Reset Database
If you want to clear the database and start fresh:
```bash
npx prisma migrate reset
```

### Port Conflicts
If port `5434` is already in use, change it in `docker-compose.yml` and update your `.env.local` accordingly.
