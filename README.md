# GamingX - Integrated Gaming Ecosystem

A high-end, Cyberpunk-themed gaming platform with a real-time admin dashboard, secure checkout, and integrated database.

## Tech Stack
- **Frontend**: React (Vite) + CSS3
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Deployment**: Vercel

## Key Features
- **Neural Admin Hub**: Real-time stats, product CRUD, and system activity logs.
- **Secure Payment Gateway**: High-fidelity simulated checkout with multiple payment protocols.
- **Cyberpunk UI**: Glassmorphism, neon effects, and custom glitch animations.

## Deployment to Vercel

### 1. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **New Project**.
3. Select your GitHub repository: `Mahesh-sanaboina/gaming-project`.

### 2. Configure Monorepo
- Vercel should automatically detect the root `vercel.json`.
- Ensure the **Build Command** for the frontend is `npm run build` inside the `frontend` folder.
- **Output Directory**: `dist`.

### 3. Environment Variables
Add the following in Vercel project settings:
- `MONGO_URI`: Your MongoDB connection string.
- `PORT`: 5000 (standard for the backend).

### 4. Deploy
Click **Deploy**. Vercel will build the frontend and serve the backend via serverless functions as defined in `vercel.json`.

---
© 2026 GamingX Portal. [NEURAL_LINK_ESTABLISHED]
