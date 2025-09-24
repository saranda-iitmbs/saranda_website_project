import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./(frontend)/globals.css";
import Link from "next/link";
import Header from "@/components/layout/Header";
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

export default function LostPage() {
  return (
    <html lang="en" className={`${roboto.variable} ${redwood.variable}`}>
      <body>
        <Header/>
        <main className="
          h-dvh flex justify-center items-center flex-col bg-neutral-light
        ">
          <p>Oops...</p>
          <h1 className="mb-[-0.4ch]">404</h1>
          <p>You might be lost.</p>
          <p>
            <Link href="/" className="text-blue-500 underline">Click this </Link>
            to get back home.
          </p>
        </main>
        <Footer/>
      </body>
    </html>
  )
}