# 🌐 Vercel Deployment - Step by Step Guide

## Complete Frontend Deployment on Vercel

---

## ⏱️ Time Required: 10-15 minutes

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] GitHub account with your code pushed
- [ ] Backend deployed on Render (completed RENDER_STEP_BY_STEP.md)
- [ ] Backend URL copied (e.g., `https://skillorbit-backend.onrender.com`)

---

## 🚀 Part 1: Create Vercel Account

### Step 1: Go to Vercel Website
1. Open your browser
2. Navigate to: **https://vercel.com**
3. You should see the Vercel homepage

### Step 2: Sign Up
1. Click **"Sign Up"** button (top right corner)
2. You'll see sign-up options:
   - **Choose: "Continue with GitHub"** (recommended)
   - OR use GitLab, Bitbucket, or Email

### Step 3: Authorize GitHub
1. Click **"Continue with GitHub"**
2. GitHub will ask for permission
3. Click **"Authorize Vercel"**
4. You may need to enter your GitHub password
5. GitHub may ask: "Install Vercel on your account"
6. Select: **"All repositories"** or **"Only select repositories"**
7. If selecting specific repos, choose: **"SkillOrbit--MiniProject"**
8. Click **"Install"**

### Step 4: Complete Setup
1. Vercel may ask for additional information
2. **Team Name:** Your name or project name (optional)
3. Click **"Continue"**

### Step 5: Welcome to Vercel
1. You'll see the Vercel Dashboard
2. URL: `https://vercel.com/dashboard`
3. May show a welcome tour (you can skip it)

✅ **Checkpoint:** You should now see the Vercel Dashboard

---

## 📦 Part 2: Import Your Project

### Step 6: Start Import
1. On the dashboard, look for **"Add New..."** button (top right)
2. Click **"Add New..."**
3. Dropdown menu appears
4. Click **"Project"**

### Step 7: Import Git Repository
1. You'll see "Import Git Repository" page
2. You should see your GitHub repositories listed
3. Look for: **"SkillOrbit--MiniProject"**
4. Click **"Import"** button next to it

**If you don't see your repository:**
1. Click **"Adjust GitHub App Permissions"**
2. Grant access to the repository
3. Come back and refresh

### Step 8: Configure Project
1. You'll be taken to "Configure Project" page
2. This is where you set up your frontend

✅ **Checkpoint:** You're on the Configure Project page

---

## ⚙️ Part 3: Configure Project Settings

### Step 9: Project Name
**Field: "Project Name"**
- Auto-filled from repository name
- Default: `skillorbit-miniproject` or similar
- You can change it to: `skillorbit` or `skillorbit-app`
- This will be part of your URL: `https://skillorbit.vercel.app`
- Click in the field to edit if needed

### Step 10: Framework Preset
**Field: "Framework Preset"**
- Vercel should auto-detect: **"Vite"**
- If not detected:
  - Click the dropdown
  - Select **"Vite"**
- This tells Vercel how to build your React app

### Step 11: Root Directory
**Field: "Root Directory"**
- Click **"Edit"** button next to Root Directory
- A dialog appears showing your project structure
- Select the **"frontend"** folder
- Click **"Continue"**
- ⚠️ **IMPORTANT:** This tells Vercel to look in the frontend folder

**You should see:**
```
Root Directory: frontend
```

### Step 12: Build and Output Settings
**These should be auto-detected:**

**Build Command:**
- Should show: `npm run build`
- Leave as is (auto-detected from package.json)

**Output Directory:**
- Should show: `dist`
- Leave as is (Vite builds to dist folder)

**Install Command:**
- Should show: `npm install`
- Leave as is

**If any are wrong, click "Override" and enter correct values**

✅ **Checkpoint:** All build settings are configured

---

## 🔐 Part 4: Add Environment Variables

### Step 13: Expand Environment Variables
1. Look for **"Environment Variables"** section
2. It may be collapsed
3. Click to expand it

### Step 14: Add Backend URL Variable

**Add your environment variable:**

1. **Key field:** Enter `VITE_API_BASE_URL`
2. **Value field:** Enter your Render backend URL + `/api`
   - Format: `https://your-backend.onrender.com/api`
   - Example: `https://skillorbit-backend.onrender.com/api`
   - ⚠️ **IMPORTANT:** Must end with `/api`
   - ⚠️ **IMPORTANT:** No trailing slash after `/api`

