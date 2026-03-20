import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Picnic Hubs DTLA",
  description: "Courier throughput + unit economics simulator (prototype)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-100 text-zinc-900 font-sans">
        {children}
      </body>
    </html>
  );
}
