# 🤖 AI Product Reviews Summarizer

A fast, full-stack monorepo featuring a responsive **React** product storefront and a **Node.js** backend powered by **Prisma 7** and **PostgreSQL**. The application leverages **TanStack React Query** for asynchronous state management and features on-demand AI summaries of customer feedback.

---

## 📷 Application Preview

### Home Screen
![Products list with names and prices](./.github/app-screenshot-home.PNG)

### AI Product Reviews Summary
![AI Product Reviews Summary](./.github/app-screenshot.PNG)

### AI Product Reviews Summary Generate Screen (To generate summary on click)
![AI Product Reviews Summary](./.github/app-screenshot-generate.PNG)

---

## 🛠️ Tech Stack & Workspace Structure

This project is managed as a **Bun Monorepo**:

* **packages/client**: React (Vite) + Tailwind CSS + TanStack Query
* **packages/server**: Node.js Backend API (AI orchestration engine) and Prisma 7 Schema and Database Client
---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Bun](https://bun.sh) and [PostgreSQL](https://postgresql.org) installed and running on your machine.

### 2. Installation
Run the following commands in sequence to set up your root shared packages, frontend client, and backend server:

```bash
# 1. Install root dependencies
bun install

# 2. Setup the client package
cd packages/client && bun install

# 3. Setup the server package
cd packages/server && bun install
```

### 3. Environment Variables Setup (`.env`)
You need to provide your database connection credentials and your OpenAI platform API key. Create a `.env` file inside packages/server:

**Database Configuration:**
```env
DATABASE_URL="postgresql://YOUR_POSTGRES_USER:YOUR_POSTGRES_PASSWORD@localhost:5432/review_summarizer?schema=public"
```

**Backend OpenAPI Key:**
```env
OPENAI_API_KEY="your_actual_ai_api_key_here"
```
### 4. Database & Prisma ORM Setup

#### 🗄️ First-Time Database Setup (For Beginners)

If you are setting up this database for the first time, you need to apply the existing migration files to your PostgreSQL instance and explicitly generate the TypeScript client types for your workspaces.

Run these commands inside your database package:

```bash
cd packages/server

# 1. Runs your existing migration files to build the tables in your local DB
bunx prisma migrate dev

# 2. Explicitly generates the Prisma Client types inside your monorepo node_modules
bunx prisma generate
```

#### 🔄 Modifying the Database Later
If you ever change your `schema.prisma` file in the future, run the migration tool with a descriptive name, and regenerate the client types:

```bash
cd packages/server

# 1. Detects changes, creates a new migration file, and updates your DB
bunx prisma migrate dev --name describe_your_change

# 2. Re-generates the updated types for your frontend and backend
bunx prisma generate
```


## 🏃‍♂️ Running the App
Start both the React frontend and the Node.js backend simultaneously in development mode with a single command in root folder:

```bash
bun dev
```