# We Deliver website

Publish the contents of this folder as a standalone GitHub repository. These are production-built static assets for the existing We Deliver business, vehicle owner/driver and separate administrator websites.

## Publish on GitHub Pages

1. Create a GitHub repository, for example `we-deliver-web`.
2. Upload this folder's contents to the repository root. Include the hidden `.github` folder and `.nojekyll` file. Do not upload the whole We Deliver workspace.
3. Use `main` as the branch name. Open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Open **Actions → Publish We Deliver website** and run it if needed. After deployment, GitHub displays the website address.

Typical addresses:

- Public website: `https://YOUR-USERNAME.github.io/we-deliver-web/`
- Business registration: `https://YOUR-USERNAME.github.io/we-deliver-web/#/account/register/business`
- Owner/driver registration: `https://YOUR-USERNAME.github.io/we-deliver-web/#/account/register/partner`
- Separate admin website: `https://YOUR-USERNAME.github.io/we-deliver-web/admin/`

Relative assets and hash routing support repository subfolders. The admin URL is separate, but access control is enforced by the API, not by hiding the page.

## Connect the live service

Your supplied website domain is `https://wedeleever.com/`. The API health check at `https://wedeleever.com/api/health` could not be verified during preparation, so this export leaves the API configuration blank. The website domain alone does not confirm where the backend is hosted. If your host serves the API at `/api`, use `https://wedeleever.com/api`; otherwise use the actual API subdomain/path supplied by the API host.

To use your existing domain with GitHub Pages, set `wedeleever.com` under the repository's **Settings → Pages → Custom domain**, follow GitHub's displayed DNS instructions in your domain provider, and enable HTTPS when the certificate is ready. Changing DNS will move visitors away from the existing website, so do this only when you are ready to replace it. Until then, use the GitHub Pages address for preview.

Edit `config.js` and set `apiUrl` to the hosted HTTPS API address ending in `/api`, for example `https://api.yourdomain.com/api`. This is public configuration. Never include MySQL credentials, Flutterwave secrets, `.env`, SQL exports or database backups in this repository.

GitHub Pages hosts the website only. MySQL and the Node API must run on another host. Without a configured API, this package displays a preview notice and online account/delivery/payment operations are unavailable.

### Login across domains

The existing API uses `SameSite=Lax` session cookies. A default `github.io` website and an API on an unrelated domain will not reliably support authenticated requests even if CORS is configured. For the existing session design, use a custom website domain such as `app.yourdomain.com` and an API such as `api.yourdomain.com`, both HTTPS. Add the exact website origin to API `ALLOWED_ORIGINS` and set `COOKIE_SECURE=true` on the API. Alternatively, arrange a reviewed same-origin API proxy. This package does not weaken the current cookie security settings.

Configure Flutterwave's webhook separately on the hosted API; the GitHub Pages address cannot receive payment webhook POST requests. Verify real sign-in, role permissions, uploads, deliveries and payments after connecting the API.

## Update the website

From the original workspace's `mobile-app` folder, run `node scripts/build-github.cjs` and upload the changed assets to this repository. An existing `config.js` is preserved unless `WEB_API_URL` is supplied when building. This export does not modify Android assets.
