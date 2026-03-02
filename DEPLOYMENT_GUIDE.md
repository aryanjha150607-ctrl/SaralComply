# SaralComply Final Deployment Guide

Follow this step-by-step guide to take your compliance platform from your local machine to the live internet.

---

## Step 1: Push to GitHub

First, we need to store your code in a Git repository so Vercel and Render can access it.

1.  **Initialize Git:**
    Open your terminal in the root folder (`c:\Users\ajha1\SaralComply_V2`) and run:
    ```bash
    git init
    git add .
    git commit -m "Initial commit of SaralComply MVP"
    ```
2.  **Create a GitHub Repository:**
    Log in to [GitHub](https://github.com/) and create a new repository named `SaralComply`. **Do not** initialize it with a README, .gitignore, or license.
3.  **Push the Code:**
    Copy the commands provided by GitHub under "…or push an existing repository from the command line" and run them. It will look like this:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/SaralComply.git
    git branch -M main
    git push -u origin main
    ```

---

## Step 2: Deploy Backend to Render.com

We deploy the backend first so we can get its live URL to provide to the frontend.

1.  **Log in to Render:** Go to [Render.com](https://render.com/) and sign up/log in with GitHub.
2.  **Create a New Web Service:**
    - Click **New +** and select **Web Service**.
    - Connect your `SaralComply` GitHub repository.
3.  **Configure the Service:**
    - **Name:** `saralcomply-backend`
    - **Root Directory:** Edit this to be `backend` (this is crucial since it's a monorepo).
    - **Environment:** Select **Docker** (Render will automatically detect the `Dockerfile` we created).
    - **Region / Instance Type:** Select the Free tier (or your preferred tier).
4.  **Set Environment Variables:**
    Scroll down to **Advanced** -> **Add Environment Variable**. Add the following:
    - `PORT`: `3001`
    - `GEMINI_API_KEY`: *(Paste your actual Google AI Studio key here)*
    - `DATABASE_URL`: `file:./dev.db` *(Note: For the Free tier, any uploaded PDFs or Tasks saved here will be wiped when the server restarts. See `backend/DB_MIGRATION.md` to set up persistent Postgres later).*
5.  **Deploy:** Click **Create Web Service**. 
6.  **Get the Backend URL:** Once deployed, Render will give you a live URL (e.g., `https://saralcomply-backend-xxx.onrender.com`). Copy this.

---

## Step 3: Deploy Frontend to Vercel

Now, we deploy the Next.js frontend and connect it to your live backend.

1.  **Log in to Vercel:** Go to [Vercel.com](https://vercel.com/) and log in with GitHub.
2.  **Add New Project:** Click **Add New...** -> **Project**.
3.  **Import Repository:** Import your `SaralComply` GitHub repository.
4.  **Configure the Project:**
    - **Framework Preset:** Vercel should automatically detect **Next.js**.
    - **Root Directory:** Click **Edit** and select the `frontend` folder.
5.  **Set Environment Variables:**
    To connect the frontend to the backend, you need an environment variable. Open the **Environment Variables** tab.
    - Name: `NEXT_PUBLIC_API_URL`
    - Value: Paste the Render URL from Step 2 (e.g., `https://saralcomply-backend-xxx.onrender.com`).
6.  **Deploy:** Click **Deploy**. Vercel will build and launch your site.

---

## Step 4: Verify the Live Connection

1.  ### Update Frontend API Calls (Crucial Final Step)
    Currently, the React components in `frontend/src/app/page.tsx`, `history/page.tsx`, etc., are hardcoded to `http://localhost:3001`. 
    
    Before pushing your final commit, you must replace `http://localhost:3001` with `process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'`. 
    
    *Example:*
    ```typescript
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${API_URL}/api/tasks`);
    ```

2.  ### Test the Application
    Once you update the URLs and push the changes to GitHub (which auto-triggers Vercel/Render rebuilds), visit your live Vercel URL. Add a new task or upload a PDF to confirm the frontend correctly communicates with the Render backend!
