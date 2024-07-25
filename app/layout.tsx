import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import "./style.css";

export const metadata: Metadata = {
  title: "Next React Notes",
  description: "Web Notes App created by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
