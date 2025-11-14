import type { Metadata } from "next";

import { HomePage } from "@/presentation/pages/HomePage";

export const metadata: Metadata = {
  title: "Ángel Rodríguez | Frontend Engineer",
  description:
    "Currículum interactivo y portafolio de Ángel Rodríguez, especialista en frontend.",
};

export default function RootHomePage() {
  return <HomePage />;
}

