'use client'

import { AnimatePresence, motion } from 'framer-motion';
import styles from './loading.module.scss';

export default function Loading({ visible }: { visible: boolean }) {
    return (
        <AnimatePresence mode='wait'>
            <motion.div initial={{ opacity: visible ? 1 : 0 }} animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'all' : 'none' }} transition={{ duration: 0.1 }} className='fixed w-screen h-screen z-50 flex justify-center items-center' style={{
                backgroundColor: 'hsl(var(--nextui-background-500))',
            }}>
                <div className={`${styles.tetrominos}`}>
                    <div className={`${styles.tetromino} ${styles.box1}`}></div>
                    <div className={`${styles.tetromino} ${styles.box2}`}></div>
                    <div className={`${styles.tetromino} ${styles.box3}`}></div>
                    <div className={`${styles.tetromino} ${styles.box4}`}></div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}