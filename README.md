# Personal Website – Java + TypeScript

This project is a personal website powered by:

- **Java (Spring Boot)** backend exposing a small profile API.
- **TypeScript + React + Vite** frontend with animated/moving components.

The default content is configured for **Mehar Chatha**, but you can easily customise it.

---

## Structure

- `backend/` – Java Spring Boot API serving profile data at `/api/profile`.
- `frontend/` – React + TypeScript single-page app with animated sections.

---

## Backend (Java / Spring Boot)

### Prerequisites

- Java 17+
- Maven

### Run

```bash
cd "backend"
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`.

API endpoint:

- `GET /api/profile` – returns JSON profile data (name, title, skills, projects, etc.).

---

## Frontend (TypeScript + React + Vite)

### Prerequisites

- Node.js 18+ (recommended)
- npm or yarn or pnpm

### Install & run (with npm)

```bash
cd "frontend"
npm install
npm run dev
```

The development server will start on `http://localhost:5173`.

The frontend expects the backend at `http://localhost:8080/api/profile`. If the backend is not running, it falls back to built-in demo data.

---

## Customisation

- **Profile copy**: edit either:
  - Backend: `ProfileController` in `backend/src/main/java/com/meharchatha/personalwebsite/controller/ProfileController.java`, or
  - Frontend fallback data: in `frontend/src/App.tsx` (inside the `catch` block of the `fetch` call).
- **Animations & styles**: edit `frontend/src/styles.css`.
- **Layout/content structure**: update `frontend/src/App.tsx`.

---

## Production build

### Frontend

```bash
cd "frontend"
npm run build
```

This will create a production build in `frontend/dist/`.

### Backend

```bash
cd "backend"
mvn clean package
```

This will create a jar in `backend/target/` that you can run with `java -jar`.


