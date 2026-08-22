"use client";

import { logoutLab } from '@/app/[locale]/lab/actions';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const handleLogout = async () => {
    await logoutLab();
    window.location.reload();
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
    >
      <LogOut size={16} /> Đăng xuất
    </button>
  );
}
