# Kakes by Khushi 🎂

A modern, single-page website for **Kakes by Khushi** — freshly baked, 100% Pure Veg
custom cakes, cupcakes, dessert jars, Jain cakes and pastries in Hyderabad.

Built as a lightweight static site (HTML + CSS + vanilla JS), ready to deploy to
**Cloudflare Pages**.

## 📁 Project structure

```
kakesbykhushi/
├── index.html      # The whole page (hero, about, why-us, menu, areas, order, footer)
├── styles.css      # Styling + responsive layout
├── script.js       # Mobile nav, sticky navbar, scroll reveal
├── _headers        # Cloudflare Pages security & cache headers
├── assets/
│   └── poster.png  # Brand poster
└── README.md
```

## 🖥️ Preview locally

No build step needed. Just open `index.html` in a browser, or serve it:

```bash
# Python (already on macOS)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🚀 Deploy to Cloudflare Pages

### Option A — Connect a Git repo (recommended)

1. Push this folder to a GitHub/GitLab repository.
2. In the [Cloudflare dashboard](https://dash.cloudflare.com) go to
   **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repo. Use these build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (the repo root)
4. Click **Save and Deploy**. Every push to the branch auto-deploys.

### Option B — Direct upload with Wrangler (no Git)

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name=kakes-by-khushi
```

### Custom domain

After the first deploy, open the Pages project → **Custom domains** → add your domain
(e.g. `kakesbykhushi.com`) and follow the DNS instructions.

## ✏️ Editing content

- **Phone / WhatsApp:** search `919174080087` in `index.html`.
- **Instagram:** search `kakes_by_khushi` in `index.html`.
- **Menu items / areas / copy:** edit directly in `index.html`.
- **Colors & fonts:** tweak the `:root` variables at the top of `styles.css`.
- **Poster image:** replace `assets/poster.png` (keep the same name, or update the
  `src` in `index.html`).

---

Made with 💛 for Khushi Jain · 100% Pure Veg · Hyderabad
