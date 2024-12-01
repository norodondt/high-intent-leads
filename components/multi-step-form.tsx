"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressIndicator } from "./progress-indicator";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { StepThree } from "./step-three";
import { StepFour } from "./step-four";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import type {
  DataPoint,
  FormData,
  LeadSource,
  TargetPosition,
} from "../types/form";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    leadSources: [] as LeadSource[],
    dataPoints: [] as DataPoint[],
    targetPosition: "business-owner" as TargetPosition,
    contactInfo: {
      email: "",
      phone: "",
    },
  });

  const totalSteps = 4;

  const handleNext = async () => {
    if (currentStep === totalSteps) {
      try {
        const response = await fetch(
          "https://n8n-evvqk-u21881.vm.elestio.app/webhook-test/a4736bb6-a974-47b6-af13-94a6bba1f5d0",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Server response:", errorData);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("Formular erfolgreich übermittelt");
        setShowSuccessModal(true);
      } catch (error) {
        console.error("Fehler beim Übermitteln des Formulars:", error);
        alert(
          "Es gab einen Fehler beim Übermitteln des Formulars. Bitte versuchen Sie es später erneut."
        );
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.leadSources.length > 0;
      case 2:
        return true;
      case 3:
        return (
          formData.targetPosition !== "specific-role" ||
          (formData.specificRole && formData.specificRole.trim() !== "")
        );
      case 4:
        return formData.contactInfo.email && formData.contactInfo.phone;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Wir besorgen dir die 5% der Kontakte, die dein Produkt jetzt suchen
          </h1>
          <p className="text-muted-foreground">
            Sag uns, wonach du suchst, und wir finden die richtigen Leads für
            dich
          </p>
        </div>

        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <Card>
          <CardContent className="pt-6">
            {currentStep === 1 && (
              <StepOne
                selectedSources={formData.leadSources}
                onSourceSelect={(source: LeadSource) => {
                  setFormData((prev) => ({
                    ...prev,
                    leadSources: prev.leadSources.includes(source)
                      ? prev.leadSources.filter((s) => s !== source)
                      : [...prev.leadSources, source],
                  }));
                }}
                similarCompany={formData.similarCompany || ""}
                onSimilarCompanyChange={(value: string) => {
                  setFormData((prev) => ({
                    ...prev,
                    similarCompany: value,
                  }));
                }}
              />
            )}

            {currentStep === 2 && (
              <StepTwo
                selectedDataPoints={formData.dataPoints}
                onDataPointSelect={(point: DataPoint) => {
                  setFormData((prev) => ({
                    ...prev,
                    dataPoints: prev.dataPoints.includes(point)
                      ? prev.dataPoints.filter((p) => p !== point)
                      : [...prev.dataPoints, point],
                  }));
                }}
              />
            )}

            {currentStep === 3 && (
              <StepThree
                selectedPosition={formData.targetPosition}
                onPositionSelect={(position: TargetPosition) => {
                  setFormData((prev) => ({
                    ...prev,
                    targetPosition: position,
                  }));
                }}
                specificRole={formData.specificRole || ""}
                onSpecificRoleChange={(value: string) => {
                  setFormData((prev) => ({
                    ...prev,
                    specificRole: value,
                  }));
                }}
              />
            )}

            {currentStep === 4 && (
              <StepFour
                email={formData.contactInfo.email}
                phone={formData.contactInfo.phone}
                onEmailChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      email: value,
                    },
                  }));
                }}
                onPhoneChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      phone: value,
                    },
                  }));
                }}
              />
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Zurück
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`
                  relative overflow-hidden
                  ${
                    currentStep === totalSteps
                      ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-white font-semibold px-8 py-2 rounded-lg"
                      : ""
                  }
                  ${currentStep === totalSteps ? "animate-breathing" : ""}
                `}
              >
                {currentStep === totalSteps ? (
                  <>
                    <span className="relative z-10">Jetzt Leads sichern</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 transform hover:scale-110 transition-transform duration-300"></span>
                  </>
                ) : (
                  "Weiter"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="space-y-8 py-4">
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Vielen Dank!
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-600 text-green-600 font-semibold">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        Wir haben deine Anfrage erhalten
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-600 text-green-600 font-semibold">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        Wir melden uns in 24 Stunden mit den Leads
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-600 text-green-600 font-semibold">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        Wir besprechen die nächsten Schritte
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Schließen
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
