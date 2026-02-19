#!/bin/bash

# =============================================
# GenBridge Frontend Setup & Git Instructions
# =============================================
# Run this script from your project root (the folder containing pom.xml)

set -e

echo ""
echo "====================================="
echo "  GenBridge Frontend Setup Script"
echo "====================================="
echo ""

# ── STEP 1: Create and switch to feature branch ──
echo "► Step 1: Creating branch feature/UI..."
git checkout -b feature/UI
echo "✅ Switched to new branch: feature/UI"
echo ""

# ── STEP 2: Copy the frontend folder into the project root ──
echo "► Step 2: The 'frontend' folder should already be present."
echo "   (If running manually, copy the frontend/ folder into your project root)"
echo ""

# ── STEP 3: Verify folder structure ──
if [ -d "frontend" ]; then
  echo "✅ frontend/ folder found"
else
  echo "⚠️  frontend/ folder not found — make sure to copy it to your project root"
  echo "   Expected structure:"
  echo "   your-project/"
  echo "   ├── frontend/      ← place it here"
  echo "   ├── src/"
  echo "   └── pom.xml"
  exit 1
fi

# ── STEP 4: Install frontend dependencies ──
echo ""
echo "► Step 3: Installing frontend dependencies..."
cd frontend
npm install
echo "✅ Dependencies installed"
cd ..
echo ""

# ── STEP 5: Stage all changes ──
echo "► Step 4: Staging all files for commit..."
git add frontend/
git add .
echo "✅ Files staged"
echo ""

# ── STEP 6: Commit ──
echo "► Step 5: Committing..."
git commit -m "feat: add React frontend with Home, Login, Register, Dashboard pages

- Set up Vite + React project in /frontend directory
- Home page with hero section, features grid, stats, CTA banner
- Login page with JWT-backed authentication and error handling
- Register page with client-side validation and password strength meter
- Dashboard page (protected) showing user profile and module cards
- Shared design system: Syne + DM Sans fonts, dark theme, CSS variables
- API service layer using Axios with JWT auto-attach interceptor
- React Router for client-side navigation
- Responsive layout for mobile and desktop"

echo "✅ Committed"
echo ""

# ── STEP 7: Push branch ──
echo "► Step 6: Pushing branch to origin..."
git push origin feature/UI
echo "✅ Branch pushed to GitHub"
echo ""

echo "====================================="
echo "  ✅ All done! Next steps:"
echo "====================================="
echo ""
echo "  1. Go to your GitHub repository"
echo "  2. You'll see a banner: 'feature/UI had recent pushes'"
echo "  3. Click 'Compare & pull request'"
echo "  4. Set:"
echo "     - Base branch: main (or master)"
echo "     - Compare:     feature/UI"
echo "  5. Title:    feat: Add React frontend (Home, Login, Register, Dashboard)"
echo "  6. Description: (paste the commit message above)"
echo "  7. Click 'Create pull request'"
echo ""
echo "  To run the frontend locally:"
echo "    cd frontend"
echo "    npm run dev"
echo "  Then open: http://localhost:5173"
echo ""
echo "  Make sure your Spring Boot backend is running on port 8080 first!"
echo ""
