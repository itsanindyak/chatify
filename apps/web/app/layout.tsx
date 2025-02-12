import { SocketProvider } from "./context/socketProvider";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SocketProvider>
      <body>
        {children}
      </body>
      </SocketProvider>
    </html>
  );
}
