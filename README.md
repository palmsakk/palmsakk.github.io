# PalmSakk — Personal Space

A small static link-in-bio site. Plain HTML, CSS and JavaScript, with no build step and no dependencies.

```
palmsakk/
├── index.html            ← page structure + meta tags
├── favicon.svg
├── og-image.png          ← preview image used when the link is shared
└── assets/
    ├── img/palm.jpg      ← your photo
    ├── css/style.css     ← all styling (colour tokens at the top)
    └── js/
        ├── config.js     ← ✏️ EDIT THIS: links, email, text
        └── main.js       ← renders the links (no need to touch)
```

## 1. Add your real links

Open `assets/js/config.js` and fill in:

| Field | Example |
|---|---|
| Instagram `url` | `https://www.instagram.com/your_handle/` |
| TikTok `url` | `https://www.tiktok.com/@your_handle` |
| Contact `email` | `palmsakk.work@gmail.com` (a free Gmail is fine) |

Anything left as `""` is **hidden on the live site**. When you preview on your own computer, it shows as **NOT LINKED YET** so you can see what's missing. You can change this with `hideUnlinked` in the same file.
Web links must start with `https://`. On phones, Instagram and TikTok links open in the app when it is installed.

The Contact row has a **COPY** button. Email links often don't open from inside the TikTok or Instagram app, so visitors can copy the address instead.

**Photo:** your photo is `assets/img/palm.jpg` (360 × 480, about 50KB). To change it, replace that file with another portrait image of the same shape. To remove it, set `photo.src` to `""` in `config.js`.

To add YouTube or Lemon8 later, copy the commented example at the bottom of `links`. The `01 — 0N` counter updates on its own.

## 2. Preview locally

The site is static, so you can just double-click `index.html`. Or, to serve it the way GitHub Pages will:

```bash
cd palmsakk
python3 -m http.server 8000
# open http://localhost:8000
```

To check it on your phone, connect it to the same Wi-Fi and open `http://<your-computer-ip>:8000`.

## 3. Deploy free on GitHub Pages

1. Create a free account at github.com. Choose the username **`palmsakk`** if it's available, because your username becomes your web address.
2. Click **New repository** and name it exactly **`palmsakk.github.io`**. Set it to **Public**.
3. Click **Add file → Upload files**, drag in *everything inside* the `palmsakk` folder (`index.html` must be at the top level), and click **Commit changes**.
4. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, then select **main** and **/ (root)**, and click **Save**.
5. After about a minute, your site is live at **https://palmsakk.github.io**
6. Paste that URL into your TikTok bio.

To update later, edit `config.js` on GitHub (pencil icon) and commit. The site updates within a minute.

### If you end up with a different username
`index.html` is already set up for `https://palmsakk.github.io/`, which controls the preview card shown when the link is shared. If your username is different, find and replace `palmsakk.github.io` in `index.html` with `<your-username>.github.io` (and name the repo `<your-username>.github.io` too).

## Notes
- Fonts: Space Grotesk and Noto Sans JP (only the 12 Japanese characters used are downloaded), both free from Google Fonts.
- No tracking or analytics.
- Respects "Reduce motion". Keyboard focus is visible. Rows are 72px+ tall tap targets.
- Small grey text uses `#5E6D82`, a slightly deeper version of the slate colour, so it passes WCAG AA contrast. `#718197` is still used for larger and decorative text.
