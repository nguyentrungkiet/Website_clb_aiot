import { fetchLabData } from '@/lib/api/lab';
import { StatusBadge } from '@/components/lab/StatusBadge';
import { AssetActions } from '@/components/lab/AssetActions';
import { ArrowLeft, MapPin, Tag, Hash, FileText, Wrench } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default async function AssetDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const { success, data: asset, message } = await fetchLabData('asset', id);

  if (!success) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Không tìm thấy thiết bị</h2>
        <p className="text-muted-foreground mb-6">{message || "Mã thiết bị không tồn tại hoặc đã bị xóa."}</p>
        <Link href="/lab/assets" className="text-primary hover:underline">&larr; Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/lab/assets" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft size={16} className="mr-1" /> Quay lại danh sách
      </Link>

      <div className="glass-panel overflow-hidden rounded-xl border border-border">
        {/* Header / Image Area */}
        <div className="w-full h-48 md:h-64 bg-muted relative border-b border-border flex items-center justify-center">
          {asset.image ? (
            <Image 
              src={asset.image} 
              alt={asset.name} 
              fill 
              className="object-cover"
            />
          ) : (
            <div className="text-muted-foreground flex flex-col items-center">
              <Tag size={48} className="mb-2 opacity-50" />
              <span>No image available</span>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <StatusBadge status={asset.status} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-8">
          <div>
            <div className="inline-block px-2 py-1 bg-primary/10 text-primary font-mono text-sm rounded mb-2">
              {asset.code}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{asset.name}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Tag className="text-muted-foreground mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Nhóm thiết bị</p>
                  <p className="font-medium">{asset.category} <span className="text-xs ml-2 px-1.5 py-0.5 bg-muted rounded">{asset.level}</span></p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Hash className="text-muted-foreground mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Model & Serial</p>
                  <p className="font-medium">{asset.model || 'N/A'}</p>
                  {asset.serial && <p className="text-sm font-mono text-muted-foreground mt-1">{asset.serial}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-muted-foreground mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Vị trí hiện tại</p>
                  <p className="font-medium">{asset.location || 'Chưa xác định'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Wrench className="text-muted-foreground mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Tình trạng vật lý</p>
                  <p className="font-medium">{asset.condition || 'Bình thường'}</p>
                </div>
              </div>
            </div>
          </div>

          {(asset.holder || asset.project) && (
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Thông tin sử dụng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {asset.holder && (
                  <div>
                    <p className="text-xs text-muted-foreground">Người đang giữ</p>
                    <p className="font-medium">{asset.holder}</p>
                  </div>
                )}
                {asset.project && (
                  <div>
                    <p className="text-xs text-muted-foreground">Thuộc dự án</p>
                    <p className="font-medium">{asset.project}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {asset.notes && (
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold mb-2 text-muted-foreground">
                <FileText size={16} /> Ghi chú
              </div>
              <div className="p-4 bg-background border border-border rounded-lg text-sm">
                {asset.notes}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <AssetActions 
            assetCode={asset.code} 
            status={asset.status} 
            currentHolder={asset.holder} 
            currentProject={asset.project} 
          />
        </div>
      </div>
    </div>
  );
}
