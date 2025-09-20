import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import Footer from "@/components/layout/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  fallback: ["Helvetica", "Arial", "sans-serif"],
  variable: "--font-roboto",
});

const redwood = localFont({
  src: "../public/fonts/Realwood Regular.otf",
  variable: "--font-redwood",
})

export const metadata = {
  title: {
    template: "%s | Saranda IITM BS",
    default: "Saranda House | IITM BS",
  },
  description: "Saranda, a house at IIT Madras BS program, fosters creativity and innovation through meetups, workshops, tech showcases, eSports, and cultural events.",
  authors: [{ name: "Sovit", url: "https://www.linkedin.com/in/5ovit/" }],
  creator: "Saranda WebOps Team",
  keywords: [
    'Saranda', 'House', 'IIT Madras', 'BS Program', 'Community', 'Meetups',
    'Events', 'Workshops', 'eSports', 'Cultural', 'Tech', 'Students'
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${redwood.variable}`}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}