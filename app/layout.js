import { GoogleAnalytics } from '@next/third-parties/google'

import "./globals.css";
import Navbar from '../components/Navbar/Navbar';

export const metadata = {
  title: "Tom & Dips Coffee",
  description: "Tom & Dips Coffee",
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
        <Navbar className="navbar" styles="z-index:10;" />
        {children}
      </body>
      <GoogleAnalytics gaId="G-TN70SQ5DTT" />
    </html>
  );
}