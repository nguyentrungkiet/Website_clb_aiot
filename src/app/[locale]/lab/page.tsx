import { fetchLabData } from '@/lib/api/lab';
import { MetricCard } from '@/components/lab/MetricCard';
import { AssetCard } from '@/components/lab/AssetCard';
import { Box, CheckCircle2, Clock, AlertTriangle, XCircle, ShieldAlert } from 'lucide-react';

export default async function LabDashboard() {
  const { success, data, message } = await fetchLabData('dashboard');

  if (!success) {
    return (
      <div className="p-8 text-center bg-red-50 dark:bg-red-950/20 text-red-600 rounded-xl border border-red-100 dark:border-red-900">
        <AlertTriangle className="mx-auto mb-4" size={32} />
        <h2 className="text-xl font-bold mb-2">Lỗi tải dữ liệu</h2>
        <p>{message || "Không thể tải dữ liệu ISA Lab. Vui lòng thử lại."}</p>
      </div>
    );
  }

  const { totalAssets, available, inUse, maintenance, missing, l4Controlled, alerts, byCategory, inUseAssets } = data;

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Tổng tài sản" value={totalAssets} icon={Box} color="blue" />
        <MetricCard title="Sẵn sàng" value={available} icon={CheckCircle2} color="green" />
        <MetricCard title="Đang sử dụng" value={inUse} icon={Clock} color="orange" />
        <MetricCard title="Bảo trì" value={maintenance} icon={AlertTriangle} color="red" />
        <MetricCard title="Thất lạc" value={missing} icon={XCircle} color="gray" />
        <MetricCard title="Kiểm soát L4" value={l4Controlled} icon={ShieldAlert} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Categories & Alerts */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Alerts */}
          {alerts && alerts.length > 0 && (
            <div className="glass-panel p-6 rounded-xl border-l-4 border-l-red-500">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertTriangle size={18} />
                Cảnh báo cần xử lý
              </h3>
              <ul className="space-y-3">
                {alerts.map((alert: any, idx: number) => (
                  <li key={idx} className="text-sm bg-red-50 dark:bg-red-950/30 p-3 rounded-lg text-red-800 dark:text-red-300">
                    {alert.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Categories */}
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="font-bold mb-4">Tài sản theo nhóm</h3>
            <div className="space-y-4">
              {byCategory.map((cat: any) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{cat.name}</span>
                  <span className="font-medium px-2 py-1 bg-muted rounded text-xs">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: In Use Assets */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-6 rounded-xl h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Thiết bị đang sử dụng</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inUseAssets.map((asset: any) => (
                <AssetCard
                  key={asset.code}
                  code={asset.code}
                  name={asset.name}
                  holder={asset.holder}
                  project={asset.project}
                  returnDate={asset.returnDate}
                  status="In Use"
                />
              ))}
              {inUseAssets.length === 0 && (
                <p className="text-muted-foreground text-sm col-span-2">Không có thiết bị nào đang được sử dụng.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
