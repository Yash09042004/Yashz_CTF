Deployment steps

Backend (Render):
1. Push code to GitHub.
2. On Render, create a new "Web Service".
   - Connect your GitHub account and select this repo.
   - Set the root to `/backend`.
   - Start command: `node server.js`.
   - Environment variables: `MONGODB_URI` with your MongoDB connection string.
3. Deploy.

Frontend (Vercel):
1. On Vercel, create a new project and import this GitHub repo.
   - Set the root folder to `/frontend`.
   - Build command: `npm run build`.
   - Output Directory: `dist`.
   - Environment vars: `VITE_API_URL` set to your Render backend URL.
2. Deploy.

Notes:
- Remove `backend/.env` from the repository and set env vars on Render.
- Use a GitHub Personal Access Token to authenticate if prompted during git push.
