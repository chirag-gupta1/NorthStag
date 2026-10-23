import "./globals.css";

export const metadata = {
  title: "North Stag — Built for movement, Made to last",
  description:
    "Premium cargo pants and trousers by North Stag. Pan India delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};