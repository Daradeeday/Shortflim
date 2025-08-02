"use client"

import { motion } from "framer-motion"
import { Leaf, TreePine, Sun, Tent, Sparkles } from "lucide-react" // Importing nature-themed icons

const scheduleItems = [
  {
    time: "วันที่ 2-3 สิงหาคม 2566 รับสมัครทีมงาน",
    description:
      "เราได้เริ่มทำการประชามติรับสมัครทีมงานสำหรับโครงการหนังสั้นที่มีความหมาย เพื่อส่งเข้าประกวดรางวัล โดยเปิดรับสมัครตั้งแต่วันที่ 2-3 สิงหาคม 2566",
    icon: Tent,
  },
  {
    time: "วันที่ 4 สิงหาคม 2566 ทำการประกาศผลทีมงาน",
    description: "ทำการประกาศผลทีมงานที่ได้รับการคัดเลือกเข้าร่วมโครงการหนังสั้น โดยเปิดรับสมัครตั้งแต่วันที่ 4 สิงหาคม 2566",
    icon: TreePine,
  },
  {
    time: "วันที่ 5 สิงหาคม 2566 เริ่มการถ่ายทำ",
    description: "เริ่มการถ่ายทำภาพยนตร์ในวันที่ 5 สิงหาคม 2566 โดยทีมงานที่ได้รับการคัดเลือก",
    icon: Leaf,
  },
  {
    time: "วันที่ 6 - 7 สิงหาคม 2566 เริ่มทำการตัดต่อ",
    description: "เริ่มทำการตัดต่อภาพยนตร์ในวันที่ 6 สิงหาคม 2566 โดยทีมงานที่ได้รับการคัดเลือก",
    icon: Sparkles,
  },
  {
    time: "วันที่ 8 สิงหาคม 2566 สิ้นสุดการถ่ายทำ",
    description: "Morning! การถ่ายทำภาพยนตร์สิ้นสุดในวันที่ 7 สิงหาคม 2566 โดยทีมงานที่ได้รับการคัดเลือก",
    icon: Sun,
  },
]

export default function ScheduleSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly faster stagger for more dynamic feel
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-primary"
        >
          Event Schedule
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {scheduleItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-secondary p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              {item.icon && <item.icon className="h-10 w-10 text-primary mb-4" />}
              <h3 className="text-xl font-semibold mb-2 text-primary">{item.time}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
