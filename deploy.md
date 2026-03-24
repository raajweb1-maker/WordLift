# Deploying WordLift

WordLift is configured to be seamlessly deployed on Vercel or any other modern hosting platform.

## GitHub Integration

1. Initialize git and commit your files:
   ```bash
   git add .
   git commit -m "Initial commit for WordLift"
   ```
2. Create a new repository on GitHub.
3. Push to your remote repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/yourusername/wordlift.git
   git push -u origin main
   ```

## Vercel Deployment

Once pushed to GitHub, Vercel will auto-detect the Next.js setup:
1. Go to [Vercel](https://vercel.com/new).
2. Connect your GitHub account and select your repository.
3. Vercel will automatically configure the build settings.
4. Click **Deploy**.

Alternatively, via Vercel CLI:
```bash
npx vercel
```

## Context on `vercel.json`
The project includes a `vercel.json` in the root folder. Next.js natively handles essentially all required Vercel configs via `next.config.mjs`, but the included `vercel.json` provides strict security headers out of the box for professional readiness.
