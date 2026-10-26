import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const metadata: Metadata = {
  title: "Galeria de projetos em AR",
  description: "Portfólio de projetos de tecnologia e infraestrutura, com visualização em realidade aumentada no navegador."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // permite desenhar sob as áreas seguras do iPhone (o vidro usa env(safe-area-inset-*))
  themeColor: "#121212"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body className="bg-surface font-sans text-neutral-100 antialiased">{children}</body>
    </html>
  );
}
