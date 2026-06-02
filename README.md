# Goalkeep ROI Expectation Mapper — Published Artifact Package

This package contains a publish-ready static web artifact for the Goalkeep ROI Expectation Mapper.

## Files

- `index.html` — the web artifact to publish.
- `apps-script-backend.gs` — optional Google Apps Script backend to record responses in Google Sheets.

## What is already ready

The uploaded ROI mapper has been packaged as a standalone static page. It includes:

- Step 1: ROI expectation selection across Financial, Efficiency, Decision-making, and Capacity/Data Culture.
- Step 2: Baseline questions generated based on selected ROI categories.
- Step 3: Confirmation screen.
- Publication metadata for a cleaner web preview.
- A safer submission flow that warns if the Google Sheet endpoint fails.

## Before publishing for real response collection

The current `index.html` still needs a response endpoint. In the file, replace:

```js
const SHEET_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```

with your deployed Apps Script Web App URL.

## Google Sheets setup

1. Create a Google Sheet for responses.
2. Open **Extensions → Apps Script**.
3. Paste the code from `apps-script-backend.gs`.
4. Replace:

```js
const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID_HERE';
```

with your Sheet ID.
5. Deploy as a **Web app**.
6. Set:
   - Execute as: **Me**
   - Who has access: **Anyone with the link**
7. Copy the Web App URL into `index.html`.

## Publishing options

You can publish `index.html` as a static page using:

- Netlify Drop
- GitHub Pages
- Vercel
- Any static web hosting service

For a quick internal test, open `index.html` directly in your browser. For live use with clients, publish it on a hosted URL and connect the Apps Script endpoint first.

## Important note

If `SHEET_URL` is not replaced, users can still complete the flow, but their responses will not be saved to Google Sheets.
