import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// Regex pattern for email validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface StepFourProps {
  email: string;
  phone: string;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

export function StepFour({
  email,
  phone,
  onEmailChange,
  onPhoneChange,
}: StepFourProps) {
  const [emailError, setEmailError] = useState<string>("");

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email ist erforderlich");
      return false;
    }
    if (!EMAIL_REGEX.test(value)) {
      setEmailError("Bitte geben Sie eine gültige E-Mail-Adresse ein");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailChange = (value: string) => {
    onEmailChange(value);
    validateEmail(value);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Almost there!</h2>
        <p className="text-muted-foreground">
          Gib bitte deine Kontaktdaten ein, um deine Leads zu erhalten
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Deine E-Mail-Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="du@company.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className={emailError ? "border-red-500" : ""}
          />
          {emailError && <p className="text-sm text-red-500">{emailError}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Deine Mobilnummer</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+49 123 45678900"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
