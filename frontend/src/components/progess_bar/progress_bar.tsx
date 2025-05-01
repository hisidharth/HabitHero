'use client';

import { motion } from "motion/react";

export default function ProgressBar({ value }: { value: number }) {
    const v = Math.min(100, value * 100);

    return (
        <div className="relative w-full h-5">
            <div className="absolute rounded-xl w-full h-5 bg-bg-light " />
            <motion.div
                initial={{ width: 0 }}
                transition={{
                    duration: 0.8,
                    type: 'spring'
                }}
                animate={{ width: v + '%' }}
                className="absolute rounded-xl h-5 bg-bg-accent max-w-full"
            />
        </div>
    )
}