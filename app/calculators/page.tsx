import type { Metadata } from "next";
import HealthCalculators from "@/components/HealthCalculators";

export const metadata: Metadata = {
  title: "Clinical Health Calculators | TakeCare",
  description: "Verify your biometrics using standard clinical equations: BMI, BMR & Daily Energy, Hydration Intake, Cardio Zones (HR), and Blood Pressure Classification.",
};

export default function CalculatorsPage() {
  return (
    <div className="py-6">
      <HealthCalculators />
    </div>
  );
}
