import { useTranslations } from "next-intl";
import { Users, Code, Trophy, Cpu } from "lucide-react";

export function QuickStats() {
  const t = useTranslations("Stats");

  const stats = [
    { label: t("members"), value: "50+", icon: Users },
    { label: t("projects"), value: "10+", icon: Code },
    { label: t("competitions"), value: "20+", icon: Trophy },
    { label: t("fields"), value: "5+", icon: Cpu },
  ];

  return (
    <section className="w-full border-t border-border bg-white dark:bg-card py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex flex-col items-center justify-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-secondary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
