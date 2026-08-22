import React from 'react';
import { StatusBadge } from './StatusBadge';
import { Link } from '@/i18n/routing';

interface AssetCardProps {
  code: string;
  name: string;
  status?: string;
  holder?: string;
  project?: string;
  returnDate?: string;
  location?: string;
}

export function AssetCard({ code, name, status, holder, project, returnDate, location }: AssetCardProps) {
  return (
    <Link href={`/lab/assets/${code}`} className="block">
      <div className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">{code}</span>
            <h4 className="font-semibold mt-2">{name}</h4>
          </div>
          {status && <StatusBadge status={status} />}
        </div>
        
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          {holder && (
            <div className="flex justify-between">
              <span>Người giữ:</span>
              <span className="font-medium text-foreground">{holder}</span>
            </div>
          )}
          {project && (
            <div className="flex justify-between">
              <span>Dự án:</span>
              <span>{project}</span>
            </div>
          )}
          {returnDate && (
            <div className="flex justify-between">
              <span>Hạn trả:</span>
              <span className={new Date(returnDate) < new Date() ? 'text-red-500' : ''}>{returnDate}</span>
            </div>
          )}
          {location && (
            <div className="flex justify-between">
              <span>Vị trí:</span>
              <span>{location}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
