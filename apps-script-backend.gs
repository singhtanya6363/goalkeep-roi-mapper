/**
 * Goalkeep ROI Expectation Mapper — Google Sheets backend
 *
 * Setup:
 * 1. Create a Google Sheet for responses.
 * 2. In Extensions → Apps Script, paste this file.
 * 3. Replace PASTE_SPREADSHEET_ID_HERE with the Sheet ID.
 * 4. Deploy → New deployment → Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone with the link
 * 5. Copy the Web App URL and paste it into index.html:
 *    const SHEET_URL = 'YOUR_WEB_APP_URL';
 */

const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID_HERE';
const RESPONSE_SHEET_NAME = 'ROI Mapper Responses';

const HEADERS = [
  'submitted_at',
  'organisation',
  'engagement_date',
  'contact_name',
  'financial_expectations',
  'efficiency_expectations',
  'decision_expectations',
  'capacity_expectations',
  'all_expectations',
  'fin_current_funding',
  'fin_consultant_spend',
  'fin_funding_confidence',
  'eff_reporting_time',
  'eff_manual_work',
  'eff_data_access',
  'dec_data_use',
  'dec_decisions',
  'dec_confidence',
  'cap_comfort',
  'cap_dependency',
  'cap_training',
  'cap_staff_count',
  'raw_payload'
];

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Goalkeep ROI Mapper endpoint is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No POST body received.');
    }

    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getOrCreateResponseSheet_(ss);
    ensureHeaders_(sheet);

    const baseline = payload.baseline || {};
    const row = [
      new Date(),
      payload.organisation || '',
      payload.date || '',
      payload.contact || '',
      joinList_(payload.financial),
      joinList_(payload.efficiency),
      joinList_(payload.decision),
      joinList_(payload.capacity),
      joinList_(payload.all),
      baseline.fin_current_funding || '',
      baseline.fin_consultant_spend || '',
      baseline.fin_funding_confidence || '',
      baseline.eff_reporting_time || '',
      baseline.eff_manual_work || '',
      baseline.eff_data_access || '',
      baseline.dec_data_use || '',
      baseline.dec_decisions || '',
      baseline.dec_confidence || '',
      baseline.cap_comfort || '',
      baseline.cap_dependency || '',
      baseline.cap_training || '',
      baseline.cap_staff_count || '',
      JSON.stringify(payload)
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateResponseSheet_(ss) {
  return ss.getSheetByName(RESPONSE_SHEET_NAME) || ss.insertSheet(RESPONSE_SHEET_NAME);
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
}

function joinList_(value) {
  return Array.isArray(value) ? value.join(' | ') : '';
}