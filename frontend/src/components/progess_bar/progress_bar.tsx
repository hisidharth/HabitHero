'use client';

import { motion } from "motion/react";

export default function ProgressBar({ value }: { value: number }) {
    return (
        <div className="relative w-full h-5">
            <div className="absolute rounded-xl w-full h-5 bg-bg-light " />
            <motion.div
                initial={{ width: 0 }}
                transition={{
                    duration: 0.8,
                    type: 'spring'
                }}
                animate={{ width: '50%' }}
                className="absolute rounded-xl h-5 bg-bg-accent"
            />
        </div>
    )
}