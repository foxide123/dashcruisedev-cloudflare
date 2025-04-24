import './globals.css';
import Script from 'next/script';
import NavBar from "@/components/NavBar";


export const metadata = {
    title: 'My Dashboard',
    description: 'Admin & User dashboard'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            {/* Google Analytics */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
          `}
            </Script>
        </head>
        <body className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="p-4">{children}</main>
        </body>
        </html>
    );
}
