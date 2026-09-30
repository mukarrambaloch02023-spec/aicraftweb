"use client"
import { motion } from "framer-motion"

export default function ScrollReveal({ children, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  )
}
