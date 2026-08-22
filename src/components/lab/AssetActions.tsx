"use client";

import React, { useState } from 'react';
import { submitLabTransaction } from '@/app/[locale]/lab/actions';

interface AssetActionsProps {
  assetCode: string;
  status: string;
  currentHolder?: string;
  currentProject?: string;
}

export function AssetActions({ assetCode, status, currentHolder, currentProject }: AssetActionsProps) {
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<'none' | 'checkout' | 'checkin'>('none');
  const [message, setMessage] = useState('');

  // Form states
  const [holderName, setHolderName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [notes, setNotes] = useState('');
  const [condition, setCondition] = useState('Bình thường');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const payload = {
      assetCode,
      holderName,
      projectId,
      expectedReturnDate: expectedReturn,
      notes
    };
    
    const res = await submitLabTransaction('checkout', payload);
    setLoading(false);
    
    if (res.success) {
      setModalType('none');
      alert('Đã mượn thiết bị thành công! Vui lòng tải lại trang.');
      window.location.reload();
    } else {
      setMessage(res.message || 'Có lỗi xảy ra');
    }
  };

  const handleCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const payload = {
      type: 'checkin',
      assetCode,
      condition,
      notes
    };
    
    const res = await submitLabTransaction('checkin', payload);
    setLoading(false);
    
    if (res.success) {
      setModalType('none');
      alert('Đã trả thiết bị thành công! Vui lòng tải lại trang.');
      window.location.reload();
    } else {
      setMessage(res.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <>
      <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-border mt-6">
        {status === 'Available' && (
          <button 
            onClick={() => setModalType('checkout')}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 flex items-center justify-center gap-2"
          >
            Mượn thiết bị
          </button>
        )}
        
        {status === 'In Use' && (
          <button 
            onClick={() => setModalType('checkin')}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            Trả thiết bị
          </button>
        )}
      </div>

      {/* Checkout Modal */}
      {modalType === 'checkout' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background w-full max-w-md rounded-xl shadow-xl overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-bold text-lg">Mượn thiết bị: {assetCode}</h3>
              <button onClick={() => setModalType('none')} className="text-muted-foreground hover:text-foreground">&times;</button>
            </div>
            <form onSubmit={handleCheckout} className="p-4 space-y-4">
              {message && <div className="text-red-500 text-sm">{message}</div>}
              <div>
                <label className="block text-sm font-medium mb-1">Họ tên người mượn *</label>
                <input required type="text" value={holderName} onChange={e => setHolderName(e.target.value)} className="w-full p-2 border rounded-lg bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dự án sử dụng</label>
                <input type="text" value={projectId} onChange={e => setProjectId(e.target.value)} className="w-full p-2 border rounded-lg bg-background" placeholder="Tên hoặc mã dự án..." />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ngày dự kiến trả</label>
                <input type="date" value={expectedReturn} onChange={e => setExpectedReturn(e.target.value)} className="w-full p-2 border rounded-lg bg-background" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ghi chú lúc mượn</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2 border rounded-lg bg-background" rows={2}></textarea>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setModalType('none')} className="px-4 py-2 text-muted-foreground">Hủy</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50">
                  {loading ? 'Đang xử lý...' : 'Xác nhận mượn'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Checkin Modal */}
      {modalType === 'checkin' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background w-full max-w-md rounded-xl shadow-xl overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-bold text-lg">Trả thiết bị: {assetCode}</h3>
              <button onClick={() => setModalType('none')} className="text-muted-foreground hover:text-foreground">&times;</button>
            </div>
            <form onSubmit={handleCheckin} className="p-4 space-y-4">
              {message && <div className="text-red-500 text-sm">{message}</div>}
              <div className="bg-muted p-3 rounded-lg text-sm mb-4">
                <p>Người đang giữ: <strong>{currentHolder}</strong></p>
                <p>Dự án: <strong>{currentProject || 'Không có'}</strong></p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tình trạng khi trả *</label>
                <select value={condition} onChange={e => setCondition(e.target.value)} className="w-full p-2 border rounded-lg bg-background">
                  <option value="Bình thường">Bình thường (Good)</option>
                  <option value="Trầy xước nhẹ">Trầy xước nhẹ</option>
                  <option value="Hỏng hóc">Hỏng hóc (Damaged)</option>
                  <option value="Mất phụ kiện">Mất phụ kiện đính kèm</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ghi chú lúc trả</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2 border rounded-lg bg-background" rows={3} placeholder="Mô tả chi tiết nếu hỏng hóc..."></textarea>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setModalType('none')} className="px-4 py-2 text-muted-foreground">Hủy</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50">
                  {loading ? 'Đang xử lý...' : 'Xác nhận trả'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
