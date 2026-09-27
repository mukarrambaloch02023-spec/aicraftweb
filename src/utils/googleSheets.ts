import { Order, OrderStatus } from '../types';

export const GOOGLE_SHEET_ID_KEY = 'aicraft_google_sheet_id';
export const GOOGLE_SHEET_WEBHOOK_KEY = 'aicraft_sheet_webhook_url';

export const getStoredSheetId = (): string => {
  return localStorage.getItem(GOOGLE_SHEET_ID_KEY) || '';
};

export const saveStoredSheetId = (id: string): void => {
  localStorage.setItem(GOOGLE_SHEET_ID_KEY, id.trim());
};

export const getStoredWebhookUrl = (): string => {
  return localStorage.getItem(GOOGLE_SHEET_WEBHOOK_KEY) || '';
};

export const saveStoredWebhookUrl = (url: string): void => {
  localStorage.setItem(GOOGLE_SHEET_WEBHOOK_KEY, url.trim());
};

const SHEET_HEADERS = [
  'Order ID',
  'Date',
  'Client Name',
  'Phone / WhatsApp',
  'Email',
  'Service Package',
  'Requirement',
  'Budget (PKR)',
  'Status',
];

/**
 * Creates a brand new Google Sheet in the user's Google Drive with styled headers
 */
export async function createOrdersSpreadsheet(accessToken: string): Promise<{ id: string; url: string }> {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: 'AiCraftWeb - Customer Orders Database',
      },
      sheets: [
        {
          properties: {
            title: 'Orders',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create Google Sheet: ${errorText}`);
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;

  // Add Headers to row 1
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Orders!A1:I1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [SHEET_HEADERS],
      }),
    }
  );

  saveStoredSheetId(spreadsheetId);

  return {
    id: spreadsheetId,
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
  };
}

/**
 * Append an order row to the connected Google Sheet
 */
export async function appendOrderToGoogleSheet(
  accessToken: string,
  spreadsheetId: string,
  order: Order
): Promise<boolean> {
  if (!spreadsheetId) return false;

  const clientName = order.clientName || order.name || 'Anonymous';
  const phone = order.whatsapp || order.phone || '';
  const email = order.email || '';
  const service = order.serviceType || 'Custom Website';
  const requirement = order.requirement || '';
  const budget = order.totalPrice ?? order.budget ?? 0;
  const status = order.status || 'New';
  const dateStr = order.date || new Date().toLocaleString();

  const rowValues = [
    String(order.id),
    dateStr,
    clientName,
    phone,
    email,
    service,
    requirement,
    budget,
    status,
  ];

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:I:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    }
  );

  return response.ok;
}

/**
 * Fetch all orders from the connected Google Sheet
 */
export async function fetchOrdersFromGoogleSheet(
  accessToken: string,
  spreadsheetId: string
): Promise<Order[]> {
  if (!spreadsheetId) return [];

  // Read from row 2 onwards
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A2:I1000`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch orders from Google Sheet: ${errorText}`);
  }

  const data = await response.json();
  const rows: any[][] = data.values || [];

  const orders: Order[] = rows
    .filter((row) => row && row[0]) // must have Order ID
    .map((row) => {
      const id = row[0];
      const date = row[1] || '';
      const clientName = row[2] || 'Client';
      const phone = row[3] || '';
      const email = row[4] || '';
      const serviceType = row[5] || 'Standard Website';
      const requirement = row[6] || '';
      const budgetNum = Number(String(row[7]).replace(/[^0-9.-]+/g, '')) || 0;
      const status: OrderStatus = (row[8] as OrderStatus) || 'New';

      return {
        id: isNaN(Number(id)) ? id : Number(id),
        date,
        clientName,
        name: clientName,
        whatsapp: phone,
        phone,
        email,
        serviceType,
        requirement,
        budget: budgetNum,
        totalPrice: budgetNum,
        baseBudget: budgetNum,
        status,
        addons: {
          domain: false,
          management: false,
          runAds: false,
          createAdDesigns: false,
        },
      };
    })
    .reverse(); // Latest orders first

  return orders;
}

/**
 * Update an order's status in the Google Sheet
 */
export async function updateOrderStatusInGoogleSheet(
  accessToken: string,
  spreadsheetId: string,
  orderId: string | number,
  newStatus: OrderStatus
): Promise<boolean> {
  if (!spreadsheetId) return false;

  // First fetch rows to locate row index
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A2:A1000`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) return false;

  const data = await response.json();
  const idRows: any[][] = data.values || [];

  const rowIndex = idRows.findIndex((r) => r && String(r[0]) === String(orderId));
  if (rowIndex === -1) return false;

  const actualSheetRow = rowIndex + 2; // account for header (1) + 0-index offset

  const updateResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/I${actualSheetRow}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [[newStatus]],
      }),
    }
  );

  return updateResponse.ok;
}

/**
 * Send order to a Google Apps Script Webhook URL
 * This allows client-side orders from unauthenticated visitors on Vercel
 * to append straight into Google Sheets without needing individual Google logins!
 */
export async function sendOrderToWebhook(webhookUrl: string, order: Order): Promise<boolean> {
  if (!webhookUrl || !webhookUrl.startsWith('http')) return false;

  try {
    const payload = {
      id: order.id,
      date: order.date || new Date().toLocaleString(),
      name: order.clientName || order.name || 'Client',
      phone: order.whatsapp || order.phone || '',
      email: order.email || '',
      requirement: order.requirement || '',
      service: order.serviceType || 'Custom Website',
      budget: order.totalPrice ?? order.budget ?? 0,
      status: order.status || 'New',
    };

    // Use mode: 'no-cors' so Google Apps Script redirects don't block in browser
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (err) {
    console.warn('Webhook dispatch failed:', err);
    return false;
  }
}

/**
 * Clean Google Apps Script Template code that users can paste into Google Sheets:
 * Extensions > Apps Script > Paste > Deploy > New Deployment > Web app > Anyone
 */
export const GOOGLE_APPS_SCRIPT_TEMPLATE = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add header if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Order ID", "Date", "Client Name", "Phone / WhatsApp", "Email", "Service Package", "Requirement", "Budget (PKR)", "Status"]);
    }
    
    sheet.appendRow([
      data.id || new Date().getTime(),
      data.date || new Date().toLocaleString(),
      data.name || "Customer",
      data.phone || "",
      data.email || "",
      data.service || "Standard Website",
      data.requirement || "",
      data.budget || 0,
      data.status || "New"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var orders = [];
    
    for (var i = 1; i < rows.length; i++) {
      var r = rows[i];
      if (r[0]) {
        orders.push({
          id: r[0],
          date: r[1],
          clientName: r[2],
          name: r[2],
          whatsapp: r[3],
          phone: r[3],
          email: r[4],
          serviceType: r[5],
          requirement: r[6],
          totalPrice: Number(r[7]) || 0,
          budget: Number(r[7]) || 0,
          status: r[8] || "New"
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", orders: orders }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