3. **Environment:** Leave all checked (Production, Preview, Development)

4. Click **"Add"** button

### Step 15: Verify Environment Variable

You should see:
```
✓ VITE_API_BASE_URL = https://skillorbit-backend.onrender.com/api
  Production, Preview, Development
```

**Double-check:**
- Spelling: `VITE_API_BASE_URL` (all caps, underscores)
- URL format: `https://your-backend.onrender.com/api`
- Ends with `/api`
- No trailing slash

✅ **Checkpoint:** Environment variable is added correctly

---

## 🚀 Part 5: Deploy Your Frontend

### Step 16: Start Deployment
1. Scroll to the bottom of the page
2. Review all settings one more time:
   - Project name ✓
   - Framework: Vite ✓
   - Root Directory: frontend ✓
   - Environment variable added ✓
3. Click the big **"Deploy"** button
4. You'll be redirected to deployment page

### Step 17: Watch Deployment Progress
1. You'll see deployment logs in real-time
2. Progress indicators:
   - **Building** (yellow dot)
   - **Deploying** (yellow dot)
   - **Ready** (green dot)

**Log messages you'll see:**
```
Cloning repository...
Installing dependencies...
Running build command...
npm run build
Building for production...
Build completed
Deploying...
Deployment completed
```

### Step 18: Wait for Completion
1. First deployment takes **2-5 minutes**
2. Watch the logs scroll
3. Look for any errors (red text)
4. ☕ Quick coffee break!

### Step 19: Deployment Success
1. When complete, you'll see: **"Congratulations!"** or similar message
2. Status changes to: **"Ready"** (green checkmark)
3. You'll see a preview image of your site
4. Your deployment URL is shown

✅ **Checkpoint:** Your frontend is deployed!

---

## 🌐 Part 6: Access Your Deployed Site

### Step 20: Get Your URL
1. At the top of the page, you'll see your domain
2. Format: `https://skillorbit-xxxx.vercel.app`
3. Or your custom name: `https://skillorbit.vercel.app`

### Step 21: Visit Your Site
1. Click on the URL or the preview image
2. Your site opens in a new tab
3. You should see your SkillOrbit landing page

### Step 22: Test Basic Functionality
1. **Landing Page:** Should load completely
2. **Navigation:** Click menu items
3. **Styling:** Check if CSS is loaded (colors, fonts)
4. **Images:** Verify images load

✅ **Checkpoint:** Frontend is accessible and looks correct

---

## 🧪 Part 7: Test Backend Connection

### Step 23: Test Registration
1. On your deployed site, click **"Register"** or **"Sign Up"**
2. Fill in the registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123!
3. Click **"Register"**

**Expected Results:**
- ✅ Success message appears
- ✅ Redirected to dashboard or login
- ❌ If error: Check browser console (F12)

### Step 24: Test Login
1. Go to **"Login"** page
2. Enter credentials:
   - Email: test@example.com
   - Password: Test123!
3. Click **"Login"**

**Expected Results:**
- ✅ Successfully logged in
- ✅ Redirected to dashboard
- ✅ User data loads
- ❌ If error: Check browser console

### Step 25: Check Browser Console
1. Press **F12** (or right-click → Inspect)
2. Go to **"Console"** tab
3. Look for errors (red text)
4. Check **"Network"** tab for failed API calls

**Common issues:**
- CORS error → Need to add FRONTEND_URL in Render
- 404 error → Check VITE_API_BASE_URL is correct
- Network error → Backend might be sleeping (wait 60 seconds)

✅ **Checkpoint:** Frontend can communicate with backend

---

## 🔄 Part 8: Update Backend CORS (Important!)

### Step 26: Copy Your Vercel URL
1. Copy your full Vercel URL
2. Example: `https://skillorbit.vercel.app`
3. ⚠️ **No trailing slash**

### Step 27: Go to Render Dashboard
1. Open new tab
2. Go to: https://dashboard.render.com
3. Click on your backend service: **"skillorbit-backend"**

### Step 28: Add Frontend URL
1. Click **"Environment"** tab
2. Scroll to "Environment Variables"
3. Click **"Add Environment Variable"**
4. **Key:** `FRONTEND_URL`
5. **Value:** Your Vercel URL (e.g., `https://skillorbit.vercel.app`)
6. Click **"Save Changes"**

