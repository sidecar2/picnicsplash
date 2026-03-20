import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Picnic Route Sandbox",
  description: "Courier throughput + unit economics simulator (prototype)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-zinc-900 font-sans">
        {/* Visible as soon as HTML loads - no JS or Tailwind */}
        <div style={{ padding: "12px 20px", background: "#334155", color: "#f8fafc", fontSize: 14 }}>
          Picnic Route Sandbox — If you see this bar, the server is running. App loads below.
        </div>
        <noscript>
          <div style={{ padding: 20, background: "#fef3c7", color: "#92400e" }}>
            This app needs JavaScript. Please enable it and reload.
          </div>
        </noscript>
        <div id="root-app">{children}</div>
      </body>
    </html>
  );
}
