import { Check } from "lucide-react";
import {
  Briefcase,
  MapPin,
  Code2,
  Users,
  Building2,
  Globe2,
  Plus,
} from "lucide-react";
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
  customSource?: string;
  onCustomSourceChange?: (value: string) => void;
}

export function StepOne({
  selectedSources,
  onSourceSelect,
  similarCompany,
  onSimilarCompanyChange,
  customSource = "",
  onCustomSourceChange = () => {},
}: StepOneProps) {
  const sources: {
    id: LeadSource;
    label: string;
    icon: React.ComponentType<any>;
    color: string;
    bgColor: string;
  }[] = [
    {
      id: "job-portals",
      label: "Jobportale (Indeed, StepStone)",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "google-maps",
      label: "Google Maps Einträge",
      icon: MapPin,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: "technology-users",
      label: "Technologie-Nutzer",
      icon: Code2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "hiring-companies",
      label: "Unternehmen mit offenen Stellen",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "similar-companies",
      label: "Ähnliche Unternehmen",
      icon: Building2,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "specific-websites",
      label: "Webseiten mit Daten",
      icon: Globe2,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
    {
      id: "custom-source",
      label: "Eine andere Quelle",
      icon: Plus,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
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
              "h-auto p-4 justify-start space-x-4 group hover:shadow-md transition-all duration-200",
              "flex flex-wrap items-start",
              selectedSources.includes(source.id)
                ? "border-primary bg-primary/5"
                : "hover:border-gray-300 hover:bg-gray-50/50"
            )}
            onClick={() => onSourceSelect(source.id)}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0",
                source.bgColor,
                selectedSources.includes(source.id) ? "bg-primary/10" : ""
              )}
            >
              <source.icon
                className={cn(
                  "w-5 h-5",
                  source.color,
                  selectedSources.includes(source.id) ? "text-primary" : ""
                )}
              />
            </div>
            <div className="flex-1 text-left space-y-1 min-w-[150px]">
              <div className="font-medium leading-tight">{source.label}</div>
              {selectedSources.includes(source.id) && (
                <div className="text-xs text-primary-foreground/70">
                  Ausgewählt
                </div>
              )}
            </div>
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0",
                selectedSources.includes(source.id)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-gray-300"
              )}
            >
              {selectedSources.includes(source.id) && (
                <Check className="w-3 h-3" />
              )}
            </div>
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

      {selectedSources.includes("custom-source") && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
          <Label htmlFor="custom-source">Beschreibe deine Quelle</Label>
          <Input
            id="custom-source"
            placeholder="z.B. Branchenspezifische Datenbank"
            value={customSource}
            onChange={(e) => onCustomSourceChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
