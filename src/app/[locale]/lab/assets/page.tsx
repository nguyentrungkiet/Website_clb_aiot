import { fetchLabData } from '@/lib/api/lab';
import { AssetCard } from '@/components/lab/AssetCard';
import { Search, Filter, QrCode } from 'lucide-react';

export default async function AssetsPage() {
  const { success, data: assets } = await fetchLabData('assets');

  if (!success) {
    return <div className="text-red-500">Lỗi tải dữ liệu tài sản.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Danh sách Tài sản</h2>
        
        {/* Simple search UI (Client-side functionality would need a Client Component, but we just render UI for V1 Phase 1) */}
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm mã, tên thiết bị..."
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="p-2 border border-border rounded-lg bg-background hover:bg-muted text-foreground" title="Lọc">
            <Filter size={18} />
          </button>
          <a href="/vi/lab/assets/qr-print" className="p-2 border border-border rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center justify-center" title="In mã QR">
            <QrCode size={18} />
          </a>
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset: any) => (
          <AssetCard
            key={asset.code}
            code={asset.code}
            name={asset.name}
            status={asset.status}
            location={asset.location}
            project={asset.project}
          />
        ))}
      </div>
    </div>
  );
}
