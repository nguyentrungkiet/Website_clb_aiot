"use server";

import { cookies } from 'next/headers';

export async function verifyLabPassword(password: string) {
  const correctPassword = process.env.LAB_ACCESS_PASSWORD || 'aiot2026@';
  
  if (password === correctPassword) {
    const cookieStore = await cookies();
    cookieStore.set('lab_access', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });
    return { success: true };
  }
  
  return { success: false };
}

export async function logoutLab() {
  const cookieStore = await cookies();
  cookieStore.delete('lab_access');
}
