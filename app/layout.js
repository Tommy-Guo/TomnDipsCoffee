import "./globals.css";
import Navbar from '../components/Navbar/Navbar';

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: "Tom & Dips Coffee",
  description: "Tom & Dips Coffee, TND Coffee Homepage, T&D Coffee Homepage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          href="/images/ios_icon.png"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body>
        <Analytics/>
        <SpeedInsights/>
        <Navbar className="navbar" styles="z-index:10;" />
        {children}
      </body>
      <GoogleAnalytics gaId="G-TN70SQ5DTT" />
    </html>
  );
}