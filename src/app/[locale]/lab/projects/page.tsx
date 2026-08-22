import { fetchLabData } from '@/lib/api/lab';
import { Calendar, User } from 'lucide-react';

export default async function ProjectsPage() {
  const { success, data: projects } = await fetchLabData('projects');

  if (!success) {
    return <div className="text-red-500">Lỗi tải dữ liệu dự án.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dự Án Đang Chạy</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <div key={project.id} className="glass-panel p-6 rounded-xl border border-border flex flex-col h-full hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono px-2 py-1 bg-muted rounded text-muted-foreground">{project.id}</span>
              <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">{project.status}</span>
            </div>
            
            <h3 className="text-lg font-bold mb-1">{project.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">{project.field}</p>
            
            <div className="mt-auto space-y-3 pt-4 border-t border-border/50 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User size={16} /> <span className="font-medium text-foreground">{project.leader}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={16} /> Dự kiến: {project.endDate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
