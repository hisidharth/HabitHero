'use client';

import { HabitT } from "@/lib/api/models";
import { Settings } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ProgressBar from "../progess_bar/progress_bar";
import EditHabitWindow from "../windows/habit/edit";

export default function HabitCard({ habit }: { habit: HabitT }) {
    const [editWindowVisible, setEditWindowVisible] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-5 p-6 w-full rounded-md bg-bg-medium">
            <div className="flex grow items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-fg-dark font-bold">{habit.habitName}</span>
                    <span className="text-fg-medium text-xs">{habit.category}</span>
                </div>
                <div className="relative z-10">
                    <motion.button
                        className="bg-bg-light p-1 rounded hover:bg-bg-dark"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditWindowVisible(!editWindowVisible)}
                    >
                        <Settings width={15} height={15} className="text-fg-light" />
                    </motion.button>
                    <EditHabitWindow visible={editWindowVisible} setVisible={setEditWindowVisible} habit={habit} />
                    {/*<DeleteDeviceWindow visible={deleteWindowVisible} setVisible={setDeleteWindowVisible} device={device} />*/}
                </div>
            </div>
            <ProgressBar value={0.5} />
            <div className="flex grow items-center justify-between">
                <span className="text-fg-medium text-xs">Complete {habit.frequency} time(s) per week</span>
                <span className="text-fg-dark font-bold">0/{habit.frequency}</span>
            </div>
        </div>
    )
}