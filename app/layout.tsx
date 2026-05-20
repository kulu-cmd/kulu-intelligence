import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { MotionGuard } from "@/components/MotionGuard";
import { RouteTransitionProvider } from "@/components/RouteTransition";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kulu Intelligence — AI, made human.",
  description:
    "An African AI consultancy. We teach teams how to use AI, and we build the workflows that make it stick. Plain talk, real tools, live before month-end.",
  metadataBase: new URL("https://kulu.co.za"),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Kulu Intelligence — AI, made human.",
    description:
      "AI literacy seminars and embedded implementation, for the businesses that keep South Africa running.",
    url: "https://kulu.co.za",
    siteName: "Kulu Intelligence",
    images: ["/logos/KuluIntelligence.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF8E8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-dawn text-indigo font-body antialiased min-h-screen">
        <MotionGuard />
        <RouteTransitionProvider>{children}</RouteTransitionProvider>
      </body>
    </html>
  );
}
