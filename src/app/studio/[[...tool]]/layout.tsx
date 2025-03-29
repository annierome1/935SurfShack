// src/app/studio/layout.tsx
export const metadata = {
    title: 'Surf Shack Studio',
    description: 'Admin dashboard for managing events and more',
  };
  
  export default function StudioLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  