# Uganda Revision Hub — starter release

## Included
- `index.html` — responsive public resource library with search and filters.
- `download.html` — details page that opens the selected source in a new tab.
- `p7.html`, `s4.html`, `s6.html` — dedicated PLE, UCE and UACE candidate preparation pages.
- `admin.html` — local resource manager with add/edit/delete and JSON import/export.
- `styles.css` — shared responsive styling.
- `resources.json` — starter resource directory data for reference/maintenance.

## Important about real papers
The starter list uses links to external revision libraries and the official UNEB website, not invented individual PDF URLs. Class cards cover P1–P7 and S1–S6, with separate candidate corners for P7, S4 and S6. The links are resource collections and are not guarantees that every class, subject, answer key or paper year is available. The exact PDFs available at those sites can change. Verify permissions/terms and check that resources match the syllabus before linking a specific paper. To add a direct PDF, use its actual share/download URL in Admin.

## Preview locally
Open `index.html` in a modern browser. For a more reliable local preview, run a static server from this folder (for example `python -m http.server 8000`) and visit `http://localhost:8000`.

## How edits are stored right now
The admin tool saves to browser `localStorage`. That is local to the browser/device and origin. It does **not** publish changes to every visitor. Export a JSON backup, then update the bundled starter list or deploy a backend before public multi-user use.

## Security before launch
This is a static prototype. The admin page has no real authentication or authorization; anyone who can reach it may use its local content tools. Do not rely on a front-end password or hidden link as security. Before public launch, put admin routes behind server-side authentication and role checks, store resources in a database, validate writes on the server, and use HTTPS. A backend such as Supabase/Firebase or a small API can provide this.

## Hosting
Upload the contents of this folder to a static host such as GitHub Pages, Netlify, or Cloudflare Pages for a public preview. Configure the site root to this folder. For a live admin that updates everyone’s copy, complete backend authentication/database integration first.

## Contact placeholder
The footer contact currently uses `hello@example.com`; replace it with the project owner’s real contact before publishing. The WhatsApp number in `download.html` is the number from the original uploaded files; change it if it is not the intended public support number.
