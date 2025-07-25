import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Fira_Code } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";
import SettingsModal from "@/components/modals/SettingsModal";
import NotificationToast from "@/components/ui/NotificationToast";
import { themeScript } from "@/lib/theme-script";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Clerk
import { ClerkProvider } from "@clerk/nextjs";
import { ClerkUserSyncProvider } from "@/components/providers/ClerkUserSyncProvider";

// Premium Font Configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
  preload: false, // Code font doesn't need to be preloaded
});

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "Cinetron - Premium Movie Experience",
    template: "%s | Cinetron Premium",
  },
  description:
    "Discover movies like never before. Cinetron offers a premium cinematic experience with AI-powered recommendations, 3D movie posters, and immersive social features.",
  keywords: [
    "movies",
    "cinema",
    "films",
    "entertainment",
    "movie database",
    "movie recommendations",
    "movie reviews",
    "watch movies",
    "movie trailers",
    "premium cinema",
    "3D movie posters",
    "AI recommendations",
  ],
  authors: [{ name: "Cinetron Team" }],
  creator: "Cinetron Premium",
  publisher: "Cinetron",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteName: "Cinetron Premium",
    title: "Cinetron - Premium Movie Experience",
    description:
      "Discover movies like never before with AI-powered recommendations and immersive 3D experiences.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cinetron - Premium Movie Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cinetron - Premium Movie Experience",
    description:
      "Discover movies like never before with AI-powered recommendations and immersive 3D experiences.",
    images: ["/twitter-image.jpg"],
    creator: "@Cinetron",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
  },
  category: "entertainment",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f46e0c" },
    { media: "(prefers-color-scheme: dark)", color: "#e55502" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://image.tmdb.org" />
          <link rel="preconnect" href="https://api.themoviedb.org" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          {/* Favicon and App Icons */}
          <link rel="icon" href="/favicon.ico" sizes="32x32" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />

          {/* PWA meta tags */}
          <meta name="application-name" content="Cinetron" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Cinetron" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#f46e0c" />

          {/* Preload critical resources */}
          <link
            rel="preload"
            href="/hero-background.jpg"
            as="image"
            type="image/jpeg"
          />

          {/* Theme initialization script - prevents flash of wrong theme */}
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>
        <body
          className={`
          ${inter.variable} 
          ${playfairDisplay.variable} 
          ${firaCode.variable} 
          font-sans antialiased min-h-screen
          bg-gradient-to-br from-slate-50 via-white to-slate-100 
          dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
          text-slate-900 dark:text-slate-100
          selection:bg-orange-500/20 selection:text-orange-900 dark:selection:text-orange-100
        `}
          suppressHydrationWarning
        >
          <ClerkUserSyncProvider>
            <Providers>
              {/* Full Screen Container */}
              <div className="relative min-h-screen w-full overflow-x-hidden">
                {/* Background Pattern */}
                <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(244,110,12,0.1),transparent)] pointer-events-none z-0" />

                {/* Navigation */}
                <Navbar />

                {/* Modals */}
                <SettingsModal />

                {/* Notifications */}
                <NotificationToast />

                {/* Main Content */}
                <main className="relative z-10 w-full">{children}</main>
                <SpeedInsights />
              </div>
            </Providers>
          </ClerkUserSyncProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