### Step 29: Wait for Redeploy
1. Render will automatically redeploy
2. Status shows: "Deploying..."
3. Wait 2-3 minutes
4. Status changes to: "Live"

### Step 30: Test Again
1. Go back to your Vercel site
2. Try login/register again
3. Should work without CORS errors now

✅ **Checkpoint:** CORS is configured, frontend and backend connected!

---

## 📊 Part 9: Vercel Dashboard Features

### Step 31: Explore Your Project Dashboard
1. Go to: https://vercel.com/dashboard
2. Click on your project: **"skillorbit"**

**Tabs you'll see:**

**Deployments:**
- List of all deployments
- Current production deployment
- Preview deployments (from branches)

**Analytics (if enabled):**
- Page views
- Top pages
- Performance metrics

**Settings:**
- Project settings
- Environment variables
- Domains
- Git integration

### Step 32: View Deployment Details
1. Click on your latest deployment
2. You'll see:
   - Deployment URL
   - Build logs
   - Source (GitHub commit)
   - Build time
   - Deployment regions

### Step 33: Check Build Logs
1. Click **"Building"** or **"View Function Logs"**
2. See detailed build process
3. Useful for debugging build errors

---

## 🎨 Part 10: Custom Domain (Optional)

### Step 34: Add Custom Domain
1. Go to project **"Settings"**
2. Click **"Domains"** in sidebar
3. Click **"Add"**
4. Enter your domain: `skillorbit.com`
5. Follow DNS configuration instructions

**Note:** This requires owning a domain name

---

## 🔄 Part 11: Automatic Deployments

### Step 35: Understanding Auto-Deploy
**Vercel automatically deploys when you:**
- Push to `main` branch → Production deployment
- Push to other branches → Preview deployment
- Open pull request → Preview deployment

### Step 36: Test Auto-Deploy (Optional)
1. Make a small change locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test auto-deploy"
   git push origin main
   ```
3. Go to Vercel dashboard
4. You'll see new deployment starting automatically
5. Wait for completion

✅ **Checkpoint:** Auto-deployment is working

---

## 🎯 Part 12: Environment Variables Management

### Step 37: View Environment Variables
1. Go to project **"Settings"**
2. Click **"Environment Variables"** in sidebar
3. You'll see your `VITE_API_BASE_URL`

### Step 38: Edit Environment Variable (if needed)
1. Find the variable you want to edit
2. Click the **"..."** menu (three dots)
3. Click **"Edit"**
4. Update the value
5. Click **"Save"**
6. **Important:** You need to redeploy for changes to take effect

### Step 39: Redeploy After Changes
1. Go to **"Deployments"** tab
2. Click on latest deployment
3. Click **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Confirm redeploy
6. Wait for completion

---

## 🧪 Part 13: Final Testing

### Step 40: Complete Feature Test

**Test these features on your deployed site:**

1. **Landing Page**
   - [ ] Loads correctly
   - [ ] All sections visible
   - [ ] Navigation works

2. **Authentication**
   - [ ] Register new user
   - [ ] Login with credentials
   - [ ] Logout works

3. **Dashboard**
   - [ ] Loads after login
   - [ ] Shows user data
   - [ ] Navigation menu works

4. **Assessment**
   - [ ] Can start assessment
   - [ ] Questions load
   - [ ] Can submit answers
   - [ ] Results display

5. **Learning Path**
   - [ ] Generates learning path
   - [ ] Shows recommendations
   - [ ] Can view details

6. **Progress Tracking**
   - [ ] Shows progress
   - [ ] Updates correctly

7. **Reports**
   - [ ] Generates reports
   - [ ] Can download/view

### Step 41: Performance Check
1. Open your site
2. Press **F12** → **Network** tab
3. Reload page
4. Check:
   - Load time (should be < 3 seconds)
   - All resources load (green status)
   - No failed requests (red)

### Step 42: Mobile Responsiveness
1. Press **F12** → Click **device toggle** icon
2. Or resize browser window
3. Test on different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
4. Verify layout adapts correctly

✅ **Checkpoint:** All features working correctly!

---

## 🎯 Common Issues & Solutions

### Issue 1: "Build Failed"
**Symptoms:** Red error during build
**Solutions:**
- Check Root Directory is set to `frontend`
- Verify Build Command is `npm run build`
- Check package.json exists in frontend folder
- Review build logs for specific error
- Ensure all dependencies are in package.json

### Issue 2: "Environment Variable Not Working"
**Symptoms:** API calls fail, can't connect to backend
**Solutions:**
- Verify variable name: `VITE_API_BASE_URL` (exact spelling)
- Check value format: `https://backend.onrender.com/api`
- Must start with `VITE_` for Vite to recognize
- Redeploy after adding/changing variables
- Clear browser cache

