import { notFound } from "next/navigation";
import { getMedicineById } from "@/lib/data";
import MedicineDetailPage from "@/components/MedicineDetailPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const medicine = getMedicineById(id);
  if (!medicine) return { title: "Medicine Not Found | TakeCare" };
  return {
    title: `${medicine.name} (${medicine.genericName}) | TakeCare Medicine Database`,
    description: medicine.overview,
  };
}

export default async function MedicinePage({ params }: PageProps) {
  const { id } = await params;
  const medicine = getMedicineById(id);

  if (!medicine) {
    notFound();
  }

  return (
    <div className="py-6">
      <MedicineDetailPage medicine={medicine} />
    </div>
  );
}
