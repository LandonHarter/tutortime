'use client'

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence>
            <motion.div className='w-full h-full container' key={pathname} initial={{
                opacity: 0,
            }} animate={{
                opacity: 1,
            }}>
                {children}
            </motion.div>
        </AnimatePresence>
    )
}