// app/layout.js

import './globals.css';

export const metadata = {
  title: 'Weather App',
  description: 'Get current weather information',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
