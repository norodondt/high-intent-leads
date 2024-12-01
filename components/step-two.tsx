import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { DataPoint } from "../types/form";

interface StepTwoProps {
  selectedDataPoints: DataPoint[];
  onDataPointSelect: (point: DataPoint) => void;
}

interface DataPointInfo {
  id: DataPoint;
  label: string;
  price: number;
  isFree?: boolean;
  disabled?: boolean;
}

export function StepTwo({
  selectedDataPoints,
  onDataPointSelect,
}: StepTwoProps) {
  const essentialPoints = [
    { id: "company-name" as DataPoint, label: "Firmenname", price: 0 },
    { id: "location" as DataPoint, label: "Standort", price: 0 },
  ];

  const additionalPoints: DataPointInfo[] = [
    { id: "email", label: "E-Mail-Adressen", price: 0, isFree: true },
    { id: "linkedin", label: "LinkedIn-Profile", price: 0, isFree: true },
    {
      id: "phone",
      label: "Telefonnummern",
      price: 0,
      isFree: true,
      disabled: true,
    },
    {
      id: "decision-maker",
      label: "Entscheider-Informationen",
      price: 0,
      isFree: true,
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
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Check className="w-4 h-4" />
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
                  "h-auto p-4 justify-start space-x-4",
                  selectedDataPoints.includes(point.id) && "border-primary",
                  point.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !point.disabled && onDataPointSelect(point.id)}
                disabled={point.disabled}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                    selectedDataPoints.includes(point.id)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted"
                  )}
                >
                  {selectedDataPoints.includes(point.id) && (
                    <Check className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 flex justify-between items-center">
                  <span className={cn(point.disabled && "line-through")}>
                    {point.label}
                  </span>
                  <span className="text-sm font-medium text-emerald-600">
                    GRATIS
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
