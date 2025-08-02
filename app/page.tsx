"use client"

import type React from "react"
import { useState, useRef, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../components/ui/button"
import ScheduleSection from "../components/schedule-section"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Label } from "../components/ui/label"
import { db, storage } from "../lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"
import ExpensesSection from "../components/expenses-section"

export default function Component() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [position, setPosition] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const applicationFormRef = useRef<HTMLDivElement>(null)

  const roles = ["ผู้กำกับ", "นักแสดง", "นักเขียนบท", "ผู้ตัดต่อ", "ผู้กำกับภาพ", "นักออกแบบเสียง", "ผู้ช่วยฝ่ายผลิต"]

  const scrollToApplicationForm = (selectedPosition?: string) => {
    if (selectedPosition) {
      setPosition(selectedPosition)
    }
    applicationFormRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      const allowedTypes = ["application/pdf", "application/zip", "image/png", "video/mp4"]
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile)
      } else {
        toast.error("ประเภทไฟล์ไม่รองรับ กรุณาอัปโหลดไฟล์ PDF, ZIP, PNG หรือ MP4")
        setFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = "" // Clear the input
        }
      }
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!fullName || !email || !phone || !position) {
      toast.error("กรุณากรอกข้อมูลในช่องที่จำเป็นให้ครบถ้วน")
      setIsSubmitting(false)
      return
    }

    try {
      let fileUrl = ""
      if (file) {
        const storageRef = ref(storage, `applicants/${file.name}_${Date.now()}`)
        const snapshot = await uploadBytes(storageRef, file)
        fileUrl = await getDownloadURL(snapshot.ref)
      }

      await addDoc(collection(db, "applicants"), {
        fullName,
        email,
        phone,
        position,
        fileUrl,
        notes,
        timestamp: new Date(),
      })

      toast.success("ส่งใบสมัครสำเร็จ!")
      // Clear form
      setFullName("")
      setEmail("")
      setPhone("")
      setPosition("")
      setFile(null)
      setNotes("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      toast.error("ส่งใบสมัครไม่สำเร็จ กรุณาลองอีกครั้ง")
    } finally {
      setIsSubmitting(false)
    }
  }

  const fadeInVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white text-gray-900 font-sarabun">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white shadow-sm">
        <Link href="#" className="flex items-center justify-center text-lg font-bold text-blue-600">
          SHORTFLIM
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#hero" className="text-sm font-medium hover:underline underline-offset-4 text-gray-700">
            Home
          </Link>
          <Link href="#overview" className="text-sm font-medium hover:underline underline-offset-4 text-gray-700">
            About
          </Link>
          <Link href="#positions" className="text-sm font-medium hover:underline underline-offset-4 text-gray-700">
            ตำแหน่ง
          </Link>
          <Link href="#apply" className="text-sm font-medium hover:underline underline-offset-4 text-gray-700">
            สมัคร
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4 text-gray-700">
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-blue-50 to-cream-100 overflow-hidden"
        >
          <Image
            src="https://i.pinimg.com/736x/85/48/f1/8548f15302138de1b555cfcbcb4d9c82.jpg?_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_ohc=wQtZg-oAHj0Q7kNvwHnxKcG&_nc_oc=AdlJCTwtKbeX08uCo04iIcDCUe5nOyBbVpfMPfSPl3hHldSkmgVC_85aXz8lq0hrVY4&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fbkk13-1.fna&oh=03_Q7cD2wHYU_5bTjwELbzQiQek9E_RKVytRQiNPRXhkRQ2a9R3Gg&oe=68B51155?height=1080&width=1920"
            width={1920}
            height={1080}
            alt="ภาพพื้นหลังการถ่ายทำภาพยนตร์หรือเรื่องราวชีวิตที่มีความหมาย"
            className="absolute inset-0 object-cover w-full h-full opacity-100 brightness-75 filter grayscale"
          />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white"
                >
                  ทุกคนมีเรื่องราวที่ให้ชีวิตมีความหมาย
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  มาร่วมสร้างหนังสั้นที่สร้างแรงบันดาลใจและสัมผัสหัวใจ เพื่อชิงรางวัล Best Meaningful Content Award
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button
                  onClick={() => scrollToApplicationForm()}
                  className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-md font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  เข้าร่วมทีม
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
<section>
  <ScheduleSection />
           <ExpensesSection />
