import { fetchLabData } from '@/lib/api/lab';
import { AlertCircle } from 'lucide-react';

export default async function InventoryPage() {
  const { success, data: inventory } = await fetchLabData('inventory');

  if (!success) {
    return <div className="text-red-500">Lỗi tải dữ liệu kho vật tư.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Kho Vật Tư Tiêu Hao</h2>

      <div className="glass-panel overflow-hidden rounded-xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Mã VT</th>
                <th className="px-6 py-4 font-semibold">Tên Vật Tư</th>
                <th className="px-6 py-4 font-semibold">Nhóm</th>
                <th className="px-6 py-4 font-semibold text-right">Tồn Kho</th>
                <th className="px-6 py-4 font-semibold text-right">Tối Thiểu</th>
                <th className="px-6 py-4 font-semibold">Vị trí</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventory.map((item: any) => {
                const isLow = item.inStock <= item.minLevel;
                return (
                  <tr key={item.code} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{item.code}</td>
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-2">
                        {item.name}
                        {isLow && <span title="Sắp hết"><AlertCircle size={14} className="text-red-500" /></span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                    <td className={`px-6 py-4 text-right font-bold ${isLow ? 'text-red-500' : ''}`}>
                      {item.inStock} <span className="font-normal text-xs text-muted-foreground">{item.unit}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-muted-foreground">{item.minLevel}</td>
                    <td className="px-6 py-4 text-muted-foreground">{item.location}</td>
                  </tr>
                );
              })}
              {inventory.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">Không có dữ liệu kho vật tư.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
