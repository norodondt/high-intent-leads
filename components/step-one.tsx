import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { LeadSource } from "../types/form";

interface StepOneProps {
  selectedSources: LeadSource[];
  onSourceSelect: (source: LeadSource) => void;
  similarCompany: string;
  onSimilarCompanyChange: (value: string) => void;
}

export function StepOne({
  selectedSources,
  onSourceSelect,
  similarCompany,
  onSimilarCompanyChange,
}: StepOneProps) {
  const sources: { id: LeadSource; label: string }[] = [
    { id: "job-portals", label: "Jobportale (Indeed, StepStone)" },
    { id: "google-maps", label: "Google Maps Einträge" },
    { id: "technology-users", label: "Technologie-Nutzer (Stack-Erkennung)" },
    { id: "hiring-companies", label: "Unternehmen mit offenen Stellen" },
    { id: "similar-companies", label: "Ähnliche Unternehmen" },
    { id: "specific-websites", label: "Webseiten mit spezifischen Parametern" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Wo sollen wir nach deinen Leads suchen?
        </h2>
        <p className="text-muted-foreground">
          Wähle alle Quellen aus, die für deine Suche relevant sind
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sources.map((source) => (
          <Button
            key={source.id}
            variant="outline"
            className={cn(
              "h-auto p-4 justify-start space-x-4",
              selectedSources.includes(source.id) && "border-primary"
            )}
            onClick={() => onSourceSelect(source.id)}
          >
            <div
              className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                selectedSources.includes(source.id)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted"
              )}
            >
              {selectedSources.includes(source.id) && (
                <Check className="w-4 h-4" />
              )}
            </div>
            <span>{source.label}</span>
          </Button>
        ))}
      </div>

      {selectedSources.includes("similar-companies") && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
          <Label htmlFor="similar-company">
            Gib ein Referenzunternehmen ein
          </Label>
          <Input
            id="similar-company"
            placeholder="z.B. Salesforce, HubSpot"
            value={similarCompany}
            onChange={(e) => onSimilarCompanyChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
