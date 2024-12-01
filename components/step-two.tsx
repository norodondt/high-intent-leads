import { Check, Mail, Linkedin, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DataPoint } from "../types/form";

interface StepTwoProps {
  selectedDataPoints: DataPoint[];
  onDataPointSelect: (point: DataPoint) => void;
}

export function StepTwo({
  selectedDataPoints,
  onDataPointSelect,
}: StepTwoProps) {
  const essentialPoints = [
    {
      id: "company-name" as DataPoint,
      label: "Firmenname",
      price: 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "location" as DataPoint,
      label: "Standort",
      price: 0,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const additionalPoints = [
    {
      id: "email" as DataPoint,
      label: "E-Mail-Adressen",
      price: 0,
      isFree: true,
      icon: Mail,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "linkedin" as DataPoint,
      label: "LinkedIn-Profile",
      price: 0,
      isFree: true,
      icon: Linkedin,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "phone" as DataPoint,
      label: "Telefonnummern",
      price: 0,
      isFree: true,
      disabled: true,
      icon: Phone,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "decision-maker" as DataPoint,
      label: "Entscheider-Informationen",
      price: 0,
      isFree: true,
      icon: Users,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Welche Informationen benötigst du?
        </h2>
        <p className="text-muted-foreground">
          Wähle die Datenpunkte aus, die du sammeln möchtest
        </p>
        <p className="text-sm text-emerald-600 font-medium">
          🎉 Sonderangebot: Alle Datenpunkte sind aktuell KOSTENLOS für deine
          ersten Kontakte!
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <h3 className="font-semibold">Essentiell (Kostenlos)</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {essentialPoints.map((point) => (
              <div key={point.id} className="p-4 rounded-lg border bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      point.bgColor
                    )}
                  >
                    <point.icon className={cn("w-5 h-5", point.color)} />
                  </div>
                  <span>{point.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Zusätzliche Datenpunkte</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {additionalPoints.map((point) => (
              <Button
                key={point.id}
                variant="outline"
                className={cn(
                  "h-auto p-4 justify-start space-x-4 group hover:shadow-md transition-all duration-200",
                  "flex flex-wrap items-start",
                  selectedDataPoints.includes(point.id)
                    ? "border-primary bg-primary/5"
                    : "hover:border-gray-300 hover:bg-gray-50/50",
                  point.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !point.disabled && onDataPointSelect(point.id)}
                disabled={point.disabled}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0",
                    point.bgColor,
                    selectedDataPoints.includes(point.id) ? "bg-primary/10" : ""
                  )}
                >
                  <point.icon
                    className={cn(
                      "w-5 h-5",
                      point.color,
                      selectedDataPoints.includes(point.id)
                        ? "text-primary"
                        : ""
                    )}
                  />
                </div>
                <div className="flex-1 text-left space-y-1 min-w-[150px]">
                  <div
                    className={cn(
                      "font-medium leading-tight",
                      point.disabled && "line-through"
                    )}
                  >
                    {point.label}
                  </div>
                  {selectedDataPoints.includes(point.id) && (
                    <div className="text-xs text-primary-foreground/70">
                      Ausgewählt
                    </div>
                  )}
                </div>
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0",
                    selectedDataPoints.includes(point.id)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-gray-300"
                  )}
                >
                  {selectedDataPoints.includes(point.id) && (
                    <Check className="w-3 h-3" />
                  )}
                </div>
                <span className="absolute right-2 top-2 text-sm font-medium text-emerald-600">
                  GRATIS
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
