import type { Metadata } from "next";
import { EB_Garamond, Public_Sans, JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import ModeBanner from "@/components/ModeBanner";
import { decrypt } from "@/lib/session";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: "variable",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Media Shelf",
  description: "Your personal media collection manager",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get("session")?.value);
  const userEmail = session?.email;

  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ModeBanner userEmail={userEmail} />
        {children}
      </body>
    </html>
  );
}
