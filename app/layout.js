import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata = {
  title: {
    template: "%s | Saranda IITM BS",
    default: "Saranda House | IITM BS",
  },
  description: "Saranda, a house at IIT Madras BS program, fosters creativity and innovation through meetups, workshops, tech showcases, eSports, and cultural events.",
  authors: [{ name: "Sovit" }],
  creator: "Saranda WebOps Team",
  keywords: [
    'Saranda', 'House', 'IIT Madras', 'BS Program', 'Community', 'Meetups',
    'Events', 'Workshops', 'eSports', 'Cultural', 'Tech', 'Students'
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}
