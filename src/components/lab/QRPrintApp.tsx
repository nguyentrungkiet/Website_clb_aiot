"use client";

import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Printer, CheckSquare, Square } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface Asset {
  code: string;
  name: string;
  category: string;
  level: string;
}

export function QRPrintApp({ assets }: { assets: Asset[] }) {
  // We allow all assets now
  const validAssets = assets;
  
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(
    new Set(validAssets.map(a => a.code))
  );

  const toggleSelect = (code: string) => {
    const newSet = new Set(selectedCodes);
    if (newSet.has(code)) newSet.delete(code);
    else newSet.add(code);
    setSelectedCodes(newSet);
  };

  const toggleAll = () => {
    if (selectedCodes.size === validAssets.length) {
      setSelectedCodes(new Set());
    } else {
      setSelectedCodes(new Set(validAssets.map(a => a.code)));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Base URL for QR links - MUST use the public production URL so scanned QR codes work everywhere
  const baseUrl = 'https://www.aiot-tdmu.edu.vn/vi/lab/assets/';

  const selectedAssets = validAssets.filter(a => selectedCodes.has(a.code));

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 print:hidden">
        <div>
          <h2 className="text-2xl font-bold">In Tem Mã QR</h2>
          <p className="text-muted-foreground mt-1 text-sm">Chọn thiết bị để in tem dán. Bấm Ctrl+P hoặc nút bên phải để in.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/lab/assets" className="px-4 py-2 border border-border rounded-lg bg-background hover:bg-muted font-medium">
            Hủy
          </Link>
          <button 
            onClick={handlePrint}
            disabled={selectedCodes.size === 0}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium disabled:opacity-50"
          >
            <Printer size={18} /> In {selectedCodes.size} tem
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 print:block print:w-full print:m-0 print:p-0">
        
        {/* Selection Sidebar - Hidden when printing */}
        <div className="lg:col-span-1 glass-panel p-4 rounded-xl print:hidden max-h-[70vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
            <span className="font-semibold">Danh sách ({validAssets.length})</span>
            <button onClick={toggleAll} className="text-sm text-primary hover:underline">
              {selectedCodes.size === validAssets.length ? 'Bỏ chọn hết' : 'Chọn hết'}
            </button>
          </div>
          <div className="space-y-2">
            {validAssets.map(asset => (
              <div 
                key={asset.code} 
                className="flex items-center gap-3 p-2 hover:bg-muted rounded cursor-pointer transition-colors"
                onClick={() => toggleSelect(asset.code)}
              >
                {selectedCodes.has(asset.code) ? <CheckSquare className="text-primary" size={18} /> : <Square className="text-muted-foreground" size={18} />}
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{asset.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{asset.code}</p>
                </div>
              </div>
            ))}
            {validAssets.length === 0 && (
              <p className="text-sm text-muted-foreground">Không có thiết bị nào trong danh sách.</p>
            )}
          </div>
        </div>

        {/* Print Preview Area */}
        <div className="lg:col-span-3 bg-white print:bg-transparent rounded-xl p-8 border border-border print:border-none print:p-0">
          <div className="print:hidden mb-4 pb-4 border-b text-sm text-muted-foreground text-center">
            Khu vực xem trước bản in (Giấy A4)
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 print:grid-cols-4 print:gap-4 print:auto-rows-max">
            {selectedAssets.map(asset => (
              <div key={asset.code} className="border-2 border-black rounded-lg p-3 bg-white text-black flex flex-col items-center text-center break-inside-avoid shadow-sm print:shadow-none">
                <div className="font-bold text-xs mb-1 uppercase tracking-wider text-blue-800">ISA Lab TDMU</div>
                <div className="bg-white p-1 mb-2">
                  <QRCode 
                    value={`${baseUrl}${asset.code}`} 
                    size={100}
                    level="H"
                  />
                </div>
                <div className="font-mono font-bold text-sm mb-1">{asset.code}</div>
                <div className="text-[10px] leading-tight line-clamp-2 min-h-[24px]">{asset.name}</div>
                <div className="text-[9px] mt-1 text-gray-500 uppercase">{asset.level}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
