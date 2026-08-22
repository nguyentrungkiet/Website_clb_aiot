import React from 'react';
import { CheckCircle2, AlertCircle, Wrench, PackageX, Clock, Ban } from 'lucide-react';

type Status = 'Available' | 'In Use' | 'Maintenance' | 'Missing' | 'Reserved' | 'Retired';

interface StatusBadgeProps {
  status: Status | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  let colorClass = '';
  let Icon = CheckCircle2;

  switch (status) {
    case 'Available':
      colorClass = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      Icon = CheckCircle2;
      break;
    case 'In Use':
      colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      Icon = Clock;
      break;
    case 'Maintenance':
      colorClass = 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      Icon = Wrench;
      break;
    case 'Missing':
      colorClass = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      Icon = AlertCircle;
      break;
    case 'Reserved':
      colorClass = 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      Icon = PackageX;
      break;
    case 'Retired':
      colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
      Icon = Ban;
      break;
    case 'Unknown':
      colorClass = 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700 border-dashed';
      Icon = AlertCircle;
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
      Icon = CheckCircle2;
  }

  const displayStatus = status === 'Unknown' ? 'Chưa xác định' : status;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
      <Icon size={14} />
      {displayStatus}
    </span>
  );
}
