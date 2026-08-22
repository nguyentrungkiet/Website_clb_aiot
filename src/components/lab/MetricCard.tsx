import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  description?: string;
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray';
}

export function MetricCard({ title, value, icon: Icon, trend, description, color = 'blue' }: MetricCardProps) {
  const colorStyles = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
    green: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
    orange: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30',
    red: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30',
    gray: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800',
  };

  return (
    <div className="glass-panel p-6 rounded-xl transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={`p-2 rounded-lg ${colorStyles[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold">{value}</p>
        {(trend || description) && (
          <div className="mt-1 flex items-center text-sm">
            {trend && <span className="text-green-500 font-medium mr-2">{trend}</span>}
            {description && <span className="text-muted-foreground">{description}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
