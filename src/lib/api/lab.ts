import { mockDashboard, mockAssets, mockInventory, mockProjects } from './mock-data';

const API_URL = process.env.NEXT_PUBLIC_ISA_API_URL;
const USE_MOCK = !API_URL;

export async function fetchLabData(action: string, id?: string) {
  if (USE_MOCK) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    switch (action) {
      case 'dashboard':
        return { success: true, data: mockDashboard };
      case 'assets':
        return { success: true, data: mockAssets };
      case 'asset':
        const asset = mockAssets.find(a => a.code === id);
        return asset ? { success: true, data: asset } : { success: false, message: 'Không tìm thấy thiết bị' };
      case 'inventory':
        return { success: true, data: mockInventory };
      case 'projects':
        return { success: true, data: mockProjects };
      default:
        return { success: false, message: 'Invalid action' };
    }
  }

  // Real API Call to Google Apps Script
  try {
    const url = new URL(API_URL!);
    url.searchParams.append('action', action);
    if (id) url.searchParams.append('id', id);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 } // Cache cho 60s
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu từ ISA Lab:', error);
    return { success: false, message: 'Không thể tải dữ liệu ISA Lab. Vui lòng thử lại.' };
  }
}

export async function postLabData(action: string, payload: any) {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, message: `Thao tác ${action} thành công (Mock)` };
  }

  try {
    const res = await fetch(API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ action, ...payload }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error(`Lỗi khi ${action} dữ liệu:`, error);
    return { success: false, message: 'Có lỗi xảy ra khi thực hiện thao tác. Vui lòng thử lại.' };
  }
}
