# 🔧 Render Deployment - Step by Step Guide

## Complete Backend Deployment on Render

---

## ⏱️ Time Required: 15-20 minutes

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] GitHub account with your code pushed
- [ ] MongoDB connection string ready (see MongoDB section below if you don't have it)
- [ ] Groq API key (get from https://console.groq.com)
- [ ] A secure JWT secret (any random string like `mySecretKey123!@#$%`)

---

## 🚀 Part 1: Create Render Account

### Step 1: Go to Render Website
1. Open your browser
2. Navigate to: **https://render.com**
3. You should see the Render homepage

### Step 2: Sign Up
1. Click the **"Get Started"** or **"Sign Up"** button (top right corner)
2. You'll see sign-up options:
   - **Choose: "Sign up with GitHub"** (recommended)
   - OR use email if you prefer

### Step 3: Authorize GitHub (if using GitHub sign-up)
1. Click **"Sign up with GitHub"**
2. GitHub will ask for permission
3. Click **"Authorize Render"**
4. You may need to enter your GitHub password

### Step 4: Complete Profile
1. Render may ask for additional information
2. Fill in:
   - Your name
   - Email (auto-filled from GitHub)
3. Click **"Complete Sign Up"**

### Step 5: Verify Email
1. Check your email inbox
2. Look for email from Render
3. Click the verification link
4. You'll be redirected to Render dashboard

✅ **Checkpoint:** You should now see the Render Dashboard

---

## 🔗 Part 2: Connect GitHub Repository

### Step 6: Access Dashboard
1. You should be on the Render Dashboard
2. URL should be: `https://dashboard.render.com`

### Step 7: Create New Web Service
1. Look for the **"New +"** button (top right corner)
2. Click **"New +"**
3. A dropdown menu appears
4. Click **"Web Service"**

### Step 8: Connect GitHub Account (if not already connected)
1. You'll see "Connect a repository" page
2. If GitHub is not connected:
   - Click **"Connect GitHub"**
   - Authorize Render to access your repositories
   - Select "All repositories" or "Only select repositories"
3. Click **"Install & Authorize"**

### Step 9: Select Your Repository
1. You'll see a list of your GitHub repositories
2. Find: **"SkillOrbit--MiniProject"**
3. Click **"Connect"** button next to it

✅ **Checkpoint:** You should now see the configuration page

---

## ⚙️ Part 3: Configure Web Service

### Step 10: Basic Settings

**Name:**
- Field: "Name"
- Enter: `skillorbit-backend`
- (You can use any name, but this is recommended)

**Region:**
- Field: "Region"
- Select: **"Oregon (US West)"** or closest to you
- Options: Oregon, Frankfurt, Singapore, Ohio
- (Free tier available in all regions)

**Branch:**
- Field: "Branch"
- Should auto-select: `main`
- (This is your GitHub branch)

**Root Directory:**
- Field: "Root Directory"
- Enter: `backend`
- ⚠️ **IMPORTANT:** This tells Render to look in the backend folder

**Runtime:**
- Field: "Runtime"
- Should auto-detect: **"Node"**
- If not, select "Node" from dropdown

### Step 11: Build & Start Commands

**Build Command:**
- Field: "Build Command"
- Enter: `npm install`
- (This installs all dependencies)

**Start Command:**
- Field: "Start Command"
- Enter: `npm start`
- (This runs your server)

### Step 12: Select Plan

**Plan:**
- Scroll down to "Plan" section
- Select: **"Free"**
- Shows: "$0/month"
- Note: Free tier sleeps after 15 min inactivity

✅ **Checkpoint:** Basic configuration is complete

---

## 🔐 Part 4: Add Environment Variables

### Step 13: Open Advanced Settings
1. Look for **"Advanced"** button
2. Click **"Advanced"** to expand
3. You'll see "Environment Variables" section

### Step 14: Add Environment Variables

Click **"Add Environment Variable"** button for each variable below:

#### Variable 1: NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`
- Click **"Add Environment Variable"** again

#### Variable 2: PORT
- **Key:** `PORT`
- **Value:** `10000`
- Click **"Add Environment Variable"** again

#### Variable 3: MONGODB_URI
- **Key:** `MONGODB_URI`
- **Value:** `mongodb+srv://username:password@cluster.mongodb.net/skillorbit`
- ⚠️ **Replace with your actual MongoDB connection string**
- See "MongoDB Setup" section below if you don't have this
- Click **"Add Environment Variable"** again

#### Variable 4: JWT_SECRET
- **Key:** `JWT_SECRET`
- **Value:** `your_super_secret_jwt_key_change_this_12345`
- ⚠️ **Use a secure random string**
- Suggestion: Use a password generator or random string
- Click **"Add Environment Variable"** again

#### Variable 5: JWT_EXPIRES
- **Key:** `JWT_EXPIRES`
- **Value:** `24h`
- Click **"Add Environment Variable"** again

#### Variable 6: GROQ_API_KEY
- **Key:** `GROQ_API_KEY`
- **Value:** `gsk_your_actual_groq_api_key_here`
- ⚠️ **Replace with your actual Groq API key**
- Get from: https://console.groq.com
- Click **"Add Environment Variable"** (last one)

### Step 15: Review Environment Variables

You should now have **6 environment variables** listed:
```
✓ NODE_ENV = production
✓ PORT = 10000
✓ MONGODB_URI = mongodb+srv://...
✓ JWT_SECRET = your_secret_key
✓ JWT_EXPIRES = 24h
✓ GROQ_API_KEY = gsk_...
```

✅ **Checkpoint:** All environment variables are added

---

## 🚀 Part 5: Deploy Your Service

### Step 16: Create Web Service
1. Scroll to the bottom of the page
2. Review all settings one more time
3. Click the big **"Create Web Service"** button
4. You'll be redirected to your service page

### Step 17: Wait for Deployment
1. You'll see "Deploy in progress" status
2. Watch the logs in real-time:
   - Installing dependencies...
   - Building...
   - Starting server...
3. This takes **5-10 minutes** for first deployment
4. ☕ Grab a coffee!

### Step 18: Deployment Status

**Watch for these log messages:**
```
==> Cloning from https://github.com/...
==> Checking out commit...
==> Running build command 'npm install'...
==> Build successful
==> Starting service with 'npm start'...
==> Server running on http://localhost:10000
==> Your service is live 🎉
```

### Step 19: Verify Deployment Success
1. Look at the top of the page
2. Status should change to: **"Live"** (green dot)
3. You'll see your service URL
4. Format: `https://skillorbit-backend.onrender.com`

✅ **Checkpoint:** Your backend is deployed!

---

## 🧪 Part 6: Test Your Backend

### Step 20: Copy Your Backend URL
1. At the top of the service page
2. You'll see your URL: `https://skillorbit-backend-xxxx.onrender.com`
3. Click the **copy icon** or select and copy the URL
4. Save this URL - you'll need it for Vercel!

### Step 21: Test in Browser
1. Open a new browser tab
2. Paste your backend URL
3. You should see: **"Skill Matrix Backend running 🚀"**
4. If you see this, your backend is working!

### Step 22: Test API Endpoint
1. Add `/api/test` to your URL
2. Full URL: `https://your-backend.onrender.com/api/test`
3. Press Enter
4. You should see a JSON response like:
```json
{
  "message": "API is working!",
  "timestamp": "2025-11-10T..."
}
```

### Step 23: Test Health Check (if available)
1. Try: `https://your-backend.onrender.com/api/health`
2. Or: `https://your-backend.onrender.com/api/roles`
3. Should return data or "working" message

✅ **Checkpoint:** Backend is responding correctly!

---

## 🔄 Part 7: Add Frontend URL (Do this AFTER deploying frontend)

### Step 24: Go Back to Render Dashboard
1. Navigate to: https://dashboard.render.com
2. Click on your service: **"skillorbit-backend"**

### Step 25: Go to Environment Tab
1. Look for tabs: Overview | Events | Logs | Shell | **Environment**
2. Click **"Environment"** tab

### Step 26: Add Frontend URL Variable
1. Scroll down to "Environment Variables"
2. Click **"Add Environment Variable"**
3. **Key:** `FRONTEND_URL`
4. **Value:** `https://your-project-name.vercel.app`
5. ⚠️ **Replace with your actual Vercel URL** (after you deploy frontend)
6. Click **"Save Changes"**

### Step 27: Wait for Auto-Redeploy
1. Render will automatically redeploy your service
2. Wait 2-3 minutes
3. Status will show "Deploying..." then "Live"

✅ **Checkpoint:** CORS is configured for your frontend!

---

## 📊 Part 8: Monitor Your Service

### Step 28: Check Logs
1. Click **"Logs"** tab
2. You'll see real-time logs
3. Look for any errors (red text)
4. Successful startup shows:
   ```
   🚀 Server running on http://localhost:10000
   ✅ MongoDB connected successfully
   ```

### Step 29: View Metrics (Optional)
1. Click **"Metrics"** tab (if available)
2. See CPU, Memory, and Request metrics
3. Useful for monitoring performance

### Step 30: Set Up Notifications (Optional)
1. Go to service **"Settings"**
2. Scroll to "Notifications"
3. Add your email for deployment notifications

---

## 💾 MongoDB Atlas Setup (If You Don't Have Connection String)

### MongoDB Step 1: Create Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. Sign up with Google/GitHub or email
4. Verify your email

### MongoDB Step 2: Create Cluster
1. After login, click **"Build a Database"**
2. Choose **"M0 Free"** tier
3. Select cloud provider: **AWS** (recommended)
4. Select region: Closest to your Render region
5. Cluster name: `SkillOrbit` (or leave default)
6. Click **"Create"**
7. Wait 3-5 minutes for cluster creation

### MongoDB Step 3: Create Database User
1. You'll see "Security Quickstart"
2. **Username:** Enter `skillorbit_user`
3. **Password:** Click "Autogenerate Secure Password"
4. **IMPORTANT:** Copy and save this password!
5. Click **"Create User"**

### MongoDB Step 4: Set Network Access
1. Next screen: "Where would you like to connect from?"
2. Click **"Add My Current IP Address"**
3. Then click **"Add a Different IP Address"**
4. Enter: `0.0.0.0/0`
5. Description: `Allow from anywhere`
6. Click **"Add Entry"**
7. Click **"Finish and Close"**

### MongoDB Step 5: Get Connection String
1. Click **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Driver: **Node.js**
4. Version: **4.1 or later**
5. Copy the connection string:
   ```
   mongodb+srv://skillorbit_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Replace `<password>`** with your actual password
7. Add database name at the end:
   ```
   mongodb+srv://skillorbit_user:yourpassword@cluster0.xxxxx.mongodb.net/skillorbit?retryWrites=true&w=majority
   ```

### MongoDB Step 6: Test Connection
1. Use this connection string as `MONGODB_URI` in Render
2. After deployment, check Render logs
3. Should see: "✅ MongoDB connected successfully"

---

## 🔑 Groq API Key Setup (If You Don't Have It)

### Groq Step 1: Create Account
1. Go to: https://console.groq.com
2. Click **"Sign Up"** or **"Get Started"**
3. Sign up with Google/GitHub or email

### Groq Step 2: Get API Key
1. After login, go to **"API Keys"** section
2. Click **"Create API Key"**
3. Name: `SkillOrbit`
4. Click **"Create"**
5. **IMPORTANT:** Copy the API key immediately
6. It starts with: `gsk_...`
7. Save it securely - you can't see it again!

### Groq Step 3: Use in Render
1. Use this key as `GROQ_API_KEY` in Render environment variables

---

## 🎯 Common Issues & Solutions

### Issue 1: "Build Failed"
**Symptoms:** Red error in logs during build
**Solutions:**
- Check that Root Directory is set to `backend`
- Verify Build Command is `npm install`
- Check package.json exists in backend folder
- Look at error message for specific issue

### Issue 2: "Application Failed to Start"
**Symptoms:** Build succeeds but service won't start
**Solutions:**
- Check Start Command is `npm start`
- Verify all environment variables are set
- Check MongoDB connection string is correct
- Look at logs for specific error

### Issue 3: "MongoDB Connection Failed"
**Symptoms:** Error: "MongoServerError" in logs
**Solutions:**
- Verify MONGODB_URI is correct
- Check password in connection string (no < >)
- Ensure IP `0.0.0.0/0` is whitelisted in MongoDB
- Test connection string locally first

### Issue 4: "Service is Sleeping"
**Symptoms:** First request takes 30-60 seconds
**Solutions:**
- This is normal for free tier
- Service sleeps after 15 min inactivity
- First request wakes it up
- Consider upgrading to paid plan if needed

### Issue 5: "CORS Error" (after connecting frontend)
**Symptoms:** Frontend can't connect to backend
**Solutions:**
- Add `FRONTEND_URL` environment variable
- Value should be your Vercel URL
- Wait for auto-redeploy
- Check CORS settings in backend/src/app.js

### Issue 6: "Environment Variable Not Found"
**Symptoms:** Error: "JWT_SECRET is not defined"
**Solutions:**
- Go to Environment tab
- Verify all 6 variables are added
- Check spelling of variable names (case-sensitive)
- Save changes and wait for redeploy

---

## 📝 Quick Reference

### Your Render Service URLs
```
Dashboard: https://dashboard.render.com
Service: https://dashboard.render.com/web/[your-service-id]
Live URL: https://skillorbit-backend-xxxx.onrender.com
API Base: https://skillorbit-backend-xxxx.onrender.com/api
```

### Environment Variables Summary
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/skillorbit
JWT_SECRET=your_secure_random_string
JWT_EXPIRES=24h
GROQ_API_KEY=gsk_your_api_key
FRONTEND_URL=https://your-project.vercel.app (add after frontend deploy)
```

### Important Commands
```bash
# View logs in real-time
Click "Logs" tab in Render dashboard

# Manually redeploy
Click "Manual Deploy" → "Deploy latest commit"

# Access shell (paid plans only)
Click "Shell" tab
```

---

## ✅ Deployment Checklist

- [ ] Render account created
- [ ] GitHub repository connected
- [ ] Service configured (name, region, runtime)
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] All 6 environment variables added
- [ ] Service deployed successfully
- [ ] Status shows "Live" (green)
- [ ] Backend URL accessible in browser
- [ ] API endpoint returns response
- [ ] MongoDB connection working (check logs)
- [ ] Logs show no errors
- [ ] Backend URL saved for Vercel setup

---

## 🎉 Success!

If you've completed all steps and your service shows **"Live"** status with no errors in logs, congratulations! Your backend is successfully deployed on Render.

**Next Step:** Deploy your frontend on Vercel using the backend URL you just copied.

**Your Backend URL:** `https://skillorbit-backend-xxxx.onrender.com`

**Save this URL** - you'll need it for the `VITE_API_BASE_URL` environment variable in Vercel!

---

## 📞 Need Help?

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **Support:** support@render.com

---

**Estimated Total Time:** 15-20 minutes ⏱️

**Difficulty:** Beginner-friendly 🟢

**Cost:** Free tier (750 hours/month) 💰
