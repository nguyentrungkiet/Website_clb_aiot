"use server";

import { cookies } from 'next/headers';
import { postLabData } from '@/lib/api/lab';

export async function verifyLabPassword(password: string) {
  const correctPassword = process.env.LAB_ACCESS_PASSWORD || 'aiot2026@';
  
  if (password === correctPassword) {
    const cookieStore = await cookies();
    const secureToken = Buffer.from(`${password}_aiot_secure_token`).toString('base64');
    
    cookieStore.set('lab_access_session', secureToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
      // Removed maxAge to make it a Session Cookie (expires on browser close)
    });
    return { success: true };
  }
  
  return { success: false };
}

export async function logoutLab() {
  const cookieStore = await cookies();
  cookieStore.delete('lab_access_session');
}

export async function submitLabTransaction(action: string, payload: any) {
  // This runs securely on the Server
  const correctPassword = process.env.LAB_ACCESS_PASSWORD || 'aiot2026@';
  
  // Verify cookie first
  const cookieStore = await cookies();
  const secureToken = Buffer.from(`${correctPassword}_aiot_secure_token`).toString('base64');
  if (cookieStore.get('lab_access_session')?.value !== secureToken) {
    throw new Error('Unauthorized');
  }

  // Inject token to send to Google Apps Script
  payload.token = correctPassword;
  
  try {
    return await postLabData(action, payload);
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
