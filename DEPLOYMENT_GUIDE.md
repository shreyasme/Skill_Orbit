# SkillOrbit Deployment Guide

## Backend Deployment (Render)

### Step 1: Prepare Your Repository
✅ Already done - Your code is pushed to GitHub

### Step 2: Sign Up/Login to Render
1. Go to [https://render.com](https://render.com)
2. Sign up or login (you can use your GitHub account)

### Step 3: Create a New Web Service
1. Click **"New +"** button in the top right
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select the repository: `SkillOrbit--MiniProject`
5. Click **"Connect"**

### Step 4: Configure the Service
Fill in the following details:

- **Name**: `skillorbit-backend` (or any name you prefer)
- **Region**: Choose closest to you (e.g., Oregon, Singapore)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free`

### Step 5: Add Environment Variables
Click **"Advanced"** and add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` (Render uses this by default) |
| `MONGODB_URI` | Your MongoDB connection string (e.g., from MongoDB Atlas) |
| `JWT_SECRET` | A secure random string (e.g., `your_super_secret_jwt_key_12345`) |
| `JWT_EXPIRES` | `24h` |
| `GROQ_API_KEY` | Your actual Groq API key |

### Step 6: Deploy
1. Click **"Create Web Service"**
2. Wait for the deployment to complete (5-10 minutes)
3. Copy your backend URL (e.g., `https://skillorbit-backend.onrender.com`)

**Important Notes:**
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Your backend URL will be: `https://your-service-name.onrender.com`

---

## Frontend Deployment (Vercel)

### Step 1: Sign Up/Login to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Sign up or login with your GitHub account

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository: `SkillOrbit--MiniProject`
3. Click **"Import"**

### Step 3: Configure Project
Fill in the following:

- **Framework Preset**: `Vite`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | Your Render backend URL + `/api` (e.g., `https://skillorbit-backend.onrender.com/api`) |

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for deployment (2-5 minutes)
3. Your app will be live at: `https://your-project-name.vercel.app`

### Step 6: Update Backend CORS
After deployment, you need to update your backend to allow requests from Vercel:

1. Go to your Render dashboard
2. Select your backend service
3. Go to **Environment** tab
4. Add a new environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your Vercel URL (e.g., `https://your-project-name.vercel.app`)
5. Update your backend CORS configuration to use this URL

---

## MongoDB Setup (if not done)

### Option 1: MongoDB Atlas (Recommended - Free)
1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free
3. Create a new cluster (Free tier: M0)
4. Create a database user
5. Whitelist all IPs: `0.0.0.0/0` (for Render to connect)
6. Get your connection string
7. Replace `<password>` with your database user password
8. Use this as `MONGODB_URI` in Render

---

## Post-Deployment Checklist

### Backend (Render)
- [ ] Service is deployed and running
- [ ] All environment variables are set
- [ ] MongoDB connection is working
- [ ] API endpoints are accessible

### Frontend (Vercel)
- [ ] Site is deployed and accessible
- [ ] Environment variable `VITE_API_BASE_URL` points to Render backend
- [ ] Can login/register successfully
- [ ] API calls are working

### Testing
1. Open your Vercel URL
2. Try to register a new user
3. Login with the user
4. Test main features (assessment, learning path, etc.)

---

## Troubleshooting

### Backend Issues
- **503 Service Unavailable**: Service is sleeping (free tier), wait 30-60 seconds
- **MongoDB Connection Error**: Check MONGODB_URI and IP whitelist
- **Environment Variables**: Verify all required variables are set in Render

### Frontend Issues
- **API Calls Failing**: Check `VITE_API_BASE_URL` is correct
- **CORS Errors**: Update backend CORS to allow your Vercel domain
- **Build Failures**: Check build logs in Vercel dashboard

### Common Fixes
1. **Clear cache and redeploy** in Render/Vercel
2. **Check logs** in respective dashboards
3. **Verify environment variables** are set correctly
4. **Test backend API** directly using Postman/curl

---

## Useful Commands

### Test Backend API
```bash
# Health check
curl https://your-backend.onrender.com/api/health

# Test registration
curl -X POST https://your-backend.onrender.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123"}'
```

### Local Testing with Production URLs
Create `.env` files:

**backend/.env**
```
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRES=24h
GROQ_API_KEY=your_groq_api_key
NODE_ENV=development
```

**frontend/.env**
```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

---

## Cost Breakdown

### Free Tier Limits
- **Render**: 750 hours/month (enough for 1 service 24/7)
- **Vercel**: Unlimited deployments, 100GB bandwidth
- **MongoDB Atlas**: 512MB storage (M0 cluster)

### Paid Options (if needed)
- **Render**: $7/month for always-on service
- **Vercel**: $20/month Pro plan (more bandwidth)
- **MongoDB Atlas**: $9/month for M2 cluster

---

## Support & Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

---

Good luck with your deployment! 🚀
