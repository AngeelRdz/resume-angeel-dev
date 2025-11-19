import type { Metadata } from "next";

import { HomePage } from "@/presentation/pages/HomePage";

export const metadata: Metadata = {
  title: "Ángel Rodríguez | Frontend Engineer",
  description:
    "Portafolio de Ángel Rodríguez, desarrollador Frontend especializado en crear experiencias web escalables y de alto rendimiento con Next.js, React y TypeScript.",
};

export default function RootHomePage() {
  return <HomePage />;
}

