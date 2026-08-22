"use client";

import React, { useState } from 'react';
import { verifyLabPassword } from '@/app/[locale]/lab/actions';
import { Lock } from 'lucide-react';

export function LabLoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await verifyLabPassword(password);
    
    if (res.success) {
      window.location.reload();
    } else {
      setError('Mật khẩu không chính xác!');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="bg-background max-w-md w-full rounded-2xl shadow-lg border border-border p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
          <Lock size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Khu Vực Nội Bộ</h2>
        <p className="text-muted-foreground mb-8 text-sm">
          Phân hệ ISA Lab Management chỉ dành cho thành viên quản lý. Vui lòng nhập mật khẩu để truy cập.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {error && <div className="p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-sm">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium mb-1">Mật khẩu truy cập</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Nhập mật khẩu..."
              autoFocus
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading || !password}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Đang kiểm tra...' : 'Truy Cập Hệ Thống'}
          </button>
        </form>
      </div>
    </div>
  );
}
