# Khan Abdullah All Noman | Engineering portfolio

A static React portfolio. Node.js 24 and npm are used to build and preview the site.

## Run locally

```sh
npm ci
npm run dev
```

Run `npm run build` to generate the site in `dist/`. Run `npm run preview` to preview that build locally.

## Publish with GitHub Pages

1. Upload or push this project to a GitHub repository, including `.github/workflows/pages.yml`.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** under **Source**.
3. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow** and select the default branch. Future pushes to that branch deploy automatically.
4. Open the published URL from the workflow's deployment or the repository's Pages settings.

The workflow runs npm on GitHub's runner and publishes the static output. It uses the Pages base path for links and assets. The build creates an HTML entry point for each portfolio route so shared links and page refreshes work directly.

Résumé and report downloads are served as PDFs. The contact form opens a prefilled message in the visitor's email app. Visitors send the message from that app.
