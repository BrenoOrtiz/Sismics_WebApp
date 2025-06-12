
import "./globals.css";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script
          src="https://kit.fontawesome.com/d5fcfde473.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
