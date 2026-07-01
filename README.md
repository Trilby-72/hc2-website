# HC2 Consulting Website

Built with React + Vite. Deploy to Vercel in minutes.

---

## Deploy to Vercel (step-by-step)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher installed on your computer
- A free [GitHub](https://github.com) account
- A free [Vercel](https://vercel.com) account

---

### Step 1 — Install dependencies locally (optional, to test first)

```bash
npm install
npm run dev
```

Open http://localhost:5173 to preview the site locally.

---

### Step 2 — Push to GitHub

1. Go to [github.com](https://github.com) and create a new repository called `hc2-website`
2. Open a terminal in this folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hc2-website.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use "Continue with GitHub")
2. Click **"Add New Project"**
3. Select your `hc2-website` repository
4. Leave all settings as default — Vercel will detect Vite automatically
5. Click **"Deploy"**

Your site will be live at `https://hc2-website.vercel.app` within about 60 seconds.

---

### Step 4 — Connect a custom domain (e.g. hc2consulting.com.au)

1. Purchase your domain from a registrar (e.g. [VentraIP](https://ventraip.com.au) or [Crazy Domains](https://www.crazydomains.com.au))
2. In Vercel, go to your project → **Settings** → **Domains**
3. Add your domain (e.g. `hc2consulting.com.au`)
4. Vercel will give you DNS records to add at your registrar
5. Add those records and wait up to 24 hours for DNS to propagate

---

### Updating the site

Any time you push changes to GitHub, Vercel will automatically redeploy:

```bash
git add .
git commit -m "Update site content"
git push
```

---

## Project structure

```
hc2-website/
├── index.html          # HTML entry point
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── vercel.json         # Vercel routing config
├── .gitignore
└── src/
    ├── main.jsx        # React entry point
    ├── index.css       # Base styles
    └── App.jsx         # Main website component
```
