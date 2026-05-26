import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/saas/Navbar";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Kissing Video Generator - Create Romantic Videos with Veo 3.1, Wan 2.7 & Gemini",
  description: "Merge male and female photos side-by-side and let state-of-the-art AI create ultra-realistic kissing videos. Try Veo 3.1 Pro, Wan 2.7, Gemini Omni and Grok Imagine endpoints instantly.",
  keywords: ["ai kissing generator", "kissing video generator", "veo 3.1 image to video", "wan 2.7 image to video", "gemini omni video", "grok imagine video", "saas templates"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full dark" style={{ colorScheme: 'dark' }}>
      <body className={`${outfit.className} h-full w-full flex flex-col antialiased bg-zinc-950 text-zinc-100`}>
        <Providers>
          <Navbar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
