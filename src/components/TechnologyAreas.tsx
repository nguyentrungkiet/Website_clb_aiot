import { useTranslations } from "next-intl";
import { Brain, Network, Microchip, Bot, Plane, Lightbulb } from "lucide-react";

export function TechnologyAreas() {
  const t = useTranslations("Fields");

  const areas = [
    { id: "ai", icon: Brain },
    { id: "iot", icon: Network },
    { id: "embedded", icon: Microchip },
    { id: "robotics", icon: Bot },
    { id: "uav", icon: Plane },
    { id: "research", icon: Lightbulb },
  ];

  return (
    <section className="w-full bg-white dark:bg-card py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <div 
                key={area.id} 
                className="group relative flex flex-col items-start gap-4 rounded-2xl border border-border bg-white dark:bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-secondary"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {t(`${area.id}.title` as any)}
                  </h3>
                  <p className="text-gray-500">
                    {t(`${area.id}.desc` as any)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
