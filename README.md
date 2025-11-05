# Legal Document Search Portal

Two services:

- backend: Express (TypeScript) running on port 4000
- frontend: Next.js (TypeScript + Tailwind) running on port 3000

## Local dev

Open two terminals.

### Backend

```bash
cd backend
npm install
npm run dev
# server on http://localhost:4000
```

### Frontend

cd frontend
npm install
npm run dev

# Run on http://localhost:3000

# Then open http://localhost:3000 — the UI will call the backend at http://localhost:4000/generate.

### Docker

You can build and run the services in containers.

### Backend

cd backend
docker build -t backend .
docker run -p 4000:4000 backend
