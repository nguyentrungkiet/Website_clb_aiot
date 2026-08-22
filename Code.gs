/**
 * ISA Lab Management System - Phase 1 & 2 API
 * Google Apps Script Web App
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Thay bằng ID của Google Sheet thực tế

function doGet(e) {
  const action = e.parameter.action;
  
  try {
    let result = {};
    
    switch (action) {
      case 'dashboard':
        result = getDashboardData();
        break;
      case 'assets':
        result = getAssets();
        break;
      case 'asset':
        result = getAsset(e.parameter.id);
        break;
      case 'inventory':
        result = getInventory();
        break;
      case 'projects':
        result = getProjects();
        break;
      default:
        return ContentService.createTextOutput(JSON.stringify({
          success: false, 
          message: 'Action không hợp lệ'
        })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: result
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheetData(sheetName) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  
  let headerRowIndex = 0;
  for (let i = 0; i < Math.min(10, data.length); i++) {
    const rowStr = data[i].join('').toLowerCase();
    if (rowStr.includes('asset_code') || rowStr.includes('tên thiết bị') || rowStr.includes('item_code') || rowStr.includes('project_id')) {
      headerRowIndex = i;
      break;
    }
  }
  
  const headers = data[headerRowIndex];
  const rows = [];
  
  for (let i = headerRowIndex + 1; i < data.length; i++) {
    const row = data[i];
    if (row.join('').trim() === '') continue;
    
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      if (headers[j]) {
        obj[headers[j]] = row[j];
      }
    }
    rows.push(obj);
  }
  
  return rows;
}

function getAssets() {
  const rawData = getSheetData('ASSETS');
  return rawData.map((row, index) => {
    const code = row['Asset_Code'] ? String(row['Asset_Code']).trim() : `NO-CODE-${index}`;
    return {
      code: code,
      name: row['Tên thiết bị'] || '',
      category: row['Nhóm'] || '',
      level: row['Cấp quản lý'] || '',
      location: row['Vị trí'] || '',
      status: row['Trạng thái'] || 'Unknown',
      condition: row['Tình trạng'] || '',
      project: row['Project đang dùng'] || '',
      holder: row['Chủ sở hữu'] || row['Người đang giữ'] || ''
    };
  }).filter(a => a.name !== '');
}

function getAsset(id) {
  const rawData = getSheetData('ASSETS');
  const row = rawData.find((r, index) => {
    const code = r['Asset_Code'] ? String(r['Asset_Code']).trim() : `NO-CODE-${index}`;
    return code === id;
  });
  
  if (!row) throw new Error('Không tìm thấy thiết bị');
  
  return {
    code: id,
    name: row['Tên thiết bị'] || '',
    category: row['Nhóm'] || '',
    level: row['Cấp quản lý'] || '',
    model: row['Hãng/Model'] || '',
    serial: row['Serial_Number'] || '',
    location: row['Vị trí'] || '',
    status: row['Trạng thái'] || 'Unknown',
    condition: row['Tình trạng'] || '',
    project: row['Project đang dùng'] || '',
    holder: row['Chủ sở hữu'] || row['Người đang giữ'] || '',
    notes: row['Ghi chú'] || '',
    image: row['Link hình ảnh'] || ''
  };
}

function getInventory() {
  const rawData = getSheetData('INVENTORY');
  return rawData.map(row => ({
    code: row['Item_Code'] || '',
    name: row['Tên vật tư'] || '',
    category: row['Nhóm'] || '',
    unit: row['Đơn vị'] || '',
    inStock: row['Tồn hiện tại'] || 0,
    minLevel: row['Mức cảnh báo tối thiểu'] || 0,
    location: row['Vị trí'] || ''
  }));
}

function getProjects() {
  const rawData = getSheetData('PROJECTS');
  return rawData.map(row => ({
    id: row['Project_ID'] || '',
    name: row['Tên dự án'] || '',
    field: row['Lĩnh vực'] || '',
    leader: row['Project Leader'] || '',
    status: row['Trạng thái'] || '',
    endDate: row['Ngày kết thúc dự kiến'] ? Utilities.formatDate(new Date(row['Ngày kết thúc dự kiến']), Session.getScriptTimeZone(), 'yyyy-MM-dd') : ''
  }));
}

function getDashboardData() {
  const assets = getSheetData('ASSETS');
  
  let available = 0, inUse = 0, maintenance = 0, missing = 0, l4Controlled = 0;
  let byCategory = {};
  let inUseAssets = [];
  
  assets.forEach(a => {
    const status = a['Trạng thái'];
    const level = a['Cấp quản lý'];
    const category = a['Nhóm'];
    
    if (status === 'Available') available++;
    if (status === 'In Use') {
      inUse++;
      inUseAssets.push({
        code: a['Asset_Code'] || 'NO-CODE',
        name: a['Tên thiết bị'],
        holder: a['Chủ sở hữu'] || a['Người đang giữ'],
        project: a['Project đang dùng']
      });
    }
    if (status === 'Maintenance') maintenance++;
    if (status === 'Missing') missing++;
    
    if (level === 'L4') l4Controlled++;
    
    if (category) {
      byCategory[category] = (byCategory[category] || 0) + 1;
    }
  });
  
  const categoryArray = Object.keys(byCategory).map(k => ({
    name: k,
    count: byCategory[k]
  }));
  
  return {
    totalAssets: assets.length,
    available,
    inUse,
    maintenance,
    missing,
    l4Controlled,
    byCategory: categoryArray,
    alerts: [],
    inUseAssets: inUseAssets.slice(0, 5)
  };
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    // BASIC API SECURITY
    const API_KEY = "aiot2026@"; // Or validate against a secret
    if (data.token !== API_KEY) {
      throw new Error('Unauthorized Access: Invalid API Token');
    }
    
    if (action === 'checkout') {
      return handleCheckout(data);
    } else if (action === 'checkin') {
      return handleCheckin(data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Invalid action for POST'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sanitize(input) {
  if (typeof input !== 'string') return input;
  // Prevent CSV/Formula Injection
  if (/^[=\+\-@]/.test(input)) {
    return "'" + input; 
  }
  return input;
}

function handleCheckout(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const assetSheet = ss.getSheetByName('ASSETS');
  const assetData = assetSheet.getDataRange().getValues();
  let headerRowIndex = 0;
  for (let i = 0; i < Math.min(10, assetData.length); i++) {
    if (assetData[i].join('').toLowerCase().includes('asset_code')) {
      headerRowIndex = i;
      break;
    }
  }
  
  const headers = assetData[headerRowIndex];
  const codeIdx = headers.indexOf('Asset_Code');
  const statusIdx = headers.indexOf('Trạng thái');
  const holderIdx = headers.indexOf('Chủ sở hữu') !== -1 ? headers.indexOf('Chủ sở hữu') : headers.indexOf('Người đang giữ');
  const projectIdx = headers.indexOf('Project đang dùng');
  
  let rowIndex = -1;
  for (let i = headerRowIndex + 1; i < assetData.length; i++) {
    const code = assetData[i][codeIdx] ? String(assetData[i][codeIdx]).trim() : `NO-CODE-${i - 1}`;
    if (code === data.assetCode) {
      rowIndex = i + 1;
      break;
    }
  }
  
  if (rowIndex === -1) throw new Error('Asset not found');
  
  assetSheet.getRange(rowIndex, statusIdx + 1).setValue('In Use');
  if (holderIdx !== -1) assetSheet.getRange(rowIndex, holderIdx + 1).setValue(sanitize(data.holderName));
  if (projectIdx !== -1) assetSheet.getRange(rowIndex, projectIdx + 1).setValue(sanitize(data.projectId));
  
  const transSheet = ss.getSheetByName('TRANSACTIONS');
  if (transSheet) {
    const txId = 'TX-' + new Date().getTime();
    transSheet.appendRow([
      txId, sanitize(data.assetCode), sanitize(data.holderName), 'CHECK_OUT', sanitize(data.projectId), new Date(), sanitize(data.expectedReturnDate), '', '', '', sanitize(data.notes)
    ]);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Check-out successful' })).setMimeType(ContentService.MimeType.JSON);
}

function handleCheckin(data) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const assetSheet = ss.getSheetByName('ASSETS');
  const assetData = assetSheet.getDataRange().getValues();
  let headerRowIndex = 0;
  for (let i = 0; i < Math.min(10, assetData.length); i++) {
    if (assetData[i].join('').toLowerCase().includes('asset_code')) {
      headerRowIndex = i;
      break;
    }
  }
  
  const headers = assetData[headerRowIndex];
  const codeIdx = headers.indexOf('Asset_Code');
  const statusIdx = headers.indexOf('Trạng thái');
  const holderIdx = headers.indexOf('Chủ sở hữu') !== -1 ? headers.indexOf('Chủ sở hữu') : headers.indexOf('Người đang giữ');
  const projectIdx = headers.indexOf('Project đang dùng');
  const conditionIdx = headers.indexOf('Tình trạng');
  
  let rowIndex = -1;
  let currentHolder = '';
  for (let i = headerRowIndex + 1; i < assetData.length; i++) {
    const code = assetData[i][codeIdx] ? String(assetData[i][codeIdx]).trim() : `NO-CODE-${i - 1}`;
    if (code === data.assetCode) {
      rowIndex = i + 1;
      currentHolder = holderIdx !== -1 ? assetData[i][holderIdx] : '';
      break;
    }
  }
  
  if (rowIndex === -1) throw new Error('Asset not found');
  
  assetSheet.getRange(rowIndex, statusIdx + 1).setValue('Available');
  if (holderIdx !== -1) assetSheet.getRange(rowIndex, holderIdx + 1).setValue('');
  if (projectIdx !== -1) assetSheet.getRange(rowIndex, projectIdx + 1).setValue('');
  if (conditionIdx !== -1 && data.condition) assetSheet.getRange(rowIndex, conditionIdx + 1).setValue(sanitize(data.condition));
  
  const transSheet = ss.getSheetByName('TRANSACTIONS');
  if (transSheet) {
    const txId = 'TX-' + new Date().getTime();
    transSheet.appendRow([
      txId, sanitize(data.assetCode), currentHolder, 'CHECK_IN', '', new Date(), '', new Date(), sanitize(data.condition), '', sanitize(data.notes)
    ]);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Check-in successful' })).setMimeType(ContentService.MimeType.JSON);
}
