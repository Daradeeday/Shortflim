"use client"

import { motion } from "framer-motion"
import { DollarSign, Banknote, CalendarCheck } from "lucide-react" // Icons for expenses

export default function ExpensesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-primary"
        >
          คุณสมบัติผู้สมัคร & ค่าใช้จ่าย
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg"
        >
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <DollarSign className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-primary">อุปกรณ์</h3>
                <p className="text-lg text-foreground">
                  ในด้านอุปกรณ์มีหรือไม่มีก็ได้<span className="font-bold text-primary">หากมีจะพิจรณาเป็นพิเศษ</span>{" "}
                  ในการคัดเลือก
                </p>
                
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Banknote className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-primary">ค่าใช้จ่าย ในกองถ่าย</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  <li>
                    <span className="font-semibold">ค่าอาหาร:</span> มีอาหารเที่ยงให้
                    <br />
                    
                  </li>
                  
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CalendarCheck className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-primary">ผู้สมัครต้องเป็นนักเรียนในเตรียมน้อมโคราช</h3>
                <p className="text-muted-foreground">
                  เราได้เปิดรับทีมงานเเค่ในนักเรียนในเตรียมน้อมโคราชเท่านั้น เพื่อให้การทำงานร่วมกันเป็นไปอย่างราบรื่นและมีประสิทธิภาพ
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
