import type { Metadata } from "next";
import AIAssistant from "@/components/AIAssistant";

export const metadata: Metadata = {
  title: "Clinical AI Health Information Assistant | TakeCare",
  description: "Interactive AI health information assistant powered by Gemini API, trained on structured medical editorial guidelines.",
};

export default function AIAssistantPage() {
  return (
    <div className="py-6">
      <AIAssistant />
    </div>
  );
}
