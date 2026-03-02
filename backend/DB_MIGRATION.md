# SaralComply Database Migration Guide

This guide details the steps necessary to transition SaralComply from the local **SQLite** development database to a production-ready **PostgreSQL** instance on a hosting provider (like Render, Heroku, or Supabase).

## Why Migrate?
SQLite is excellent for local scaffolding (storing data in `dev.db`), but production environments require robust persistence that isn't lost when the server container reboots. PostgreSQL is highly scalable, supports complex queries natively, and is the industry standard for compliance engines.

## 4 Steps to Production Postgres

### 1. Acquire a Postgres Database URL
Provision a new PostgreSQL database on your preferred platform.
Retrieve the connection string, which typically looks like this:
`postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require`

### 2. Update the Prisma Schema
In your `backend/prisma/schema.prisma` file, change the `provider` block from `sqlite` to `postgresql`. 

```prisma
// /backend/prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 3. Update Environment Variables
In your production environment dashboard (e.g., the Render Dashboard for your web service), add the `DATABASE_URL` environment variable and paste in the connection string from Step 1. You no longer need `file:./dev.db`.

### 4. Deploy the Schema (Migrations)
Once the server code is deployed to your host, you need to structure the empty Postgres database.
In standard deployment pipelines, you can run:

```bash
npx prisma db push
```
This forces the live database to match the structure defined in your `schema.prisma`. 

> **Important Data Note**: Because SQLite and Postgres use fundamentally different data types under the hood, standard schema pushes will start with a completely fresh, empty database. Any mock tasks you created locally in `dev.db` will not automatically transfer. 
If you *must* preserve local data, you can use a script like `pgloader` or export your SQLite tables to CSVs and manually seed the Postgres instance. For a fresh production deployment, starting clean is recommended.
