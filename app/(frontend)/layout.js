import "./globals.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function RootLayout({ children }) {
  return (
    <body className="bg-neutral-light">
      <Header/>
      {children}
      <Footer/>
    </body>
  );
}