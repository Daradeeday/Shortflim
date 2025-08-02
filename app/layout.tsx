import type React from "react"
import type { Metadata } from "next"
import { Sarabun } from "next/font/google" // Import Sarabun font
import "./globals.css"
import { Toaster } from "react-hot-toast"

const sarabun = Sarabun({
  subsets: ["latin", "thai"], // Include 'thai' subset
  weight: ["300", "400", "500", "600", "700"], // Specify weights you need
  variable: "--font-sarabun", // Define a CSS variable for the font
})

export const metadata: Metadata = {
  title: "ShortFlimTNS: รับสมัครทีมงาน",
  description: "รับสมัครทีมงานสำหรับโครงการหนังสั้นที่มีความหมาย เพื่อส่งเข้าประกวดรางวัล",
    
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className={`${sarabun.variable}`}>
     {" "}
      {/* Apply font variable and set language to Thai */}
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
