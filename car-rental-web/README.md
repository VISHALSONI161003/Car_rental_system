# LuxeRent - Premium Car Rental Platform

A modern, high-performance car rental web application built with **Next.js 15**, **Prisma**, and **three.js**-inspired CSS interactions.

## 🚀 Features

- **Premium UI**: Glassmorphism, Parallax effects, and 3D tilt cards.
- **User Accounts**: Secure authentication (Sign up/Login) with tracked sessions.
- **Real-time Availability**: Renting a car immediately updates its status in the database.
- **Dashboard**: Users can view active rentals and return cars.
- **Admin Ready**: Database schema supports fleet management.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: SQLite (via Prisma ORM)
- **Language**: TypeScript
- **Styling**: CSS Modules (Custom Design System)
- **Authentication**: JWT leveraging `jose` & HTTP-only cookies.

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/car-rental-web.git
    cd car-rental-web
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment**:
    Copy `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```

4.  **Initialize Database**:
    *Important: We use a custom Prisma Client path to avoid local environment issues.*
    ```bash
    # Generate the client
    npx prisma generate

    # Push schema to database
    npx prisma db push

    # Seed initial data
    node prisma/seed.js
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it.

## 📂 Project Structure

- \`src/app\`: App Router pages (Login, Dashboard, Rent, etc.)
- \`src/components\`: Reusable UI components (Navbar, 3DCard, etc.)
- \`src/lib\`: Utilities (Auth helper, Prisma client singleton)
- \`prisma\`: Database schema and seed script

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request
