import { fetchLabData } from '@/lib/api/lab';
import { QRPrintApp } from '@/components/lab/QRPrintApp';

export const metadata = {
  title: 'In mã QR Thiết bị - ISA Lab',
};

export default async function QRPrintPage() {
  const { success, data: assets } = await fetchLabData('assets');

  if (!success) {
    return <div className="text-red-500">Lỗi tải dữ liệu tài sản.</div>;
  }

  return (
    <div className="space-y-6">
      <QRPrintApp assets={assets} />
    </div>
  );
}
