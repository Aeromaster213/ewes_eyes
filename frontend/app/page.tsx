"use client"
import { About } from "@/components/about";
import { BentoGridDemo } from "@/components/bento";
import { GoogleGeminiEffectDemo } from "@/components/hero";
import { Navigation } from "@/components/navbar";



export default function Home() {
  return (
    <main>
      <Navigation />
      <GoogleGeminiEffectDemo />
      <BentoGridDemo />
      <About />
    </main>
  );
}
