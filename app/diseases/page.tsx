import type { Metadata } from "next";
import DiseaseLibrary from "@/components/DiseaseLibrary";

export const metadata: Metadata = {
  title: "Disease Guidelines & Symptom Library | TakeCare",
  description: "Peer-reviewed symptom logs, disease etiologies, prevention strategies, and standard care pathways.",
};

export default function DiseasesPage() {
  return (
    <div className="py-6">
      <DiseaseLibrary />
    </div>
  );
}
