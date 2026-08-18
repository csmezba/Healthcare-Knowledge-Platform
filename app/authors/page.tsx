import type { Metadata } from "next";
import ExpertAuthors from "@/components/ExpertAuthors";

export const metadata: Metadata = {
  title: "Medical Advisory Board & Certified Editors | TakeCare",
  description: "Meet the board-certified cardiologists, clinical pharmacists, pediatricians, and registered dietitians who author and review TakeCare guidelines.",
};

export default function AuthorsPage() {
  return (
    <div className="py-6">
      <ExpertAuthors />
    </div>
  );
}
