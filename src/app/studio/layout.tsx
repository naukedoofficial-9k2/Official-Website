import React from "react";

// Separate root layout: Studio must not inherit the site's navbar, cursor or CSS
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
