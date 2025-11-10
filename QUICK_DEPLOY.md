# Quick Deployment Steps

## 🚀 Backend on Render

1. **Go to Render**: https://render.com
2. **New Web Service** → Connect GitHub → Select `SkillOrbit--MiniProject`
3. **Configure**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your_mongodb_atlas_connection_string>
   JWT_SECRET=<generate_a_secure_random_string>
   JWT_EXPIRES=24h
   GROQ_API_KEY=<your_groq_api_key>
   ```
5. **Deploy** → Copy your backend URL (e.g., `https://skillorbit-backend.onrender.com`)

---

## 🌐 Frontend on Vercel

1. **Go to Vercel**: https://vercel.com
2. **Import Project** → Select `SkillOrbit--MiniProject`
3. **Configure**:
   - Root Directory: `frontend`
   - Framework: `Vite`
4. **Add Environment Variable**:
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
   ```
5. **Deploy** → Your app is live!

---

## 📝 Post-Deployment

1. **Update Backend**: Add `FRONTEND_URL` environment variable in Render with your Vercel URL
2. **Test**: Open your Vercel URL and try registering/logging in
3. **Done!** ✅

---

## 💾 MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster (M0)
3. Create database user
4. Network Access → Add IP: `0.0.0.0/0`
5. Copy connection string → Use as `MONGODB_URI`

---

## 🔑 Important URLs

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Groq Console**: https://console.groq.com

---

See `DEPLOYMENT_GUIDE.md` for detailed instructions and troubleshooting.
