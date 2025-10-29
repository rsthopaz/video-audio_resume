import "./globals.css";
import { Inter } from "next/font/google";
import { TranscriptionProvider } from "./context/TranscriptionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuickNote",
  description: "AI Transcriber",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen overflow-y-auto bg-white`}
      >
        <TranscriptionProvider>{children}</TranscriptionProvider>
      </body>
    </html>
  );
}
