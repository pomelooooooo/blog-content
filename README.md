# Blog Content API

NestJS REST API for blog content management. Built to serve the [blog-content-front](https://github.com/pomelooooooo/blog-content-front) Next.js frontend.

## Tech Stack

- **NestJS 11** — API framework
- **Prisma 7** — ORM (PostgreSQL)
- **Passport + JWT** — Authentication
- **Swagger** — API documentation
- **Docker Compose** — Local development

## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (for local database)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

### 3. Start the database

```bash
docker compose up -d db
```

### 4. Run migrations and seed

```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

### 5. Start the API

```bash
npm run start:dev
```

The API runs at **http://localhost:3001** and Swagger docs at **http://localhost:3001/api**.

## Running with Docker (full stack)

```bash
docker compose up -d
```

This starts both PostgreSQL and the API together.

## Default Admin Account

| Field    | Value            |
|----------|------------------|
| Email    | admin@blog.com   |
| Password | P@ssw0rd         |

## API Endpoints

### Auth

| Method | Path             | Auth   | Description              |
|--------|------------------|--------|--------------------------|
| POST   | `/auth/login`    | Public | Login, returns JWT token |
| POST   | `/auth/register` | Public | Register a new admin     |
| GET    | `/auth/profile`  | Bearer | Get current admin info   |

### Posts

| Method | Path               | Auth   | Description         |
|--------|--------------------|--------|---------------------|
| GET    | `/posts`           | Public | List all posts      |
| GET    | `/posts/:id`       | Public | Get post by ID      |
| GET    | `/posts/slug/:slug`| Public | Get post by slug    |
| POST   | `/posts`           | Bearer | Create a post       |
| PATCH  | `/posts/:id`       | Bearer | Update a post       |
| DELETE | `/posts/:id`       | Bearer | Delete a post       |

Query parameter: `?published=true` to filter published posts only.

### Categories

| Method | Path               | Auth   | Description            |
|--------|--------------------|--------|------------------------|
| GET    | `/categories`      | Public | List all categories    |
| GET    | `/categories/:id`  | Public | Get category with posts|
| POST   | `/categories`      | Bearer | Create a category      |
| PATCH  | `/categories/:id`  | Bearer | Update a category      |
| DELETE | `/categories/:id`  | Bearer | Delete a category      |

### Tags

| Method | Path          | Auth   | Description        |
|--------|---------------|--------|--------------------|
| GET    | `/tags`       | Public | List all tags      |
| GET    | `/tags/:id`   | Public | Get tag with posts |
| POST   | `/tags`       | Bearer | Create a tag       |
| PATCH  | `/tags/:id`   | Bearer | Update a tag       |
| DELETE | `/tags/:id`   | Bearer | Delete a tag       |

## Database Schema

```
Post ──── Category (many-to-one)
Post ──── Tag (many-to-many via PostTag)
Admin (standalone)
```

## Scripts

| Command                | Description                        |
|------------------------|------------------------------------|
| `npm run start:dev`    | Start in watch mode                |
| `npm run build`        | Build for production               |
| `npm run start:prod`   | Run production build               |
| `npm run prisma:migrate` | Run database migrations          |
| `npm run prisma:seed`  | Seed database with sample data     |
| `npm run prisma:studio`| Open Prisma Studio (DB GUI)        |
| `npm run docker:up`    | Start Docker containers            |
| `npm run docker:down`  | Stop Docker containers             |

## Deploy to Production (Vercel + Supabase)

1. Create a project on [Supabase](https://supabase.com)
2. Set these environment variables in Vercel:

| Variable       | Value                                          |
|----------------|------------------------------------------------|
| `DATABASE_URL` | Supabase Transaction URL (port 6543, `?pgbouncer=true`) |
| `DIRECT_URL`   | Supabase Session URL (port 5432)               |
| `JWT_SECRET`   | A strong random secret                         |

3. Run migrations against production:

```bash
DATABASE_URL="<supabase-direct-url>" npx prisma migrate deploy
```

## License

ISC
