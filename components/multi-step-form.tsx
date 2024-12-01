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
import { CheckCircle2, PlayCircle } from "lucide-react";
import type {
  DataPoint,
  FormData,
  LeadSource,
  TargetPosition,
} from "../types/form";
import Script from "next/script";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MultiStepFormProps {
  isEmbedded?: boolean;
  width?: number;
  height?: number;
}

export default function MultiStepForm({
  isEmbedded = false,
  width = 1280,
  height = 720,
}: MultiStepFormProps) {
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
  const [showVideo, setShowVideo] = useState(false);
  const [selectedSource, setSelectedSource] = useState<LeadSource | null>(null);
  const [similarCompany, setSimilarCompany] = useState("");
  const [customSource, setCustomSource] = useState("");

  const totalSteps = 4;

  const handleNext = async () => {
    if (currentStep === totalSteps) {
      try {
        const formDataToSubmit = {
          ...formData,
          leadSources: selectedSource ? [selectedSource] : [],
          similarCompany,
          customSource,
        };

        const response = await fetch(
          "https://n8n-evvqk-u21881.vm.elestio.app/webhook/a4736bb6-a974-47b6-af13-94a6bba1f5d0",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(formDataToSubmit),
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
        return selectedSource !== null;
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
    <div
      suppressHydrationWarning
      className={cn(
        "bg-gradient-to-b from-background to-muted/20",
        isEmbedded ? "py-4 px-2" : "min-h-screen py-12 px-4"
      )}
      style={
        isEmbedded
          ? {
              width: width,
              height: height,
              overflow: "auto",
            }
          : undefined
      }
    >
      <div
        className={cn(
          "mx-auto space-y-6",
          isEmbedded ? "max-w-[90%]" : "max-w-3xl"
        )}
      >
        <div
          className={cn("text-center", isEmbedded ? "space-y-2" : "space-y-4")}
        >
          <div className={cn(isEmbedded ? "pt-2" : "pt-4")}>
            <Button
              variant="outline"
              size={isEmbedded ? "default" : "lg"}
              className="group relative bg-white/50 hover:bg-white/80 border-orange-200 hover:border-orange-300 text-orange-700 hover:text-orange-800 shadow-sm hover:shadow-md transition-all duration-300 animate-subtle-bounce"
              onClick={() => setShowVideo(true)}
            >
              <div className="absolute left-3 w-6 h-6">
                <div className="absolute inset-0 rounded-full bg-orange-400/20 animate-ping" />
                <div className="absolute inset-0 rounded-full bg-orange-400/20 animate-pulse" />
              </div>
              <PlayCircle className="w-6 h-6 mr-2 text-orange-500 group-hover:text-orange-600 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                Wie machen wir das?{" "}
                <span className="font-normal text-orange-600/80">
                  (9 Min. Video)
                </span>
              </span>
            </Button>
          </div>
        </div>

        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          className={cn(isEmbedded && "scale-90")}
        />

        <Card>
          <CardContent className={cn(isEmbedded ? "pt-4" : "pt-6")}>
            {currentStep === 1 && (
              <StepOne
                selectedSource={selectedSource}
                onSourceSelect={(source) => {
                  setSelectedSource(selectedSource === source ? null : source);
                }}
                similarCompany={similarCompany}
                onSimilarCompanyChange={(value) => {
                  setSimilarCompany(value);
                }}
                customSource={customSource}
                onCustomSourceChange={(value) => {
                  setCustomSource(value);
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

      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader className="space-y-2 mb-2">
            <h3 className="text-xl font-semibold text-center">
              So finden wir deine idealen Leads
            </h3>
            <p className="text-muted-foreground text-center text-sm">
              In diesem Video erklären wir dir Schritt für Schritt unseren
              Prozess
            </p>
          </DialogHeader>
          <div className="aspect-video w-full">
            <Script
              src="https://fast.wistia.com/embed/medias/2jlcw5n6up.jsonp"
              strategy="lazyOnload"
            />
            <Script
              src="https://fast.wistia.com/assets/external/E-v1.js"
              strategy="lazyOnload"
            />
            <div
              className="wistia_responsive_padding"
              style={{ padding: "56.25% 0 0 0", position: "relative" }}
            >
              <div
                className="wistia_responsive_wrapper"
                style={{
                  height: "100%",
                  left: 0,
                  position: "absolute",
                  top: 0,
                  width: "100%",
                }}
              >
                <div
                  className="wistia_embed wistia_async_2jlcw5n6up seo=false videoFoam=true"
                  style={{
                    height: "100%",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <div
                    className="wistia_swatch"
                    style={{
                      height: "100%",
                      left: 0,
                      opacity: 0,
                      overflow: "hidden",
                      position: "absolute",
                      top: 0,
                      transition: "opacity 200ms",
                      width: "100%",
                    }}
                  >
                    <Image
                      src="https://fast.wistia.com/embed/medias/2jlcw5n6up/swatch"
                      alt=""
                      fill
                      style={{
                        filter: "blur(5px)",
                        objectFit: "contain",
                      }}
                      aria-hidden="true"
                      onLoad={(e) => {
                        // @ts-expect-error Wistia specific behavior
                        e.currentTarget.parentNode.style.opacity = 1;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
