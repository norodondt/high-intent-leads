import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { TargetPosition } from "../types/form";

interface StepThreeProps {
  selectedPosition: TargetPosition;
  onPositionSelect: (position: TargetPosition) => void;
  specificRole: string;
  onSpecificRoleChange: (value: string) => void;
}

export function StepThree({
  selectedPosition,
  onPositionSelect,
  specificRole,
  onSpecificRoleChange,
}: StepThreeProps) {
  const positions: { id: TargetPosition; label: string }[] = [
    { id: "business-owner", label: "Geschäftsführer/CEO" },
    { id: "department-head", label: "Abteilungsleiter" },
    { id: "specific-role", label: "Spezifische Position" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Wen suchst du?</h2>
        <p className="text-muted-foreground">Wähle deine Zielposition aus</p>
      </div>

      <div className="grid gap-4">
        {positions.map((position) => (
          <Button
            key={position.id}
            variant="outline"
            className={cn(
              "h-auto p-4 justify-start space-x-4",
              selectedPosition === position.id && "border-primary"
            )}
            onClick={() => onPositionSelect(position.id)}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                selectedPosition === position.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted"
              )}
            >
              {selectedPosition === position.id && (
                <Check className="w-4 h-4" />
              )}
            </div>
            <span>{position.label}</span>
          </Button>
        ))}
      </div>

      {selectedPosition === "specific-role" && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
          <Label htmlFor="specific-role">
            Gib die spezifische Position ein, die du suchst
          </Label>
          <Input
            id="specific-role"
            placeholder="z.B. Marketing Manager, Vertriebsleiter"
            value={specificRole}
            onChange={(e) => onSpecificRoleChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