### Issue 3: "CORS Error"
**Symptoms:** "Access-Control-Allow-Origin" error in console
**Solutions:**
- Add `FRONTEND_URL` in Render backend
- Value should be your Vercel URL
- No trailing slash
- Wait for Render to redeploy
- Clear browser cache and try again

### Issue 4: "404 Not Found on Refresh"
**Symptoms:** Page works initially but 404 on refresh
**Solutions:**
- This is already fixed by `vercel.json` file
- If still happening, check vercel.json exists in frontend folder
- Should have rewrites configuration

### Issue 5: "Blank Page / White Screen"
**Symptoms:** Site loads but shows nothing
**Solutions:**
- Check browser console for errors
- Verify build completed successfully
- Check if JavaScript files are loading
- Verify VITE_API_BASE_URL is correct
- Check for missing environment variables

### Issue 6: "Slow First Load"
**Symptoms:** Site takes long to load first time
**Solutions:**
- This is normal if Render backend is sleeping
- Free tier sleeps after 15 min inactivity
- First request wakes it up (30-60 seconds)
- Subsequent requests are fast
- Consider Render paid plan for always-on

---

## 📝 Quick Reference

### Your Vercel URLs
```
Dashboard: https://vercel.com/dashboard
Project: https://vercel.com/[username]/skillorbit
Live Site: https://skillorbit.vercel.app
```

### Environment Variables
```
VITE_API_BASE_URL=https://skillorbit-backend.onrender.com/api
```

### Important Files
```
frontend/vercel.json - Vercel configuration
frontend/package.json - Dependencies and scripts
frontend/.env.example - Environment variable template
```

### Useful Commands
```bash
# Local development
npm run dev

# Build locally (test before deploy)
npm run build

# Preview production build locally
npm run preview
```

---

## ✅ Deployment Checklist

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project imported
- [ ] Framework preset: Vite
- [ ] Root directory: frontend
- [ ] Environment variable added: VITE_API_BASE_URL
- [ ] Deployment successful
- [ ] Site accessible at Vercel URL
- [ ] Landing page loads correctly
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Dashboard loads with data
- [ ] API calls working (no CORS errors)
- [ ] FRONTEND_URL added in Render backend
- [ ] All features tested and working
- [ ] Mobile responsive
- [ ] No console errors

---

## 🎉 Success!

If you've completed all steps and can successfully:
- ✅ Access your site at Vercel URL
- ✅ Register and login
- ✅ Use all features without errors
- ✅ See data loading from backend

**Congratulations!** Your SkillOrbit application is fully deployed and live!

---

## 🌟 Next Steps

### 1. Share Your App
- Share your Vercel URL with others
- Get feedback from users
- Monitor usage in Vercel analytics

### 2. Custom Domain (Optional)
- Purchase a domain (e.g., skillorbit.com)
- Add it in Vercel settings
- Configure DNS records

### 3. Monitoring
- Enable Vercel Analytics
- Set up error tracking
- Monitor performance metrics

### 4. Optimization
- Review build size
- Optimize images
- Enable caching
- Consider CDN for assets

### 5. Continuous Improvement
- Fix bugs reported by users
- Add new features
- Push to GitHub (auto-deploys!)
- Monitor deployment logs

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **Community:** https://github.com/vercel/vercel/discussions

---

## 🔗 Important Links

| Service | URL | Purpose |
|---------|-----|---------|
| **Vercel Dashboard** | https://vercel.com/dashboard | Manage deployments |
| **Your Live Site** | https://skillorbit.vercel.app | Your app |
| **Render Backend** | https://skillorbit-backend.onrender.com | API server |
| **GitHub Repo** | https://github.com/Thanushreekp22/SkillOrbit--MiniProject | Source code |

---

**Estimated Total Time:** 10-15 minutes ⏱️

**Difficulty:** Beginner-friendly 🟢

**Cost:** Free (Unlimited deployments, 100GB bandwidth) 💰

---

**🎊 Your SkillOrbit app is now live and accessible to the world! 🎊**