</section>
        {/* Project Overview Section */}
        <motion.section
          id="overview"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          variants={fadeInVariants}
          className="w-full py-12 md:py-24 lg:py-32 bg-cream-50"
        >
           
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">ภาพรวมโครงการ</h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  เรากำลังรวบรวมทีมงานผู้หลงใหลในการสร้างสรรค์หนังสั้นเพื่อส่งเข้าประกวดรางวัล &quot;Best Meaningful Content
                  Award&quot; ของไทยประกันชีวิต ในงาน Thailand Influencer Awards 2025 โดย Tellscore
                  เป้าหมายของเราคือการสร้างสรรค์เรื่องราวที่น่าประทับใจและเข้าถึงจิตใจผู้คน
                  เพื่อแสดงให้เห็นถึงผลกระทบอันลึกซึ้งของเรื่องราวในชีวิตประจำวัน
                  นี่คือโอกาสที่จะได้มีส่วนร่วมในโครงการที่เฉลิมฉลองความหมายที่แท้จริงของชีวิต และได้รับการยอมรับในวงการ
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="https://www.tellscore.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-blue-600 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-blue-600"
                >
                  เยี่ยมชม Tellscore
                </Link>
                <Link
                  href="https://www.thailife.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-blue-600 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-blue-600"
                >
                  เยี่ยมชมไทยประกันชีวิต
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Open Positions Section */}
        <section >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">ตำแหน่งที่เปิดรับ</h2>
              <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                เรากำลังมองหาผู้มีความสามารถเพื่อเติมเต็มตำแหน่งต่อไปนี้ คลิก &quot;สมัคร&quot; เพื่อแสดงความสนใจของคุณ!
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {roles.map((role, index) => (
                <div
          
                >
                  <Card className="flex flex-col justify-between bg-cream-50 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-blue-600">{role}</CardTitle>
                      <CardDescription className="text-gray-700">
                        {role === "ผู้กำกับ" && "ผู้นำวิสัยทัศน์และความคิดสร้างสรรค์ในการสร้างภาพยนตร์"}
                        {role === "นักแสดง" && "นำตัวละครมาสู่ชีวิตด้วยการแสดงที่น่าประทับใจ"}
                        {role === "นักเขียนบท" && "สร้างสรรค์บทภาพยนตร์ที่น่าสนใจและมีความหมาย"}
                        {role === "ผู้ตัดต่อ" && "ตัดต่อฟุตเทจดิบให้เป็นเรื่องราวที่กระชับและมีผลกระทบ"}
                        {role === "ผู้กำกับภาพ" && "บันทึกภาพที่สวยงามและสร้างสรรค์สุนทรียภาพของภาพยนตร์"}
                        {role === "นักออกแบบเสียง" && "สร้างประสบการณ์เสียงที่สมจริงสำหรับภาพยนตร์"}
                        {role === "ผู้ช่วยฝ่ายผลิต" && "สนับสนุนทีมงานในงานต่างๆ ทั้งในและนอกสถานที่ถ่ายทำ"}
                        {role === "อื่นๆ" && "หากบทบาทของคุณไม่อยู่ในรายการ โปรดบอกเราว่าคุณสามารถมีส่วนร่วมได้อย่างไร!"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => scrollToApplicationForm(role)}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                      >
                        สมัคร
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <motion.section
          id="apply"
          ref={applicationFormRef}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          variants={fadeInVariants}
          className="w-full py-12 md:py-24 lg:py-32 bg-cream-100"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">แบบฟอร์มใบสมัคร</h2>
              <p className="max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                พร้อมที่จะสร้างผลกระทบที่มีความหมายแล้วหรือยัง? กรอกแบบฟอร์มด้านล่างเพื่อเข้าร่วมทีมของเรา!
              </p>
            </div>
            <Card className="mx-auto max-w-2xl p-6 md:p-8 bg-white shadow-lg">
              <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">
                      ชื่อ-นามสกุล <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="กรอกชื่อ-นามสกุลของคุณ"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      อีเมล (ที่สามารถใช้งานได้จริง) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="กรอกอีเมลของคุณ"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">
                      เบอร์โทรศัพท์ (ที่สามารถใช้งานได้จริง)<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="กรอกเบอร์โทรศัพท์ของคุณ"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="position">
                      ตำแหน่งที่ต้องการสมัคร <span className="text-red-500">*</span>
                    </Label>
                    <Select value={position} onValueChange={setPosition} required>
                      <SelectTrigger id="position">
                        <SelectValue placeholder="เลือกตำแหน่ง" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">ข้อความ/หมายเหตุเพิ่มเติม</Label>
                    <Textarea
                      id="notes"
                      placeholder="บอกเล่าเพิ่มเติมเกี่ยวกับตัวคุณหรือประสบการณ์ของคุณ..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "กำลังส่ง..." : "ส่งใบสมัคร"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Contact Us Section */}
        <motion.section
          id="contact"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          variants={fadeInVariants}
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">ติดต่อเรา</h2>
              <p className="max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                มีคำถาม? ติดต่อเราได้ตามช่องทางต่อไปนี้:
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <div className="flex items-center gap-2 text-gray-700">
                  <FacebookIcon className="w-6 h-6 text-blue-600" />
                  <Link
                    href="https://www.facebook.com/yourpage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    หน้าเพจ Facebook
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MailIcon className="w-6 h-6 text-blue-600" />
                  <Link href="ddayrenger@gmail@example.com" className="hover:underline">
                    ddayrenger@gmail.com
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <PhoneIcon className="w-6 h-6 text-blue-600" />
                  <span>+66 619 312 224</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-cream-50 text-gray-700">
        <p className="text-xs">&copy; {new Date().getFullYear()} โครงการหนังสั้น. สงวนลิขสิทธิ์.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            นโยบายความเป็นส่วนตัว
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            ข้อกำหนดในการให้บริการ
          </Link>
          <span className="text-xs">พัฒนาโดย [ชื่อทีมของคุณ]</span>
        </nav>
      </footer>
    </div>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.65A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
