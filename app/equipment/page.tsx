import type { Metadata } from "next";
import MedicalEquipment from "@/components/MedicalEquipment";

export const metadata: Metadata = {
  title: "Medical Equipment Showcase | TakeCare",
  description: "Explore standard diagnostic hardware, digital blood pressure monitors, and mesh nebulizers with verified specifications.",
};

export default function EquipmentPage() {
  return (
    <div className="py-6">
      <MedicalEquipment />
    </div>
  );
}
