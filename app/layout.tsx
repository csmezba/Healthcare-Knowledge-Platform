import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TakeCare | Healthcare Knowledge Platform",
  description: "An ultra-premium, AI-powered healthcare publication, medicine encyclopedia, disease library, and diagnostic equipment showcase featuring interactive health tools.",
  keywords: ["Healthcare", "Medicine Encyclopedia", "Cardiology", "Diagnostics", "AI Medical Assistant", "Health Calculators"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans antialiased text-slate-900" id="takecare-main-root">
        <Header />
        <main className="flex-grow w-full max-w-[95%] md:max-w-[88%] lg:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
