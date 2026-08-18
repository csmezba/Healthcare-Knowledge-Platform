import type { Metadata } from "next";
import MedicineDatabase from "@/components/MedicineDatabase";

export const metadata: Metadata = {
  title: "Medicine Encyclopedia & Drug Database | TakeCare",
  description: "Browse verified clinical information, dosage parameters, active drug interactions, and side effects across OTC and prescription medicines.",
};

export default function MedicinesPage() {
  return (
    <div className="py-6">
      <MedicineDatabase />
    </div>
  );
}
