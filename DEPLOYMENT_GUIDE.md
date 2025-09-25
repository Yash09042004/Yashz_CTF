# Manual Deployment Guide

## Backend Deployment (Render)

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub account and select the repository: `Yash09042004/Yashz_CTF`
4. Configure the service:
   - **Name**: wargames-backend
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: (leave empty)
   - **Start Command**: `node server.js`
5. Add Environment Variables:
   - **MONGODB_URI**: `mongodb+srv://yashkiran2004:thor@cluster0.zkumq4a.mongodb.net/wargames?retryWrites=true&w=majority`
6. Click "Create Web Service"
7. Note the deployed URL (e.g., https://wargames-backend-xxxx.onrender.com)

## Frontend Deployment (Vercel)

1. Go to https://vercel.com and sign up/login
2. Click "New Project"
3. Import your GitHub repository: `Yash09042004/Yashz_CTF`
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   - **VITE_API_URL**: (use the Render URL from step 7 above)
6. Click "Deploy"

## Testing

1. Once both are deployed, visit your Vercel frontend URL
2. Try submitting a score to test the connection to MongoDB
3. Check that the leaderboard displays correctly

## Important Notes

- The backend `.env` file is ignored by git for security
- Environment variables are set in the respective dashboards
- Make sure your MongoDB allows connections from all IPs (0.0.0.0/0) for cloud deployments
