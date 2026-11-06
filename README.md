# Sujit Moharkar — Portfolio

Static site in HTML, CSS and vanilla JavaScript. No frameworks, no build step.

## Run locally
Open `index.html`, or run `python3 -m http.server` in this folder.

## Edit
- Photo: replace `assets/profile.png` (transparent PNG, about 767x1200). The hero animation uses its proportions.
- Resume: replace `assets/resume.pdf`.
- Project links: add GitHub or demo links in `index.html` once they exist (the Snaxora and MeetMind repo URLs are not on your resume, so they currently point to your GitHub profile).
- Expertise text: the `D` array in `script.js`.

## Deploy to GitHub Pages
1. Push these files to the root of a repo, e.g. `sujit-portfolio`.
2. Settings → Pages → Source: `main` / root.
3. Live at `https://sujit3233.github.io/sujit-portfolio/`.

Fonts load from Google Fonts with system fallbacks. Motion respects `prefers-reduced-motion`; the custom cursor is disabled on touch devices.
