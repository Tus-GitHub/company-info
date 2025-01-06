import './globals.css';


export const metadata = {
  title: 'company-info',
  description: 'company-info',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}